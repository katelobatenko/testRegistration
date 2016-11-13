(function ($) {

    //function that post data to server
    function submitForm() {

        $.ajax({
            type: "POST",
            url: "assets/php/form-process.php",
            data: $(this).serialize(),
            success: function (data) {
                $('.results').html(data); // show response from the php script
            },
            complete: function (jqXHR, textStatus) {
                if (textStatus == 'success') {
                    alert('success');
                    window.location.href = "companies.html";
                }
                if (textStatus == 'error') {
                    alert('error');
                }
            }

        });
    }

    //submit #contactForm on page registration.html
    $("#contactForm").submit(function (event) {
        // cancels the form submission
        event.preventDefault();
        submitForm();
    });

    $(document).ready(function () {

        // get data from server
        if (window.location.href.indexOf("companies.html") > -1) {
            $.getJSON('http://codeit.pro/frontTestTask/company/getList', function (jsondata) {
                var items = [];
                console.log(jsondata);

                $.each(jsondata.list, function () {
                    items.push('<li class="name">' + this.name + '</li>');
                });

                $('<ul/>', {
                    'class': 'name-list',
                    html: items.join('')
                }).appendTo('#companies');
            });

            $.getJSON('http://codeit.pro/frontTestTask/news/getList', function (jsondata) {
                var items = [];
                console.log(jsondata);

                $.each(jsondata.list, function () {
//                        console.log("author: " + this.author);
                    items.push('<div class="news">' + '<span>' + this.author +
                        '</span>' + '<em>' + this.date + '</em>' + '<img class="img" src="'
                        + this.img + '"/>' + '</div>');
                });

                $('<div/>', {
                    'class': 'news-carousel',
                    html: items.join('')
                }).appendTo('#owl-carousel');

                //initialize owl-carousel
                $(".news-carousel").owlCarousel();
            });
        }

    });

    $(window).load(function () {
        $(".spinner").fadeOut("slow");
    })

})
    (jQuery);
