$(document).ready(function() {
    $('.motherboard').select2();
    $('.cpu').select2();
    $('.gpu').select2();
    $('.ram').select2();
    $('.storage').select2();
    $('.psu').select2();

    $('.motherboard').on('change', function (e) {
        location.href = `/builds/change?motherboard=${this.value}`;
    });

    // $('.motherboard').select2({
    //     width: '40%'
    // });
    //
    // $('.cpu').select2({
    //     width: '40%'
    // });
    //
    // $('.gpu').select2({
    //     width: '40%'
    // });
    //
    // $('.ram').select2({
    //     width: '40%'
    // });
    //
    // $('.storage').select2({
    //     width: '40%'
    // });
    //
    // $('.psu').select2({
    //     width: '40%'
    // });
});
