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
    var nameAndEmail = $("#user option:selected").text();
    const name = nameAndEmail.substring(0, nameAndEmail.indexOf("-"));
    Swal.fire({
        title: "Are you sure you want to add user "+name+" to group "+role+"?",
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
                text: "User "+name+" successfully added to group "+role+"?",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
                icon: "success"
            });
            $('#formAddToGroup').submit();
        } else {
            Swal.fire({
                title: "User is not added to group",
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
    });
});