(function ($) {

    //function that post data to server
    function submitForm() {

        $.ajax({
            type: "POST",
            url: "assets/php/form-process.php",
            data: $(this).serialize(),
            success: function (data) {
                window.location.href = "companies.html";
                console.log(data);
            },
            error: function (data) {
                console.log("ERROR");
                console.log(data);
            }

        });
    }

    $(document).ready(function () {

        $('#contactForm').validator().on('submit', function (e) {
            if (e.isDefaultPrevented()) {
                // handle the invalid form...
                console.log("some error");
            } else {
                alert("success");
                submitForm(); // everything looks good!
            }
        });


        // get data from server
        if (window.location.href.indexOf("companies.html") > -1) {
            $.getJSON('http://codeit.pro/frontTestTask/company/getList', function (jsondata) {
                var items = [];
                var strings = [];
                console.log(jsondata);

                $.each(jsondata.list, function () {
                    strings.push(this.name);
                    items.push('<li class="name">' + this.name + '</li>');
                });

                $('<ul/>', {
                    'class': 'name-list',
                    html: items.join('')
                }).appendTo('#companies');


                function findUniqueElementsLenght(arr) {
                    var result = [];

                    nextInput:
                        for (var i = 0; i < arr.length; i++) {
                            var str = arr[i]; // для каждого элемента
                            for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
                                if (result[j] == str) continue nextInput; // если да, то следующий
                            }
                            result.push(str);
                        }

                    return result.length;
                }

                $('<span>', {
                    'class': 'quantity-companies',
                    html: findUniqueElementsLenght(strings)
                }).appendTo('#all-companies');

            });

            $.getJSON('http://codeit.pro/frontTestTask/news/getList', function (jsondata) {
                var items = [];
                console.log(jsondata);

                $.each(jsondata.list, function () {
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
