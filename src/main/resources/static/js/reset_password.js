$(document).ready(function() {
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
                        url : "http://localhost:8080/validateCode",
                        data: data,
                        success: function (data) {
                        if(data=="correct"){
                                                    isFormValid = true;

                                   document.getElementById("new_password").disabled = false;
                                                    document.getElementById("rep_new_password").disabled = false;
                                                                            $('#code_error').text('');}



             if(data=="incorrect"){
                       isFormValid = false;
                       document.getElementById("new_password").disabled = true;
                       document.getElementById("rep_new_password").disabled = true;
                                   $('#pass_error').text('');
            $('#rep_pass_error').text('');

                        $('#code_error').text('Code is not correct!');}
                        },
                        error: function (data) {
             alert("error");
                        },
                    });
            }
        });
            toggleSubmitButton();

});