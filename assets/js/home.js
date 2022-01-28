let allComponents = document.getElementsByTagName("body")[0];
allComponents = allComponents.children;

document.addEventListener('scroll', function () {
    for (let component of allComponents)
    {
        let coord = component.getBoundingClientRect();

        if (coord.top < window.innerHeight)
            component.classList.add('animated');
    }
});

for (let component of allComponents)
{
    let coord = component.getBoundingClientRect();

    if (coord.top < window.innerHeight)
        component.classList.add('animated');
}