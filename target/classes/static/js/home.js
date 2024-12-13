$(document).ready(function() {
    function filterReceivedPass(event) {
        var input = $("#filterReceivedPass");
        var filter = input.val().toUpperCase();
        var rows = $("#table tbody").children();
        rows.each(function() {
            var row = $(this);
            if (row.text().toUpperCase().indexOf(filter) > -1) {
                row.show();
            } else {
                row.hide();
            }
        });
    }
    $("#filterReceivedPass").on('keyup', filterReceivedPass);
    function filterSentPass(event) {
        var input = $("#filterSentPass");
        var filter = input.val().toUpperCase();
        var rows = $("#sentPass tbody").children();
        rows.each(function() {
            var row = $(this);
            if (row.text().toUpperCase().indexOf(filter) > -1) {
                row.show();
            } else {
                row.hide();
            }
        });
    }
    $("#filterSentPass").on('keyup', filterSentPass);
    $('.admin_settings').hide();
    var username = $("#username").val();
    if (username == "admin") {
        $('.admin_settings').show(); // Show the link if the user is admin
    } else {
        $('.admin_settings').hide(); // Hide the link if the user is not admin
    }
    console.log(username);

});
function CopyText(id){
    let text = $("#" + id + "sendpass").text();
    navigator.clipboard.writeText(text);
}
function SeeText(id){
    let div = $("#" + id);
    let eye = $("#" + id + "eye");
    let slashedEye = $("#" + id + "slashedEye");
    if (div.html() == "******") {
        div.css('visibility', 'visible');
        div.text($("#" + id + "sendpass").text());
        eye.hide();
        slashedEye.show();
    } else {
        div.css('visibility', 'visible');
        div.html("******");
        eye.show();
        slashedEye.hide();
    }
}

function CopyTextAndDelete(id){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/passwordValidity?id=" + id,
        contentType: "application/json",
        success: function () {
            let text = $("#" + id + "pass").html();
            navigator.clipboard.writeText(text);
        },
        error: function () {
            Swal.fire('Unexpected server error', '', 'error');
        },
    });
}
function SeeTextAndDelete(id){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/passwordValidity?id=" + id,
        contentType: "application/json",
        success: function () {
            let div = $("#" + id);
            let eye = $("#" + id + "eye");
            let pass = $("#" + id + "pass");
            let slashedEye = $("#" + id + "slashedEye");
            if (div.html() == "******") {
                div.css('visibility', 'visible');
                div.text(pass.text());
                eye.hide();
                slashedEye.show();
            } else {
                div.css('visibility', 'visible');
                div.html("******");
                eye.show();
                slashedEye.hide();
            }
        },
        error: function () {
            Swal.fire('Unexpected server error', '', 'error');
        },
    });
}

function deletePassword(el){
    var user_id = $("#user_id").val();
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        customClass: {
            actions: 'my-actions',
            cancelButton: 'btn swal-cancel',
            confirmButton: 'btn swal-danger',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "The password has been deleted.",
                icon: "success",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
            });
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/home/" + user_id + "/" + el,
                contentType: "application/json",
                success: function () {
                    location.reload();
                },
                error: function () {
                    Swal.fire('Unexpected server error', '', 'error');
                },
            });
        }
    });
}