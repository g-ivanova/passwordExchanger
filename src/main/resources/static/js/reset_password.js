$(document).ready(function() {
    var emailButton = document.getElementById("emailButton");
    var email = document.getElementById("email");
    emailButton.onclick=function(){
        $.ajax({
      	    type: "GET",
            url : "http://localhost:8080/sendEmail?email="+email.value,
            contentType: "application/json",
            dataType:"text",
            success: function (data) {
                if(data=="true"){
                    document.getElementById("email").disabled = true;
                    document.getElementById("emailButton").disabled = true;
                    alert("You have received code!")
                }else{
                    alert("Incorrect email!")
                }
            },
            error: function (data) {
                alert("False!")
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