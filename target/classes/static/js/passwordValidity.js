     function SeeText(id){
             	$.ajax({
      	type: "GET",
        url : "http://localhost:8080/passwordValidity?id="+id,
        contentType: "application/json",
        success: function () {
let div = document.getElementById(id);
            let eye = document.getElementById(id+"eye");
            let slashedEye = document.getElementById(id+"slashedEye");
            if(div.style.visibility == 'hidden'){
               div.style.visibility = 'visible';
               eye.style.display = 'none';
               slashedEye.style.display = 'initial';
            }else{
               div.style.visibility = 'hidden';
               eye.style.display = 'initial';
               slashedEye.style.display = 'none';
            }
         },
         error: function () {

         },
      });
        }