$(document).ready(function() {
    var emailButton = document.getElementById("emailButton");
    var email = document.getElementById("email");
    emailButton.onclick=function(){
        $.ajax({
      	    type: "GET",
            url : "http://localhost:8080/home/resetPassword/sendEmail?email="+email.value,
            contentType: "application/json",
            dataType:"text",
            success: function (data) {
                if(data=="true"){
                    document.getElementById("email").readOnly= true;
                    document.getElementById("emailButton").disabled = true;
                    alert("You have received code!")
                }if(data=="false"){
                    alert("Incorrect email!")
                }
                if(data=="code"){
                 document.getElementById("email").readOnly = true;
                                    document.getElementById("emailButton").disabled = true;
                 alert("You already have a validation code!")
                }
            },
            error: function (data) {
                alert("Error!")
            },
        });
    }
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