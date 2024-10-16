                $(document).ready(function() {
                var new_password = document.getElementById("new_password"),
            confirm_new_password = document.getElementById("rep_new_password");
            function validatePassword(){
            if(new_password.value != confirm_new_password.value) {
                confirm_new_password.setCustomValidity("Passwords Don't Match");
              } else {
                confirm_new_password.setCustomValidity('');
              }
            }
            new_password.onChange = "validatePassword()";
            confirm_new_password.keyup = "validatePassword()";
                });