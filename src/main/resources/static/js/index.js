$(document).ready(function () {
    function toggleSubmitButton() {
        // Check if the form is valid by testing all the fields
        if ($('#username').val() !== "" &&
           $('#password').val() !== "" ) {
            $('#SignIn').prop('disabled', false); // Enable the button
        } else {
            $('#SignIn').prop('disabled', true); // Disable the button
       }
    }
    // Focusout event listeners for inputs
    $('#username').focusout(function () {
        toggleSubmitButton();
    });

    $('#password').focusout(function () {
        toggleSubmitButton();
    });

    // Initial button state check
    toggleSubmitButton();
});


