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
                $('<option>').val(value.user_id).text(value.user_name).appendTo(user);
                //  $('#city').append('<option value="'  + value.districtcode + '">' + value.districtcode + '--' + value.districtname + '</option>');
                });
            },
            error: function (data) {
                $('#city').append('<option>User not available</option>');
            },
        });
    });
});

