let cards = document.getElementsByClassName("card");
let curr_page = 0, max_page = cards.length;

document.addEventListener('scroll', function () {
    for (let card of cards)
    {
        let coord = card.getBoundingClientRect();

        if (coord.top < window.innerHeight)
            card.classList.add('animated');
    }
});

for (let card of cards)
{
    let coord = card.getBoundingClientRect();

    if (coord.top < window.innerHeight)
        card.classList.add('animated');
}

for (let i=0;i<max_page;i+=4)
{
    let pageCircle = document.createElement('button');
    pageCircle.classList.add('pageCircle');
    pageCircle.id = (i / 4).toString();

    if (i === 0)
        pageCircle.style.backgroundColor = '#EB4B4B';

    pageCircle.addEventListener('click', function () {
        changePage(this.id);
    });

    document.getElementsByClassName('page-no')[0].appendChild(pageCircle);
}

function filterOption()
{
    let filter = document.getElementsByClassName("filter-menu")[0].value;
    if (filter === "")
        filter = "Most Popular";

    location.href = `/builds/filter?filter=${filter}`;
}

function changePage(changeTo)
{
    let pageCircle = document.getElementsByClassName('pageCircle');

    curr_page =  parseInt(changeTo);

    for (let i=0;i<pageCircle.length;i++)
    {
        if (i === curr_page)
            pageCircle[i].style.backgroundColor = '#EB4B4B';
        else
            pageCircle[i].style.backgroundColor = '#1D2228';
    }

    let index = 0, left = 0, right = curr_page + 1;

    while (left < curr_page)
    {
        for (let i=index;i<max_page && i<index+4;i++)
        {
            cards[i].style.display = "none";
        }

        index += 4;
        left++;
    }

    for (let i=index;i<max_page && i<index+4;i++)
    {
        cards[i].style.display = "flex";
    }

    index += 4;

    while (right < max_page)
    {
        for (let i=index;i<max_page && i<index+4;i++)
        {
            cards[i].style.display = "none";
        }

        index += 4;
        right++;
    }
}

function automaticChangePage()
{
    changePage(curr_page);
    curr_page = (curr_page + 1) % (max_page / 4);
}

window.onload = function ()
{
    changePage(0);
    setInterval(automaticChangePage, 5500);
}
