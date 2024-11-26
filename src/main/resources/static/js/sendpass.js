function setDropdownValue () {
    var sendTo = $("#user option:selected").text();
    var sendToNames=sendTo.substring(0, sendTo.indexOf(" - "));
    x = document.getElementById("user");
    x.options[x.selectedIndex].text = sendToNames;
}
function sendPass(){
    var sendTo = $("#user option:selected").text();
    var sendToNames=sendTo.substring(0, sendTo.indexOf(" - "));
    var user_id=document.getElementById("user_id").value;
    var user=document.getElementById("user").value;
    var description=document.getElementById("description").value;
    var password=document.getElementById("password").value;
    Swal.fire({
        title: 'Do you want to send the password?',
        text: "The password will be available for 24 hours or until "+sendTo+" sees or copies it.",
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
                title: "Success!",
                text: "Password successfully sent to "+sendTo+".",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
                icon: "success"
            });
            document.getElementById('formSendPass').submit();
        } else {
            Swal.fire({
                title: "Password is not sent",
                text: "Password is not sent.",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
                icon: "info"
            });
        }
    });
}
$(document).ready(function() {
    $('#user').multiselect({
        includeSelectAllOption: true,
        nonSelectedText:"Select user",
        enableClickableOptGroups: true
    });
    $('#role').multiselect({
        includeSelectAllOption: true,
        nonSelectedText:"Select group"
    });
    $("#role").change(function() {
        var roleId = $('#role').val();
        var inputValObj = {};
        inputValObj.Discode = roleId;
        var inputVal = JSON.stringify(inputValObj);
        console.log(roleId);
        var text = $('#role option:selected').toArray().map(item => item.text).join();
        console.log(text);
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/getUsersFromRole?roleId="+roleId,
            contentType: "application/json",
            success: function (data) {
                $('#user').empty();
                $('#user').multiselect('destroy');
                let obj = $.parseJSON(data);
                $.each(obj, function(key, value) {
                    // Append user options under the correct group
                    $('<option>').val(value.user_id).text(value.user_name + " - " + value.user_email).appendTo(user);
                });
                $('#user').multiselect({
                    includeSelectAllOption: true,
                    nonSelectedText:"Select user",
                    enableClickableOptGroups: true
                });
                $('#user').multiselect('refresh');
            },
            error: function (data) {
                $('#user').append('	<option>User not available</option>');
            },
        });
    });
    // Function to enable or disable the SignUp button
    function toggleSubmitButton() {
        // Check if the form is valid by testing all the fields
        if ($('#description').val() !== "" &&
        $('#password').val() !== "" &&
        $('[name="role"]').val() !== 'Select group' &&
        $('[name="user"]').val() !== '0') {
            $('#SendPass').prop('disabled', false); // Enable the button
        } else {
            $('#SignUp').prop('disabled', true); // Disable the button
        }
    }
    // Focusout event listeners for inputs
    $('#description').focusout(function () {
        toggleSubmitButton();
    });
    $('#password').focusout(function () {
        toggleSubmitButton();
    });
    // On change for select fields
    $('[name="role"]').on('change', function () {
        toggleSubmitButton();
    });
    $('[name="user"]').on('change', function () {
        toggleSubmitButton();
    });
    // Initial button state check
    toggleSubmitButton();
});
