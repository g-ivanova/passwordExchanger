/*
$(document).ready(function() {
  // Check if any text input fields or select fields are empty
  bool isAnyFieldEmpty = Array.from(document.querySelectorAll('input[type="text"], select')).some(field => field.value.trim() === '');
  // Enable the button only if all error paragraphs are empty and no text inputs or selects are empty
  document.getElementById('Sign Up').disabled = isAnyFieldEmpty;
  $('#user_email').focusout(function(){
    $('#user_email').filter(function(){
      var email = $('#user_email').val();
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if ( !emailReg.test( email )  || email.length==0) {
        document.getElementById("email_error").innerText = "Please provide correct email.";
        document.getElementById("SignUp").disabled = true;
      }else{
        document.getElementById("email_error").innerText = "";
        document.getElementById("SignUp").disabled = false;
      }
    });
  });
  $('#user_password').focusout(function(){
    $('#user_password').filter(function(){
        var pass = $('#user_password').val();
        var passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if ( !passReg.test( pass )  || !pass) {
            document.getElementById("pass_error").innerText = "Password should be between 6-16 characters. Should contain letters, numbers and special character.";
            document.getElementById("SignUp").disabled = true;
        }else{
            document.getElementById("pass_error").innerText = "";
            document.getElementById("SignUp").disabled = false;
        }
    });
  });
  $('#user_names').focusout(function(){
    $('#user_names').filter(function(){
        var names = $('#user_names').val();
        var namesReg = /^[a-zA-Z\s]*$/;
        if ( !namesReg.test( names ) || !names) {
            document.getElementById("names_error").innerText = "Names are incorrect. Should contain only letters.";
            document.getElementById("SignUp").disabled = true;
        }else{
            document.getElementById("names_error").innerText = "";
            document.getElementById("SignUp").disabled = false;
        }
    });
  });
  $('#user_rep_password').on('blur', function() {
    const password = $('#user_password').val();
    const confirm_password = $(this).val();
    if(password != confirm_password) {
        $('#rep_pass_error').text('Passwords do not match!');
        document.getElementById("SignUp").disabled = true;
    } else {
        $('#rep_pass_error').text('');
        document.getElementById("SignUp").disabled = false;
    }
  });
});









$(document).ready(function () {

  // Initially hide all error messages when the page loads
  $('.error-message').hide();

  var isFormValid;

  // Validate email
  function isEmailValid() {
    var email = $('#user_email').val();
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email) || email.length === 0) {
      $('#email_error').text("Please provide correct email.").show();
      isFormValid = false;
    } else {
      $('#email_error').hide();
      isFormValid = true;
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
    // Check if any non-validated fields are empty
  function isUsernameEmpty(){
    var user_username = $('#user_name').val();
    if (user_username.length === 0) {
        $('#username_error').text("Please enter username!").show();
        isFormValid = false;
    } else {
        $('#username_error').hide();
        isFormValid = true;
    }
  }
  function isSelectEmpty(){
    // Check if any select field is empty
    var roleSelect = $('[name="role_id"]');
    if (roleSelect.val() === '0') {
        $('#select_error').text("Please select group!").show();
        isFormValid = false;
    }
    else {
        $('#select_error').hide();
        isFormValid = true;
    }
  }

  // Focusout event listeners for inputs
  $('#user_email').focusout(function () {
    isEmailValid();
  });
  $('#user_password').focusout(function () {
    isPasswordValid();
  });
  $('#user_names').focusout(function () {
    isNamesValid();
  });
  $('#user_rep_password').focusout(function () {
    isPasswordMatch();
  });
    $('#user_name').focusout(function () {
      isUsernameEmpty();
    });
  // On blur for password confirmation field
  $('#user_rep_password').on('blur', function () {
    isPasswordMatch();
  });
  // On change for select fields
   $('[name="role_id"]').on('change', function () {
    isSelectEmpty();
  });
    // Enable/Disable SignUp button based on the overall validity
    $('#SignUp').prop('enabled', isFormValid);
});*/





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
    } else {
      $('#email_error').hide();
      isFormValid = true;
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
      $('#username_error').hide();
      isFormValid = true;
    }
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
