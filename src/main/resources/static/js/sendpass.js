$(document).ready(function() {
    $('#user').multiselect({
        includeSelectAllOption: true,
        nonSelectedText:"No user selected",
        onChange: function(option, checked) {
            const userIDSplit=$('#user').val().toString().split(',');
            var ary=$("#user option").map(function(){ return this.value }).get();
			for(var i=0;i<ary.length;i++){
				if(ary[i]===option.val()){
					$("#user option[value='" + ary[i] + "' ]").prop('selected', true);
										}
									}
								}
							});
	$('#role').multiselect({
		includeSelectAllOption: true,
        nonSelectedText:"No user selected"});
    $("#role").change(function() {
		test=$('#role' ).val();
        var rolevalue=$('#role' ).val();
        var roleId=$('#role' ).val();
        const roleIDSplit=roleId.toString().split(',' );
        var inputValObj={};
        inputValObj.Discode=roleId;
        var inputVal=JSON.stringify(inputValObj);
        var text=$('#role option:selected' ).toArray().map(item=>item.text).join();
        $.ajax({
            type: "GET",
            url : "http://localhost:8080/getUsersFromRole?roleId="+roleId,
            contentType: "application/json",
            success: function (data) {
                $('#user').empty();
                $('#user').multiselect('destroy');
                let obj = $.parseJSON(data);
                var group;
				var optgroup = "	<optgroup label='Info'>";
				for(var i=0;i<roleIDSplit.length;i++){
					optgroup=$('<optgroup label="' + roleIDSplit[i] +'" />' );
		            $.each(obj, function (key, value) {
						if(value.roleName===roleIDSplit[i]){
		                    $('<option>').val(value.user_id).text(value.user_name+" -"+value.user_email).appendTo(optgroup);
															}
						optgroup.appendTo('#user');
														});
													}
				$('#user').multiselect({
					includeSelectAllOption: true,
                    nonSelectedText:" No user selected",
		            onChange: function(option, checked) {
						var input=$('input[value="' + option.val() +'"]' );
		                var notSelected=$("#user" ).find('option').not(':selected');
		                var array_text=notSelected.map(function () {return this.text;}).get();
		                var array_value=notSelected.map(function () {return this.value;}).get();
		                for(var i=0;i<array_text.length;i++){
		                    if(array_text[i]===option.text() && array_value[i]!==option.val() && checked){
								var input=$('input[value="' + array_value[i] +'"]' );
		                        input.prop('disabled', true);
		                        input.parent('.multiselect-option').addClass('disabled');
																											}
		                    if(array_text[i]===option.text() && array_value[i]!==option.val() && !checked){
		                        var input=$('input[value="' + array_value[i] +'"]' );
		                        input.prop('disabled', false);
		                        input.parent('.multiselect-option').addClass('');
																											}
															}
														}
										});
									},
		    error: function (data) {
		        $('#user').append('<option>User not available</option>');
                                    },
            });
        });





  // Function to enable or disable the SignUp button
    function toggleSubmitButton() {
// Check if the form is valid by testing all the fields
        if ($('#description').val() !== "" &&
        $('#password').val() !== "" &&
        $('[name="role"]').val() !== 'Select group' &&
        $('[name="user"]').val() !== '0' && $("#user option:selected").text()!=="") {
            $('#SendPass').prop('disabled', false); // Enable the button
                                           }
        else {
            $('#SendPass').prop('disabled', true); // Disable the button
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
    $("#user").change(function() {
        toggleSubmitButton();

                                                 });
  // Initial button state check
    toggleSubmitButton();
});


