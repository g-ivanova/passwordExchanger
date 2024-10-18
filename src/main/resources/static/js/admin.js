$(document).ready(function() {
    let alertBoxGroup = document.getElementById("customAlertBox-group");
    let custom_buttonGroup = document.querySelector(".custom-button-group");
    let close_imgGroup = document.querySelector(".close-group");
    let body = document.querySelector("body");
    let close_btnGroup = document.getElementById("cancel-alert-group");
    custom_buttonGroup.addEventListener('click', function () {
        alertBoxGroup.style.display = "block";
    });
    close_img-group.addEventListener('click', function () {
        alertBoxGroup.style.display = "none";
    });
    close_btn.addEventListener('click', function () {
        alertBoxGroup.style.display = "none";
    });
    let alertBox = document.getElementById("customAlertBox-user");
    let custom_button = document.querySelector(".custom-button-user");
    let close_img = document.querySelector(".close-user");
    let close_btn = document.getElementById("cancel-alert-user");
    custom_button.addEventListener('click', function () {
        alertBox.style.display = "block";
    });
    close_img.addEventListener('click', function () {
        alertBox.style.display = "none";
    });
    close_btn.addEventListener('click', function () {
        alertBox.style.display = "none";
    });
});