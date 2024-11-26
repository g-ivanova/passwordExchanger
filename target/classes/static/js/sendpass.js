$(document).ready(function() {
    $('#user').multiselect({
        includeSelectAllOption: true,
        nonSelectedText:"No user selected"
                           });
    $("#role").change(function() {
        var rolevalue=$('#role').val();
        var roleId = $('#role').val();
        var inputValObj = {};
        inputValObj.Discode = roleId;
        var inputVal = JSON.stringify(inputValObj);

        $.ajax({
            type: "GET",
            url : "http://localhost:8080/getUsersFromRole?roleId="+roleId,
            contentType: "application/json",
            success: function (data) {
                $('#user').empty();
                $('#user').multiselect('destroy');
                let obj = $.parseJSON(data);
                $.each(obj, function (key, value) {
                    $('<option>').val(value.user_id).text(value.user_name+" - "+value.user_email).appendTo(user);
                                                   });
                $('#user').multiselect({
                    includeSelectAllOption: true,
                    nonSelectedText:"No user selected"
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
                                           }
        else {
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
