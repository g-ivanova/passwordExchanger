$(document).ready(function () {

    // Initially hide the error message when the page loads
    $('.error-message').hide();

    // Variable to track the form's overall validity
    var isFormValid = false;

    var oldName = $('#name').val();

    // Validate name
    function areNamesValid() {
        var names = $('#name').val();
        var namesReg = /^[a-zA-Z\s]*$/;
        if (!namesReg.test(names) || names.length === 0) {
          $('#names_error').text("Names are incorrect. Should contain only letters.").show();
          isFormValid = false;
        } else {
          $('#names_error').hide();
          isFormValid = true;
        }
    }

    var oldEmail = $('#email').val();
    // Validate email
    function isEmailValid() {
        var email = $('#email').val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(email) || email.length === 0) {
            $('#email_error').text("Please provide correct email.").show();
            isFormValid = false;
        } else {
            var data ={user_id:email ,password:""};
            $.ajax({
                type: "POST",
                url : "http://localhost:8080/validateEmailAndUsername",
                data: data,
                success: function (data) {
                    if(data=="correct"){
                        $('#email_error').hide();
                        isFormValid = true;
                    }
                    if(data=="incorrect"){
                        $('#email_error').text("This email is already taken!").show();
                        isFormValid = false;
                    }
                },
                error: function (data) {
                   isFormValid = false;
                   Swal.fire({
                       title: 'Error!',
                       text: 'An error occurred while validating the email.',
                       icon: 'error'
                   });
                },
            });
        }
    }

    var currentPassword = $("#current_password");
    currentPassword.on('input', onInput);

    function onInput() {
        var duration = 1000;
        clearTimeout(currentPassword._timer);
        currentPassword._timer = setTimeout(() => {
            update(currentPassword.val());
        }, duration);
    }

    function update() {
        var user_id = $("#user_id").val();
        var password = $("#current_password").val();
        var data = { user_id: user_id, password: password };

        if (password === "") {
            $("#new_password").prop("disabled", true);
            $("#rep_new_password").prop("disabled", true);
            $('#current_pass_error').text('');
            isFormValid = true;
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/validatePassword",
                data: data,
                success: function(data) {
                    if (data === "correct") {
                        $("#new_password").prop("disabled", false);
                        $("#rep_new_password").prop("disabled", false);
                        $('#current_pass_error').text('');
                    }
                    if (data === "incorrect") {
                        $("#new_password").prop("disabled", true);
                        $("#rep_new_password").prop("disabled", true);
                        $('#current_pass_error').text('Password is not correct!');
                        $('#pass_error').text('');
                        $('#rep_pass_error').text('');
                        isFormValid = false;
                    }
                },
                error: function() {
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while validating the password.',
                        icon: 'error'
                    });
                },
            });
        }
    }

    // Validate new password
    function isPasswordValid() {
        var pass = $('#new_password').val();
        var oldPass = $('#current_password').val();
        var passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (pass !== oldPass){
            if ((!passReg.test(pass) || !pass) && !isFormValid) {
                 $("#pass_error").text("Password should be between 6-16 characters. Should contain letters, numbers, and special character.");
                 isFormValid = false;
            } else {
                $("#pass_error").text("");
            }
        }
        else {
            $("#pass_error").text("New password can't be the same as current password");
            isFormValid = false;
        }

    }

    // Validate password match
    function doPasswordsMatch() {
        const password = $('#new_password').val();
        const confirm_password = $(this).val();
        if (password !== confirm_password) {
          $('#rep_pass_error').text('Passwords do not match!').show();
          isFormValid = false;
        } else {
          $('#rep_pass_error').hide();
          isFormValid = true;
        }
    }

    function saveProfile() {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap btn swal-cancel',
                confirmButton: 'order-2 btn swal-primary',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Saved!',
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn swal-primary',
                    },
                });
                $('#formSaveProfile').submit();
            } else {
                Swal.fire({
                    title: 'Changes are not saved!',
                    icon: 'info',
                    customClass: {
                        confirmButton: 'btn swal-primary',
                    },
                });
            }
        });
    }

    function toggleSubmitButton() {
        // Check if the form is valid by testing all the fields
        if (isFormValid) {
            $('#saveButton').prop('disabled', false); // Enable the button
        } else {
            $('#saveButton').prop('disabled', true); // Disable the button
        }
    }

    $('#name').on('focusout', function() {
        var newName = $(this).val();
        if (newName !== oldName) {
            oldName = newName;
            areNamesValid();
            toggleSubmitButton();
        }
        else {
            isFormValid = false;
        }
    });

    $('#email').on('focusout', function() {
        var newEmail = $(this).val();
        if (newEmail !== oldEmail) {
            oldEmail = newEmail;
            isEmailValid();
            toggleSubmitButton();
        }
    });

    $('#new_password').on('focusout', function() {
        isPasswordValid();
    });

    $('#rep_new_password').on('blur', function() {
        doPasswordsMatch();
        toggleSubmitButton();
    });
})