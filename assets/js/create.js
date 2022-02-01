document.getElementsByClassName("motherboard")[0].addEventListener('change', function () {
    location.href = `/builds/change?motherboard=${this.value}`;
});
