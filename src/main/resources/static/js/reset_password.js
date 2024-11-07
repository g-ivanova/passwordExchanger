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
                    Swal.fire({
                      title: "Success!",
                      text: "Your validation code was sent. Check your email.",
                      icon: "success"
                    });

                }if(data=="false"){
                            Swal.fire({
                                title: "Error!",
                                text: "There is not user with this email.",
                                icon: "error"
                            });
                }
                if(data=="code"){
                 document.getElementById("email").readOnly = true;
                                    document.getElementById("emailButton").disabled = true;
                 Swal.fire({
                                       title: "Warning!",
                                       text: "Your validation code was already sent. Check your email.",
                                       icon: "warning"
                                     });
                }
            },
            error: function (data) {
                        Swal.fire({
                                                title: "Error!",
                                                text: "There was an unexpected error.",
                                                icon: "error"
                                            });
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