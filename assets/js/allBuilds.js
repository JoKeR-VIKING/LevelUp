let cards = document.getElementsByClassName("card");

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

function filterOption()
{
    let filter = document.getElementsByClassName("filter-menu")[0].value;
    if (filter === "")
        filter = "All";

    location.href = `/builds/filter?filter=${filter}`;
}