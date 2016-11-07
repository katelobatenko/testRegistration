(function ($) {

    function submitForm() {

        $.ajax({
            type: "POST",
            url: "assets/php/form-process.php",
            data: $(this).serialize(),
            success: function(data)
            {
                alert(data); // show response from the php script
            }
        });
    }


    $("#contactForm").submit(function (event) {
        // cancels the form submission
        event.preventDefault();
        submitForm();
    });
})(jQuery);
