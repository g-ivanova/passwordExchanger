                $(document).ready(function() {
                var emailButton = document.getElementById("emailButton");
                var email = document.getElementById("email");
                emailButton.onclick=function(){

      	$.ajax({
      	type: "GET",
        url : "http://localhost:8080/sendEmail?email="+email.value,
        contentType: "application/json",
        dataType:"text",
        success: function (data) {
        if(data=="true"){
        document.getElementById("email").disabled = true;
                document.getElementById("emailButton").disabled = true;
          alert("You have received code!")
          }
          else{
          alert("Incorrect email!")
          }

         },
         error: function (data) {
alert("False!")
         },
      });
}
   });