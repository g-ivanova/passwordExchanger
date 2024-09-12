$(document).ready(function() {
   $("#state").change(function() {
    $('#city').find('option').remove();
         $('#city').append('<option>Select user</option>');
       var distid1 = $('#state').val();
            var inputValObj = {};
           // alert(distid1);
            inputValObj.Discode = distid1;
            var inputVal = JSON.stringify(inputValObj);
          //  alert(inputVal);
            var data = inputVal.toString();
          //  alert(data);

      	$.ajax({
      	type: "GET",
        url : "http://localhost:8080/getCitiesForSelectedState?countryId="+distid1,
        contentType: "application/json",
        success: function (data) {
            let obj = $.parseJSON(data);
            $.each(obj, function (key, value) {
            $('<option>').val(value.districtcode).text(value.districtname).appendTo(city);
             //  $('#city').append('<option value="'  + value.districtcode + '">' + value.districtcode + '--' + value.districtname + '</option>');
            });
         },
         error: function (data) {
            $('#taluklist').append('<option>Taluk Unavailable</option>');
         },
      });
   });
   });