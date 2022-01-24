import urllib3
from bs4 import BeautifulSoup
import pymongo

urlList = ['https://www.amazon.in/s?k={}&s=price-asc-rank']
components = ['motherboard', 'cpu', 'gpu', 'ram', 'storage', 'psu']

def getPrice(productName):
    productName = productName.replace(' ', '+')
    allPrices = []

    url = urlList[0]
    url = url.format(productName)
    price = "0"

    http = urllib3.PoolManager()
    response = http.request('GET', url)
    soup = BeautifulSoup(response.data, 'html.parser')

    search_result = soup.find_all('div', attrs = {'data-component-type': 's-search-result'})

    for result in search_result:
        try:
            price_parent = result.find('span', attrs = {'class': 'a-price'})
            price = price_parent.find('span', attrs = {'class': 'a-price-whole'}).text
            break
        except:
            continue

    number_price = price
    number_price = float(number_price.replace(',', ''))

    productName = productName.replace('+', ' ')
    return [productName, price, number_price, url]

def getComponents():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["levelup"]
    col = db["builds"]

    allBuilds = col.find()
    for build in allBuilds:
        total_price = 0

        for component in components:
            name = build[component][0]
            name = name.lower()

            if name[-1] != '*':
                details = getPrice(name)
                buildId = build['_id']
                col.update_one({'_id': buildId}, {'$set': {
                    component: details
                }})
            else:
                details = [name, "0", 0, ""]
                buildId = build['_id']
                col.update_one({'_id': buildId}, {'$set': {
                    component: details
                }})

            total_price += details[2]

            col.update_one(({'_id': buildId}), {'$set': {
                'price': total_price
            }})

if __name__ == '__main__':
    getComponents()