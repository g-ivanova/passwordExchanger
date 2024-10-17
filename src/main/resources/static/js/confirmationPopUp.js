$(document).ready(function() {
    let alertBox = document.getElementById("customAlertBox");
    let custom_button = document.querySelector(".custom-button");
    let close_img = document.querySelector(".close");
    let body = document.querySelector("body");
    let close_btn = document.getElementById("cancel-alert");
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