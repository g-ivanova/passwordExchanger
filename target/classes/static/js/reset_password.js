$(document).ready(function() {
    const button = $('#emailButton');
    const buttonExpirationDataKey = 'button-disabled-expiration';
    var i = 0;
    let startButtonStateCheck = () => {
        button.data('interval', setInterval(updateButtonState, 1000));
    }
    let updateButtonState = () => {
        let expirationDate = new Date(button.data('enabledAt'));
        if (expirationDate < new Date()) {
            $('#email_error').text('');
            button.prop('disabled', false);
            clearInterval(button.data('interval'));
        } else {
            $('#email_error').text('You clicked too many times. You have to wait 15 minutes to try to send another email.');
            button.prop('disabled', true);
        }
    }
    let buttonDisableExpiration = localStorage.getItem(buttonExpirationDataKey);
    if (!buttonDisableExpiration) {
        // no button state in localStorage, enable button
        button.prop('disabled', false);
    } else {
        // button state held in localStorage, check every 1s for expiration to enable the button again
        button.data('enabledAt', buttonDisableExpiration);
        updateButtonState();
        startButtonStateCheck();
    }
    var isFormValid = true;
    function toggleSubmitButton() {
        // Check if the form is valid by testing all the fields
        if (isFormValid && $('#code').val() !== "" && $('#email').val() !== "" && $('#new_password').val() !== "" && $('#rep_new_password').val() !== "") {
            $('#resetPasswordButton').prop('disabled', false); // Enable the button
        } else {
            $('#resetPasswordButton').prop('disabled', true); // Disable the button
        }
    }
    $('#resetPasswordButton').prop('disabled', true);
    var emailButton = $('#emailButton');
    var email = $('#email');
    emailButton.click(function(){
        i++;
        console.log("i="+i);
        if(i===3){
            var d1 = new Date();
            var after = new Date (d1);
            after.setMinutes(d1.getMinutes() + 1);
            localStorage.setItem(buttonExpirationDataKey, after);
            button.data('enabledAt', after);
            startButtonStateCheck();
            i = 0;
        } else {
            $.ajax({
      	        type: "GET",
                url: "http://localhost:8080/home/resetPassword/sendEmail?email=" + email.val(),
                contentType: "application/json",
                dataType: "text",
                success: function (data) {
                    if(data == "true"){
                        $("#code").prop("disabled", false);
                        Swal.fire({
                            title: "Success!",
                            text: "Your validation code was sent. Check your email.",
                            icon: "success",
                            customClass: {
                                confirmButton: 'btn swal-primary',
                            }
                        });
                    }
                    if(data == "false"){
                        Swal.fire({
                            title: "Error!",
                            text: "There is no user with this email.",
                            icon: "error",
                            customClass: {
                                confirmButton: 'btn swal-primary',
                            }
                        });
                    }
                    if(data == "code"){
                        $("#code").prop("disabled", false);
                        Swal.fire({
                            title: "Warning!",
                            text: "Your validation code was already sent. Please, check your email!",
                            icon: "warning",
                            customClass: {
                                confirmButton: 'btn swal-primary',
                            }
                        });
                    }
                },
                error: function(data) {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an unexpected error.",
                        icon: "error",
                        customClass: {
                            confirmButton: 'btn swal-primary',
                        }
                    });
                },
            });
        }
        toggleSubmitButton();
    });
    $('#new_password').focusout(function(){
        $('#new_password').filter(function(){
            var pass = $('#new_password').val();
            var passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if (!passReg.test(pass)) {
                $('#pass_error').text("Password should be between 6-16 characters. Should contain letters, numbers, and special characters.");
                isFormValid = false;
            } else {
                $('#pass_error').text("");
                isFormValid = false;
            }
        });
        toggleSubmitButton();
    });
    $('#rep_new_password').on('blur', function() {
        const password = $('#new_password').val();
        const confirm_password = $(this).val();
        if(password !== confirm_password) {
            $('#rep_pass_error').text('Passwords do not match!');
            isFormValid = false;
        } else {
            $('#rep_pass_error').text('');
            isFormValid = true;
        }
        toggleSubmitButton();
    });
    $('#code').on('blur', function() {
        var email = $('#email').val();
        var code = $('#code').val();
        var data = { user_id: email, password: code };
        if(code === "") {
            $('#code_error').text('Code is not valid!');
            isFormValid = false;
            $('#new_password, #rep_new_password').val('').prop('disabled', true);
            $('#pass_error, #rep_pass_error').text('');
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/validateCode",
                data: data,
                success: function (data) {
                    if (data == "correct"){
                        isFormValid = true;
                        $('#new_password, #rep_new_password').prop('disabled', false);
                        $('#code_error').text('');
                    }
                    if(data == "incorrect"){
                        isFormValid = false;
                        $('#new_password, #rep_new_password').val('').prop('disabled', true);
                        $('#pass_error, #rep_pass_error').text('');
                        $('#code_error').text('Code is not correct!');
                    }
                },
                error: function (data) {
                    Swal.fire('Unexpected server error', '', 'error');
                },
            });
        }
    });
    toggleSubmitButton();
    $('input[maxlength]').each(function() {
        var currentLength = $(this).val().length;
        var maxLength = $(this).attr('maxlength');

        // Get the corresponding character count display element
        var countId = '#' + $(this).attr('id') + '_char-count';
        $(countId).text(currentLength + '/' + maxLength);
    });
    $('input[maxlength]').on('input', function() {
        var currentLength = $(this).val().length;
        var maxLength = $(this).attr('maxlength');

        // Get the corresponding character count display element (assumes the display element has the same ID as the field with '_char-count' appended)
        var countId = '#' + $(this).attr('id') + '_char-count';

        $(countId).text(currentLength + '/' + maxLength);
    });
});
function resetPassword(){
    var email = $('#email').val();
    var code = $('#code').val();
    var data = { user_id: email, password: code };
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/validateCode",
        data: data,
        success: function (data) {
            if (data == "correct"){
                Swal.fire({
                    title: 'Do you want to set your new password?',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    customClass: {
                        actions: 'my-actions',
                        cancelButton: 'order-1 right-gap btn swal-cancel',
                        confirmButton: 'order-2 btn swal-primary',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Success!",
                            text: "Your new password was set successfully.",
                            icon: "success",
                            customClass:{
                                confirmButton: 'btn swal-primary',
                            }
                        });
                        $('#formResetPassword').submit();
                    } else {
                        Swal.fire({
                            title: "Warning!",
                            text: "Changes were not saved.",
                            icon: "warning",
                            customClass: {
                                confirmButton: 'btn swal-primary',
                            }
                        });
                    }
                });
            }
            if(data == "incorrect"){
                Swal.fire({
                    title: "Error!",
                    text: "Email or code is not right.",
                    icon: "error",
                    customClass: {
                        confirmButton: 'btn swal-primary',
                    }
                });
            }
        },
        error: function (data) {
            Swal.fire('Unexpected server error', '', 'error');
        },
    });
}