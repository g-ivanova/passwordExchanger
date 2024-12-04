var name = $("#name");

function onInput(){
    console.log("onInput");
    var duration = 1000;
    clearTimeout(name._timer);
    name._timer = setTimeout(()=>{
        validateName(this.value);
    }, duration);
}

function validateName(){
    var name = $("#name").val();
    var nameReg = /^[a-zA-Z\s]*$/;
    if (!nameReg.test(name) || name.length === 0) {
        $('#name_error').text("Name is incorrect. Should contain only letters.").show();
    } else {
        var data = {user_id:"", password:name};
        if(name.value == ""){
            $("#AddGroup").prop("disabled", true);
            $('#name_error').text('Name can not be empty!').show();
        } else{
            $.ajax({
                type: "POST",
                url : "/validateGroupName",
                data: data,
                success: function (data) {
                    if(data == "correct"){
                        $("#AddGroup").prop("disabled", false);
                        $('#name_error').text('');
                    }
                    if(data=="incorrect"){
                        $("#AddGroup").prop("disabled", true);
                        $('#name_error').text('Name is already taken!').show();
                    }
                },
                error: function () {
                    Swal.fire('Unexpected server error', '', 'error');
                },
            });
        }
    }
}

function createRole(){
    var name = $("#name").val();
    var data = {user_id:"" , password:name};
    Swal.fire({
        title: 'Do you want to save the changes?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap btn swal-cancel',
            confirmButton: 'order-2 btn swal-primary',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Saved!",
                text: "The group has been saved.",
                icon: "success",
                customClass: {
                    confirmButton: 'btn swal-primary',
                }
            });
            $('#formAddGroup').submit();
        } else {
            Swal.fire('Changes are not saved', '', 'info');
        }
    });
}

$(document).ready(function () {
    $("#AddGroup").prop("disabled", true);
    var name = $("#name");
    $("#name").on('input', onInput);
    $('.error-message').hide();
    $('#name').on('input', function() {
        var currentLength = $(this).val().length;
        var maxLength = $(this).attr('maxlength');
        $('#role_name_char-count').text(currentLength + '/' + maxLength);
    });
});