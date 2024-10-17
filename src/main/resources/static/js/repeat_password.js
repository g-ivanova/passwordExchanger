$(document).ready(function() {
    var password = document.getElementById("user_password"),
        confirm_password = document.getElementById("user_rep_password");
    function validatePassword(){
        if(password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
            confirm_password.setCustomValidity('');
        }
    }
    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
    var new_password = document.getElementById("new_password"),
        confirm_new_password = document.getElementById("rep_new_password");
    function validatePassword(){
        if(new_password.value != confirm_new_password.value) {
            confirm_new_password.setCustomValidity("Passwords Don't Match");
        } else {
            confirm_new_password.setCustomValidity('');
        }
    }
    new_password.onchange = validatePassword;
    confirm_new_password.onchange = validatePassword;
});