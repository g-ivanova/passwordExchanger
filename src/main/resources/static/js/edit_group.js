function deleteUser(el,names){
    var user_id = $("#user_id").val();
    var role = $("#role_name").val();
    var role_id = $("#role_id").val();
    Swal.fire({
        title: "Are you sure you want to remove user "+names+" from group "+role+"?",
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
                text: "The user has been removed from the group.",
                icon: "success",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
            });
            $.ajax({
                type: "GET",
                url : "http://localhost:8080/admin/"+role_id+"/"+user_id+"/"+el,
                contentType: "application/json",
                success: function () {
                    window.location.reload();
                },
                error: function () {
                    Swal.fire('Unexpected server error', '', 'error');
                },
            });
        } else {
            Swal.fire({
                title: "User is not removed from group",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
                icon: "warning"
            });
        }
    });
}
function AddToGroup(){
    var role = $("#role_name").val();
    var names = $(".multiselect-selected-text").text();
    // Check if more than one name is selected
    var nameArray = names.split(','); // Split the names by commas into an array
    if (nameArray.length > 1) {
    // If there are multiple names, replace the last comma with " and "
    names = nameArray.slice(0, -1).join(', ') + ' and ' + nameArray[nameArray.length - 1];
    }
    var userLabel = nameArray.length > 1 ? "sers " : "ser ";
    Swal.fire({
        title: "Are you sure you want to add u"+userLabel+names+" to group "+role+"?",
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        icon: 'question',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap btn swal-cancel',
            confirmButton: 'order-2 btn swal-primary',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Success!",
                text: "U"+userLabel+names+" successfully added to group "+role+"?",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
                icon: "success"
            });
            $('#formAddToGroup').submit();
        } else {
            Swal.fire({
                title: "U"+userLabel+names+" not added to group",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
                icon: "warning"
            });
        }
    });
}
$(document).ready(function() {
    $('#user').multiselect({
        includeSelectAllOption: true,
        nonSelectedText:"Select user",
        numberDisplayed: 10,
        buttonText: function (options, select){
            if (options.length === 0) {
                return 'Select user';
            } else {
                var selectedNames = [];
                options.each(function() {
                    var optionText = $(this).text(); // Get the full text (name + email)
                    var nameOnly = optionText.split(" - ")[0]; // Get the name part (before the " -")
                    selectedNames.push(nameOnly); // Add the name to the array
                });
                var selectedNamesText = selectedNames.join(', ');
                return selectedNamesText;
            }
        }
    });
    $('#addToGroup').prop('disabled', true);
    $("#user").change(function() {
        if ($('#user').val().length !== 0){
            $('#addToGroup').prop('disabled', false);
        } else {
            $('#addToGroup').prop('disabled', true);
        }
    });
});