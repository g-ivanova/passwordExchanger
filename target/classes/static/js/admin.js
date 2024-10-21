$(document).ready(function() {


    function deleteUser(el){


var user_id=document.getElementById("user_id").value;
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
      Swal.fire({
      title: "Deleted!",
      text: "The user has been deleted.",
      icon: "success"
    });
  $.ajax({
       type: "GET",
       url : "http://localhost:8080/admin/deleteUser/"+el+"/"+user_id,
       contentType: "application/json",
       success: function () {
      window.location.reload();

       },
       error: function () {},
   });

  }
});
}


function deleteGroup(el){


var user_id=document.getElementById("user_id").value;
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
      Swal.fire({
      title: "Deleted!",
      text: "The group has been deleted.",
      icon: "success"
    });
  $.ajax({
       type: "GET",
       url : "http://localhost:8080/admin/deleteGroup/"+user_id+"/"+el,
       contentType: "application/json",
       success: function () {
      window.location.reload();

       },
       error: function () {},
   });

  }
});
}
});
