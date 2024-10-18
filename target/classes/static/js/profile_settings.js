$(document).ready(function() {
    $('#email').focusout(function(){
      $('#email').filter(function(){
        var email = $('#email').val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if ( !emailReg.test( email ) ) {
          document.getElementById("email_error").innerText = "Please provide correct email.";
        }else{
          document.getElementById("email_error").innerText = "";
        }
      });
    });
    $('#new_password').focusout(function(){
      $('#new_password').filter(function(){
          var pass = $('#new_password').val();
          var passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
          if ( !passReg.test( pass ) ) {
              document.getElementById("pass_error").innerText = "Password should be between 6-16 characters. Should contain letters, numbers and special character.";
          }else{
              document.getElementById("pass_error").innerText = "";
          }
      });
    });
    $('#name').focusout(function(){
      $('#name').filter(function(){
          var names = $('#name').val();
          var namesReg = /^[a-zA-Z\s]*$/;
          if ( !namesReg.test( names ) ) {
              document.getElementById("names_error").innerText = "Names are incorrect. Should contain only letters.";
          }else{
              document.getElementById("names_error").innerText = "";
          }
      });
    });
    $('#rep_new_password').on('blur', function() {
      const password = $('#new_password').val();
      const confirm_password = $(this).val();
      if(password != confirm_password) {
          $('#rep_pass_error').text('Passwords do not match!');
      } else {
          $('#rep_pass_error').text('');
      }
    });
});