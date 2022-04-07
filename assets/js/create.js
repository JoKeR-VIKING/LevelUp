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

    $('.cpu').on('change', function () {
        let url = window.location.href;
        let regex = new RegExp('&cpu=[^&]*');
        let match = regex.exec(url);

        if (match)
            url = url.slice(0, match.index) + url.slice(match.index + match[0].length);

        location.href = url + `&cpu=${this.value}`;
    });

    $('.gpu').on('change', function () {
        let url = window.location.href;
        let regex = new RegExp('&gpu=[^&]*');
        let match = regex.exec(url);

        if (match)
            url = url.slice(0, match.index) + url.slice(match.index + match[0].length);

        location.href = url + `&gpu=${this.value}`;
    });

    $('.ram').on('change', function () {
        let url = window.location.href;
        let regex = new RegExp('&ram=[^&]*');
        let match = regex.exec(url);

        if (match)
            url = url.slice(0, match.index) + url.slice(match.index + match[0].length);

        location.href = url + `&ram=${this.value}`;
    });

    $('.storage').on('change', function () {
        let url = window.location.href;
        let regex = new RegExp('&storage=[^&]*');
        let match = regex.exec(url);

        if (match)
            url = url.slice(0, match.index) + url.slice(match.index + match[0].length);

        location.href = url + `&storage=${this.value}`;
    });

    $('.psu').on('change', function () {
        let url = window.location.href;
        let regex = new RegExp('&psu=[^&]*');
        let match = regex.exec(url);

        if (match)
            url = url.slice(0, match.index) + url.slice(match.index + match[0].length);

        location.href = url + `&psu=${this.value}`;
    });

    window.onload = function () {
        let allMenus = document.getElementsByClassName("select2-selection");
        allMenus[0].style.backgroundColor = "#FFF";

        if (document.getElementsByClassName("select2-selection__rendered")[0].textContent === "Choose Motherboard")
        {
            for (let i=1;i<allMenus.length;i++)
            {
                allMenus[i].style.backgroundColor = "dimgray";
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
