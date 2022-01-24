from urllib import request
from bs4 import BeautifulSoup
import pymongo

urlList = ['https://www.amazon.in/s?k={}&s=price-asc-rank']
components = ['motherboard', 'cpu', 'gpu', 'ram', 'storage', 'psu']

def getPrice(productName):
    productName = productName.replace(' ', '+')
    allPrices = []

    url = urlList[0]
    url = url.format(productName)
    price = 0

    response = request.urlopen(url)
    soup = BeautifulSoup(response.read().decode('utf-8'), 'html.parser')

    search_result = soup.find_all('div', attrs = {'data-component-type': 's-search-result'})

    for result in search_result:
        try:
            price_parent = result.find('span', attrs = {'class': 'a-price'})
            price = price_parent.find('span', attrs = {'class': 'a-price-whole'}).text
            break
        except:
            continue

    productName.replace('+', ' ')
    return [productName, price, url]

def getComponents():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["levelup"]
    col = db["builds"]

    allBuilds = col.find()
    for build in allBuilds:
        for component in components:
            name = build[component][0]
            name = name.lower()

            if name[-1] != '*':
                buildId = build['_id']
                col.update_one({'_id': buildId}, {'$set': {
                    component: getPrice(name)
                }})
            else:
                buildId = build['_id']
                col.update_one({'_id': buildId}, {'$set': {
                    component: [name, "0", ""]
                }})

if __name__ == '__main__':
    getComponents()