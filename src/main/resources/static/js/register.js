$(document).ready(function () {
    // Initially hide all error messages when the page loads
    $('.error-message').hide();
    // Variables to track the fields' validity
    var areNamesValid = false;
    var isUsernameValid = false;
    var isEmailValid = false;
    var isPasswordValid = false;
    var doPasswordsMatch = false;
    var isGroupSelected = false;
    // Validate names
    function NamesCheck() {
        var names = $('#user_names').val();
        var namesReg = /^[a-zA-Z\s-]*$/;
        if (!namesReg.test(names) || names.length === 0) {
            $('#names_error').text("Names are incorrect. Should contain only letters.").show();
            areNamesValid = false;
        } else {
            $('#names_error').hide();
            areNamesValid = true;
        }
    }
    // Check if username is empty
    function UsernameCheck() {
        var user_username = $('#user_name').val();
        if (user_username.length === 0) {
            $('#username_error').text("Please enter username!").show();
            isUsernameValid = false;
        } else {
            var data ={user_id:user_username ,password:""};
            $.ajax({
                type: "POST",
                url : "http://localhost:8080/validateEmailAndUsername",
                data: data,
                success: function (data) {
                    if(data=="correct"){
                       isUsernameValid = true;
                       $('#username_error').text('');
                    }
                    if(data=="incorrect"){
                        $('#username_error').text("This username is already taken!").show();
                        isUsernameValid = false;
                    }
                },
                error: function (data) {
                    Swal.fire({
                         title: 'Error!',
                         text: 'An error occurred while validating the username.',
                         icon: 'error'
                    });
                    isUsernameValid = false;
                },
            });
        }
    }
    // Validate email
    function EmailCheck() {
        var email = $('#user_email').val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(email) || email.length === 0) {
            $('#email_error').text("Please provide correct email.").show();
            isEmailValid = false;
        } else {
            var data ={user_id:email ,password:""};
            $.ajax({
                type: "POST",
                url : "http://localhost:8080/validateEmailAndUsername",
                data: data,
                success: function (data) {
                    if(data=="correct"){
                        $('#email_error').hide();
                        isEmailValid = true;
                    }
                    if(data=="incorrect"){
                        $('#email_error').text("This email is already registered.").show();
                        isEmailValid = false;
                    }
                },
                error: function (data) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while validating the password.',
                        icon: 'error'
                    });
                    isEmailValid = false;
                },
            });
        }
    }
    // Validate password
    function PasswordCheck() {
        var pass = $('#user_password').val();
        var passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!passReg.test(pass) || pass.length === 0) {
            $('#pass_error').text("Password should be between 6-16 characters. Should contain letters, numbers, and special characters.").show();
            isPasswordValid = false;
        } else {
            $('#pass_error').hide();
            isPasswordValid = true;
        }
    }
    // Validate password match
    function PasswordMatchCheck() {
        var password = $('#user_password').val();
        var confirm_password = $('#user_rep_password').val();
        if (password !== confirm_password) {
            $('#rep_pass_error').text('Passwords do not match!').show();
            doPasswordsMatch = false;
        } else {
            $('#rep_pass_error').hide();
            doPasswordsMatch = true;
        }
    }
    // Check if select field is empty
    function SelectCheck() {
        var roleSelect = $('[name="role_id"]');
        if (roleSelect.val() === '0') {
            $('#select_error').text("Please select group!").show();
            isGroupSelected = false;
        } else {
            $('#select_error').hide();
            isGroupSelected = true;
        }
    }
    // Function to enable or disable the SignUp button
    function toggleSubmitButton() {
        // Check if the form is valid by testing all the fields
        if (areNamesValid && isUsernameValid && isEmailValid && isPasswordValid && doPasswordsMatch && isGroupSelected) {
            $('#SignUp').prop('disabled', false); // Enable the button
        } else {
            $('#SignUp').prop('disabled', true); // Disable the button
        }
    }
    // Focusout event listeners for inputs
    $('#user_names').focusout(function () {
        NamesCheck();
        toggleSubmitButton();
    });
    $('#user_name').focusout(function () {
        UsernameCheck();
        toggleSubmitButton();
    });
    $('#user_email').focusout(function () {
        EmailCheck();
        toggleSubmitButton();
    });
    $('#user_password').focusout(function () {
        PasswordCheck();
        toggleSubmitButton();
    });
    $('#user_rep_password').focusout(function () {
        PasswordMatchCheck();
        toggleSubmitButton();
    });
    // On change for select fields
    $('[name="role_id"]').on('change', function () {
        SelectCheck();
        toggleSubmitButton();
    });
    // Initial button state check
    toggleSubmitButton();
    var roleSelect  = $('[name="role_id"]');
    $('[name="role_id"]').multiselect({
        onChange: function(option, checked) {
            // Get selected options.
            var selectedOptions = $('[name="role_id"] option:selected');
            if (selectedOptions.length >= 3) {
                // Disable all other checkboxes.
                var nonSelectedOptions = $('[name="role_id"] option').filter(function() {
                    return !$(this).is(':selected');
                });
                nonSelectedOptions.each(function() {
                    var input = $('input[value="' + $(this).val() + '"]');
                    input.prop('disabled', true);
                    input.parent('.multiselect-option').addClass('disabled');
                    $(input).parent().attr('style', 'opacity: 0.5; cursor: not-allowed;');
                });
            }
            else {
                // Enable all checkboxes.
                $('[name="role_id"] option').each(function() {
                    var input = $('input[value="' + $(this).val() + '"]');
                    input.prop('disabled', false);
                    input.parent('.multiselect-option').removeClass('disabled');
                    $(input).parent().attr('style', '');
                });
            }
        },
        nonSelectedText:"Select group (max 3 groups)",
    });
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
function register(){
    var email = $("#user_email").val();
    var username = $("#user_name").val();
    var data = { user_id: email, password: username };
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/register/validateUsernameAndEmail",
        data: data,
        success: function (data) {
            if(data=="correct"){
                Swal.fire({
                    title: 'Success!',
                    text: "You were successfully registered!",
                    icon: "success",
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'btn swal-primary',
                    }
                })
                $('#registerForm').submit();
            }
            if(data=="incorrect"){
                $('#error_existing').text('There is already a user with the same username or email!');
            }
        },
        error: function (data) {
            Swal.fire('Unexpected server error', '', 'error');
        },
    });
}