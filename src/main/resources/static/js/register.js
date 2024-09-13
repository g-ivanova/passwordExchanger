$(document).ready(function() {
  $('#user_email').focusout(function(){
    $('#user_email').filter(function(){
      var email = $('#user_email').val();
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if ( !emailReg.test( email ) ) {
    document.getElementById("email_error").innerText = "Please provide correct email.";
      }
      else{
       document.getElementById("email_error").innerText = "";
      }
    });
  });
    $('#user_password').focusout(function(){
      $('#user_password').filter(function(){
        var pass = $('#user_password').val();
        var passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if ( !passReg.test( pass ) ) {
      document.getElementById("pass_error").innerText = "Password should be between 6-16 characters. Should contain letters, numbers and special character.";
        }
        else{
         document.getElementById("pass_error").innerText = "";
        }
      });
    });
        $('#user_names').focusout(function(){
          $('#user_names').filter(function(){
            var names = $('#user_names').val();
            var namesReg = /^[a-zA-Z\s]*$/;
            if ( !namesReg.test( names ) ) {
          document.getElementById("names_error").innerText = "Names are incorrect. Should contain only letters.";
            }
            else{
             document.getElementById("names_error").innerText = "";
            }
          });
        });

});