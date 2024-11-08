$(document).ready(function () {


  // Initially hide all error messages when the page loads
  $('.error-message').hide();

  // Variable to track the form's overall validity
  var isFormValid = true;



  // Validate email
  function isEmailValid() {
    var email = $('#user_email').val();
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email) || email.length === 0) {
      $('#email_error').text("Please provide correct email.").show();
      isFormValid = false;
           $('#SignUp').prop('disabled', true);
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
                    $('#SignUp').prop('disabled', false); }
 if(data=="incorrect"){
       $('#email_error').text("This email is already registered.").show();
     $('#SignUp').prop('disabled', true);
       isFormValid = false;
            }},
            error: function (data) {
               isFormValid = false;
            },
        });
    }
  }

  // Validate password
  function isPasswordValid() {
    var pass = $('#user_password').val();
    var passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!passReg.test(pass) || pass.length === 0) {
      $('#pass_error').text("Password should be between 6-16 characters. Should contain letters, numbers, and special characters.").show();
      isFormValid = false;
    } else {
      $('#pass_error').hide();
      isFormValid = true;
    }
  }

  // Validate names
  function isNamesValid() {
    var names = $('#user_names').val();
    var namesReg = /^[a-zA-Z\s]*$/;
    if (!namesReg.test(names) || names.length === 0) {
      $('#names_error').text("Names are incorrect. Should contain only letters.").show();
      isFormValid = false;
    } else {
      $('#names_error').hide();
      isFormValid = true;
    }
  }

  // Validate password match
  function isPasswordMatch() {
    var password = $('#user_password').val();
    var confirm_password = $('#user_rep_password').val();
    if (password !== confirm_password) {
      $('#rep_pass_error').text('Passwords do not match!').show();
      isFormValid = false;
    } else {
      $('#rep_pass_error').hide();
      isFormValid = true;
    }
  }

  // Check if username is empty
  function isUsernameEmpty() {
    var user_username = $('#user_name').val();
    if (user_username.length === 0) {
      $('#username_error').text("Please enter username!").show();
      isFormValid = false;
    } else {
    var data ={user_id:user_username ,password:""};
     $.ajax({
                type: "POST",
                url : "http://localhost:8080/validateEmailAndUsername",
                data: data,
                success: function (data) {
                if(data=="correct"){
                   isFormValid = true;
                        $('#SignUp').prop('disabled', false); }
     if(data=="incorrect"){
       $('#username_error').text("This username is already taken!").show();
       isFormValid = false;
            $('#SignUp').prop('disabled', true);
     }

                },
                error: function (data) {
     alert("error");
                },
            });
    }
      $('#username_error').hide();
    }


  // Check if select field is empty
  function isSelectEmpty() {
    var roleSelect = $('[name="role_id"]');
    if (roleSelect.val() === '0') {
      $('#select_error').text("Please select group!").show();
      isFormValid = false;
    } else {
      $('#select_error').hide();
      isFormValid = true;
    }
  }

  // Function to enable or disable the SignUp button
  function toggleSubmitButton() {
    // Check if the form is valid by testing all the fields
    if (isFormValid &&
        $('#user_email').val() !== "" &&
        $('#user_password').val() !== "" &&
        $('#user_names').val() !== "" &&
        $('#user_name').val() !== "" &&
        $('[name="role_id"]').val() !== '0') {
      $('#SignUp').prop('disabled', false); // Enable the button
    } else {
      $('#SignUp').prop('disabled', true); // Disable the button
    }
  }

  // Focusout event listeners for inputs
  $('#user_email').focusout(function () {
    isEmailValid();
    toggleSubmitButton();
  });

  $('#user_password').focusout(function () {
    isPasswordValid();
    toggleSubmitButton();
  });

  $('#user_names').focusout(function () {
    isNamesValid();
    toggleSubmitButton();
  });

  $('#user_rep_password').focusout(function () {
    isPasswordMatch();
    toggleSubmitButton();
  });

  $('#user_name').focusout(function () {
    isUsernameEmpty();
    toggleSubmitButton();
  });

  // On change for select fields
  $('[name="role_id"]').on('change', function () {
    isSelectEmpty();
    toggleSubmitButton();
  });

  // Initial button state check
  toggleSubmitButton();


});
