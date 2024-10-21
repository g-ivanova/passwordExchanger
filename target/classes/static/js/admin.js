$(document).ready(function() {
    function showAlertBox(alertBoxId, userId) {
        document.getElementById(alertBoxId).style.display = "block";
        // Set the href for delete action dynamically
        const deleteLink = document.querySelector(`#customAlertBox-user-${userId} .confirm-delete`);
        deleteLink.href = `/admin/deleteUser/${userId}`; // Adjust the URL as necessary
    }

    function hideAlertBox(alertBoxId) {
        document.getElementById(alertBoxId).style.display = "none";
    }

    $(document).on('click', '.custom-button-user', function (event) {
        event.preventDefault();
        const userId = $(this).data('user-id');
        showAlertBox(`customAlertBox-user-${userId}`, userId);
        console.log("Alert box opened for user ID:", userId);
    });

    $(document).on('click', '.close-user', function () {
        hideAlertBox($(this).closest('.custom-alert-user').attr('id'));
        console.log("Alert box closed");
    });

    $(document).on('click', '[id^="cancel-alert-user-"]', function () {
        hideAlertBox($(this).closest('.custom-alert-user').attr('id'));
        console.log("Cancel clicked, alert box closed");
    });
});
