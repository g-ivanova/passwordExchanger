
$(document).ready(function() {
const button = document.querySelector("#emailButton");
const buttonExpirationDataKey = 'button-disabled-expiration';


var i=0;
let startButtonStateCheck = () => {
  button.dataset.interval = setInterval(updateButtonState, 1000);
}


let updateButtonState = () => {
  let expirationDate = new Date(button.dataset.enabledAt);
  if (expirationDate < new Date()) {
                        document.getElementById("email_error").innerText = "";

    button.disabled = false;
    clearInterval(button.dataset.interval);
  } else {
                  document.getElementById("email_error").innerText = "You clicked too many times. You have to wait 15 minutes to try to send another email.";

    button.disabled = true;
  }
}
let buttonDisableExpiration = localStorage.getItem(buttonExpirationDataKey);
if (!buttonDisableExpiration) {
  // no button state in localStorage, enable button
  button.disabled = false;
} else {
  // button state held in localStorage, check every 1s for expiration to enable the button again
  button.dataset.enabledAt = buttonDisableExpiration;
  updateButtonState();
  startButtonStateCheck();
}

    var isFormValid = true;
    function toggleSubmitButton() {
        // Check if the form is valid by testing all the fields
        if (isFormValid &&
            $('#code').val() !== "" &&
            $('#email').val() !== "" &&
            $('#new_password').val() !== "" &&
            $('#rep_new_password').val() !== "") {
                document.getElementById("resetPasswordButton").disabled = false;// Enable the button
        } else {
            document.getElementById("resetPasswordButton").disabled = true; // Disable the button
        }
    }
    document.getElementById("resetPasswordButton").disabled = true;
    var emailButton = document.getElementById("emailButton");
    var email = document.getElementById("email");
    emailButton.onclick=function(){
        i++;
              console.log("i="+i);
    if(i===3){
      var d1 = new Date();
      var after = new Date ( d1 );
      after.setMinutes ( d1.getMinutes() + 1 );
      localStorage.setItem(buttonExpirationDataKey, after);
        button.dataset.enabledAt = after;
          startButtonStateCheck();

          i=0;
      }
      else{

        $.ajax({
      	    type: "GET",
            url : "http://localhost:8080/home/resetPassword/sendEmail?email="+email.value,
            contentType: "application/json",
            dataType:"text",
            success: function (data) {
                if(data=="true"){
                   // document.getElementById("email").readOnly= true;
                  //  document.getElementById("emailButton").disabled = true;
                    document.getElementById("code").disabled = false;
                    Swal.fire({
                        title: "Success!",
                        text: "Your validation code was sent. Check your email.",
                        icon: "success",
                        customClass: {
                            confirmButton: 'btn swal-primary',
                        }
                    });
                }if(data=="false"){
                    Swal.fire({
                        title: "Error!",
                        text: "There is no user with this email.",
                        icon: "error",
                        customClass: {
                            confirmButton: 'btn swal-primary',
                        }
                    });
                }if(data=="code"){
                  //  document.getElementById("email").readOnly = true;
                   // document.getElementById("emailButton").disabled = true;
                    document.getElementById("code").disabled = false;
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
            error: function (data) {
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
    }
    $('#new_password').focusout(function(){
        $('#new_password').filter(function(){
            var pass = $('#new_password').val();
            var passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if ( !passReg.test( pass ) ) {
                document.getElementById("pass_error").innerText = "Password should be between 6-16 characters. Should contain letters, numbers and special character.";
                isFormValid = false;
            }else{
                document.getElementById("pass_error").innerText = "";
                isFormValid = false;

            }
        });
        toggleSubmitButton();
    });
    $('#rep_new_password').on('blur', function() {
        const password = $('#new_password').val();
        const confirm_password = $(this).val();
        if(password != confirm_password) {
            $('#rep_pass_error').text('Passwords do not match!');
            isFormValid = false;
        } else {
            $('#rep_pass_error').text('');
            isFormValid = true;
        }
        toggleSubmitButton();
    });
    $('#code').on('blur', function() {
        var email=document.getElementById("email").value;
        var code=document.getElementById("code").value;
        var data ={user_id:email,password:code};
        if(code==="") {
            $('#code_error').text('Code is not valid!');
            isFormValid = true;
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/validateCode",
                data: data,
                success: function (data) {
                    if(data=="correct"){
                        isFormValid = true;
                        document.getElementById("new_password").disabled = false;
                        document.getElementById("rep_new_password").disabled = false;
                        $('#code_error').text('');
                    }
                    if(data=="incorrect"){
                        isFormValid = false;
                        document.getElementById("new_password").disabled = true;
                        document.getElementById("rep_new_password").disabled = true;
                        $('#pass_error').text('');
                        $('#rep_pass_error').text('');
                        $('#code_error').text('Code is not correct!');
                    }
                },
                error: function (data) {
                    alert("error");
                },
            });
        }
    });
    toggleSubmitButton();
});