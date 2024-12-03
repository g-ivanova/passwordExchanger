$(document).ready(function() {
    $('#user').multiselect({
        includeSelectAllOption: true,
        nonSelectedText:"Select user/s",
        enableClickableOptGroups: true,
        onChange: function(option, checked) {
            const userIDSplit = $('#user').val().toString().split(',');
            var ary = $("#user option").map(function(){ return this.value }).get();
			for(var i = 0; i<ary.length; i++){
				if(ary[i] === option.val()){
					$("#user option[value='" + ary[i] + "' ]").prop('selected', true);
				}
			}
		}
	});
	$('#role').multiselect({
		includeSelectAllOption: true,
        nonSelectedText:"Select group/s"
    });
    $("#role").change(function() {
        var roleId = $('#role').val();
        const roleIDSplit = roleId.toString().split(',');
        var inputValObj = {};
        inputValObj.Discode = roleId;
        var inputVal = JSON.stringify(inputValObj);
        var text = $('#role option:selected').toArray().map(item => item.text).join();
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/getUsersFromRole?roleId=" + roleId,
            contentType: "application/json",
            success: function (data) {
                $('#user').empty();
                $('#user').multiselect('destroy');
                let obj = $.parseJSON(data);
                var group;
				var optgroup = $("<optgroup />").attr('label', 'Info');
				for(var i = 0; i < roleIDSplit.length; i++) {
					optgroup = $('<optgroup />').attr('label', roleIDSplit[i]);
		            $.each(obj, function (key, value) {
						if(value.roleName === roleIDSplit[i]){
		                    $('<option>').val(value.user_id).text(value.user_name + " - " + value.user_email).appendTo(optgroup);
						}
					});
					optgroup.appendTo('#user');
				}
				$('#user').multiselect({
					includeSelectAllOption: true,
                    nonSelectedText:"Select user/s",
                    enableClickableOptGroups: true,
		            buttonText: function (options, select){
                        if (options.length === 0) {
                            return 'Select user/s';
                        } else if (options.length < 8){
                            var selectedNames = [];
                            options.each(function() {
                                var optionText = $(this).text(); // Get the full text (name + email)
                                var nameOnly = optionText.split(" - ")[0]; // Get the name part (before the " -")
                                selectedNames.push(nameOnly); // Add the name to the array
                            });
                            var selectedNamesText = selectedNames.join(', ');
                            return selectedNamesText;
                        } else {
                            return options.length + ' options selected';
                        }
                    },
		            onChange: function(option, checked) {
						var input = $('input[value="' + option.val() + '"]');
		                var notSelected = $("#user").find('option').not(':selected');
		                var array_text = notSelected.map(function () {return this.text;}).get();
		                var array_value = notSelected.map(function () {return this.value;}).get();
		                for (var i = 0; i < array_text.length; i++){
		                    if(array_text[i] === option.text() && array_value[i] !== option.val() && checked){
								var input = $('input[value="' + array_value[i] + '"]');
		                        input.prop('disabled', true);
		                        input.parent('.multiselect-option').addClass('disabled');
							}
		                    if(array_text[i] === option.text() && array_value[i] !== option.val() && !checked){
		                        var input = $('input[value="' + array_value[i] + '"]');
		                        input.prop('disabled', false);
		                        input.parent('.multiselect-option').removeClass('disabled');;
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
        if ($('#description').val() !== "" && $('#password').val() !== "" && $('[name="role"]').val() !== 'Select group' && $('[name="user"]').val() !== '0' && $("#user option:selected").text()!=="") {
            $('#SendPass').prop('disabled', false); // Enable the button
        } else {
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
function setDropdownValue () {
    var sendTo = $("#user option:selected").text();
    var sendToNames = sendTo.substring(0, sendTo.indexOf(" - "));
    x = $("#user");
    x.options[x.selectedIndex].text(sendToNames);
}
function sendPass(){
    var sendTo = $("#user option:selected").map(function() {
        return $(this).text();
    }).get().join(", ");
    var nameArray = sendTo.split(',');
    var selectedNames = [];
    nameArray.forEach(function(item) {
        var nameOnly = item.split(" - ")[0]; // Get the name part (before the " -")
        selectedNames.push(nameOnly); // Add the name to the array
    });
    if (selectedNames.length > 1) {
        var names = selectedNames.slice(0, -1).join(', ') + ' and ' + selectedNames[selectedNames.length - 1];
    }
    var seeLabel = nameArray.length > 1 ? " see or copy " : " sees or copies ";
    var user_id = $("#user_id").val();
    var user = $("#user").val();
    var description = $("#description").val();
    var password = $("#password").val();
    Swal.fire({
        title: 'Do you want to send the password?',
        text: "The password will be available for 24 hours or until "+names+seeLabel+"it.",
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
                text: "Password successfully sent to "+names+".",
                customClass: {
                    confirmButton: 'btn swal-primary',
                },
                icon: "success"
            });
            $('#formSendPass').submit();
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

