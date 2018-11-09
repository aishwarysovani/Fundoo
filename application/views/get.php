
<html><head><script>
var   data={fname:firstname,lname:lastname,age:age,mobno:mobno,store:'addData'};
       $.ajax({
           type:'POST',
           url:"insert.php",
            data : data,          
           success: function(response)
           {
               read();
           },
           error:function (xhr,status,error){
               alert("error");
           }
       });
    </script></head></html>