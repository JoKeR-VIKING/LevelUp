$(document).ready(function() {
    $('.motherboard').select2();
    $('.cpu').select2();
    $('.gpu').select2();
    $('.ram').select2();
    $('.storage').select2();
    $('.psu').select2();

    $('.motherboard').on('change', function () {
        location.href = `/builds/change?motherboard=${this.value}`;
    });

    window.onload = function () {
        let allMenus = document.getElementsByClassName("select2-selection");
        allMenus[0].style.backgroundColor = "#FFF";

        if (document.getElementsByClassName("select2-selection__rendered")[0].textContent === "Choose Motherboard")
        {
            for (let i=1;i<allMenus.length;i++)
            {
                allMenus[i].style.backgroundColor = "#E1D9D1";
            }
        }
        else
        {
            for (let i=1;i<allMenus.length;i++)
            {
                allMenus[i].style.backgroundColor = "#FFF";
            }
        }
    }
});
