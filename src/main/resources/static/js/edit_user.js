function saveChanges(){
    Swal.fire({
        title: 'Do you want to save the changes?',
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
                text: "Changes successfully saved!",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
                icon: "success"
            });
            document.getElementById('formSave').submit();
        } else {
            Swal.fire({
                title: "Changes are not saved",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
                icon: "info"
            });
        }
    });
}
$(document).ready(function () {
   $('#addButton').prop('disabled', true);
   $("#role_id").change(function() {
    console.log($('#role_id').val());
        if ($('#role_id').val().length !== 0){
            $('#addButton').prop('disabled', false);
        } else {
            $('#addButton').prop('disabled', true);
        }
    });

    var clicked = $('#clicked').val();
    if (clicked == 'true') {
        $('#saveButton').removeAttr('disabled');
    } else {
        $('#saveButton').attr('disabled', 'disabled');
    }
    $('#role_id').multiselect({
        includeSelectAllOption: true,
        nonSelectedText:"Select group",
        numberDisplayed: 5
    });
});
