$(document).ready(function() {

   $("#role").change(function() {
        var rolevalue=$('#role').val();
        $('#user').find('option').remove();
        $('#user').append($('<option>', {
            value: 0,
            text: 'Select User:'
        }));
        var roleId = $('#role').val();
        var inputValObj = {};
        // alert(distid1);
        inputValObj.Discode = roleId;
        var inputVal = JSON.stringify(inputValObj);
        //  alert(inputVal);
        var data = inputVal.toString();
        //  alert(data);
        $.ajax({
            type: "GET",
            url : "http://localhost:8080/getUsersFromRole?roleId="+roleId,
            contentType: "application/json",
            success: function (data) {
                let obj = $.parseJSON(data);
                $.each(obj, function (key, value) {
                $('<option>').val(value.user_id).text(value.user_name+" - "+value.user_email).appendTo(user);
                //  $('#city').append('<option value="'  + value.districtcode + '">' + value.districtcode + '--' + value.districtname + '</option>');
                });
            },
            error: function (data) {
                $('#city').append('<option>User not available</option>');
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

