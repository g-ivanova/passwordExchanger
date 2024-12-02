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

$(document).ready(function () {
    var emailValid = true;
    var emailChanged = false;
    var nameValid = true;
    var nameChanged = false;
    var currentPasswordValid = false;
    var newPasswordValid = false;
    var repNewPasswordValid = false;
    var user_id = $('#user_id').val();
    var duration = 1000;
    var dropdown = $('#dropdown').val();
    $('#saveButton').prop('disabled', true);
    getDropdown();
    function getDropdown(){
        if(dropdown){
            toggleSubmitButton();
        }
    }
    //On name input check if names are changed and valid
    var name = $('#name');
    name.on('input', onInputName);
    function onInputName(){
        clearTimeout(name._timer);
        name._timer = setTimeout(()=>{
            validateName(this.value);
        }, duration);
    }
    function validateName() {
        var names = $('#name').val();
        var namesReg = /^[a-zA-Z\s]*$/;
        var user_names_before = $('#user_names_before').val();
        if (names === user_names_before){
            nameValid = true;
            nameChanged = false;
            toggleSubmitButton();
            $('#names_error').hide();
        } else if (!namesReg.test(names) || names.length === 0) {
            $('#names_error').text("Names are incorrect. Should contain only letters.").show();
            nameValid = false;
            nameChanged = true;
            toggleSubmitButton();
        } else {
            nameValid = true;
            nameChanged = true;
            toggleSubmitButton();
            $('#names_error').hide();
        }
    }
    //On email input check if email is changed and valid
    var emailF = $('#email');
    emailF.on('input', onInputEmail);
    function onInputEmail(){
        clearTimeout(emailF._timer);
        emailF._timer = setTimeout(()=>{
            validateEmail(this.value);
        }, duration);
    }
    function validateEmail() {
        var email = $('#email').val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var user_email_before = $('#user_email_before').val();
        if(user_email_before === email){
            emailChanged = false;
            emailValid = true;
            toggleSubmitButton();
            $('#email_error').hide();
        } else if (!emailReg.test(email) || email.length === 0) {
            $('#email_error').text("Please provide correct email.").show();
            emailValid = false;
            emailChanged = true;
            toggleSubmitButton();
        } else {
            emailChanged = true;
            var data ={user_id:user_id ,password:email};
            $.ajax({
                type: "POST",
                url : "http://localhost:8080/validateEmailAndUsername",
                data: data,
                success: function (data) {
                    if(data == "correct"){
                        $('#email_error').hide();
                        emailValid = true;
                        toggleSubmitButton();
                    }
                    if(data=="incorrect"){
                        $('#email_error').text("This email is already taken!").show();
                        emailValid = false;
                        toggleSubmitButton();
                    }
                },
                error: function (data) {
                    emailValid = false;
                    toggleSubmitButton();
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while validating the email.',
                        icon: 'error'
                    });
                },
            });
        }
    }
    // Initially hide the error messages when the page loads
    $('.error-message').hide();
    // Initially disable the new_password and rep_new_password fields
    $("#new_password").prop("disabled", true);
    $("#rep_new_password").prop("disabled", true);
    // Validate current password
    var currentPass = $("#current_password");
    currentPass.on('input', onInput);
    function onInput() {
        clearTimeout(currentPass._timer);
        clearTimeout(currentPass._timer);
        currentPass._timer = setTimeout(() => {
            update(currentPass.val());
        }, duration);
    }
    function update() {
        var currentPassword = $("#current_password").val();
        var user_id = $("#user_id").val();
        var data = { user_id: user_id, password: currentPassword };
        if (currentPassword === "") {
            $("#new_password").prop("disabled", true);
            $("#new_password").val('');
            $("#rep_new_password").prop("disabled", true);
            $("#rep_new_password").val('');
            $('#pass_error').text('');
            $('#rep_pass_error').text('');
            $('#current_pass_error').text('');
            currentPasswordValid = false;
            toggleSubmitButton();
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
                        currentPasswordValid=true;
                        toggleSubmitButton();
                    }
                    if (data === "incorrect") {
                        $("#new_password").prop("disabled", true);
                        $("#new_password").val('');
                        $("#rep_new_password").prop("disabled", true);
                        $("#rep_new_password").val('');
                        $('#current_pass_error').text('Password is not correct!');
                        $('#pass_error').text('');
                        $('#rep_pass_error').text('');
                        currentPasswordValid = false;
                        toggleSubmitButton();
                   }
                },
                error: function() {
                    currentPasswordValid = false;
                    toggleSubmitButton();
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while validating the password.',
                        icon: 'error'
                    });
                },
            });
        }
    }
    var newPass = $("#new_password");
    newPass.on('input', newPasswordOnInput);
    function newPasswordOnInput() {
        clearTimeout(newPass._timer);
        newPass._timer = setTimeout(() => {
            isPasswordValid(newPass.val());
        }, duration);
    }
    var repNewPass = $("#rep_new_password");
    repNewPass.on('input', repNewPasswordOnInput);
    function repNewPasswordOnInput() {
        clearTimeout(repNewPass._timer);
        repNewPass._timer = setTimeout(() => {
            doPasswordsMatch(repNewPass.val());
        }, duration);
    }
    // Validate new password
    function isPasswordValid() {
        var newPassword = $("#new_password").val();
        var currentPassword = $("#current_password").val();
        var passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (newPassword !== currentPassword){
            if ((!passReg.test(newPassword) || !newPassword)) {
                $("#pass_error").text("Password should be between 6-16 characters. Should contain letters, numbers, and special character.").show();
                newPasswordValid = false;
                toggleSubmitButton();
            } else {
                $("#pass_error").text("");
                newPasswordValid = true;
                toggleSubmitButton();
            }
        } else {
            $("#pass_error").text("New password can't be the same as current password").show();
            newPasswordValid = false;
            toggleSubmitButton();
        }
    }
    // Validate password match
    function doPasswordsMatch() {
        var repNewPassword = $("#rep_new_password").val();
        var newPassword = $("#new_password").val();
        if (newPassword !== repNewPassword) {
            $('#rep_pass_error').text('Passwords do not match!').show();
            repNewPasswordValid = false;
            toggleSubmitButton();
        } else {
            $('#rep_pass_error').hide();
            repNewPasswordValid = true;
            toggleSubmitButton();
        }
    }
    function toggleSubmitButton() {
        var currentPassword = $("#current_password").val();
        if (emailValid && nameValid && currentPassword === "" && (emailChanged || nameChanged || dropdown) ) {
            $('#saveButton').prop('disabled', false);
        } else if (emailValid && nameValid && currentPasswordValid && newPasswordValid && repNewPasswordValid) {
            $('#saveButton').prop('disabled', false);
        } else {
            $('#saveButton').prop('disabled', true);
        }
    }
    $('#role_id').multiselect({
        includeSelectAllOption: true,
        nonSelectedText:"Select group",
        numberDisplayed: 10
    });
    $('#addButton').prop('disabled', true);
    $("#role_id").change(function() {
        console.log($('#role_id').val());
        if ($('#role_id').val().length !== 0){
            $('#addButton').prop('disabled', false);
        } else {
            $('#addButton').prop('disabled', true);
        }
    });
});