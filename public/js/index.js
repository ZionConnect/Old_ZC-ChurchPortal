$(document).ready(function(){
    $('#createButton').on('click', function(){

        var formData = $('#signup').serialize()

        //alert(formData);

        $.post('/api/zionconnect/churchs0.0.1', formData, function(data, statusText){
            alert('Data returned from server: ' + data.success + '. Status text: ' + statusText);
        });

//        if(!$('#name').val()){
//            $('#requiredName').html('* required');
//        }
//        else if(!$('#email').val()){
//            $('#requiredEmail').html('* required');
//        }
//        else if(!$('#address').val()){
//            $('#requiredAddress').html('* required');
//        }
//        else if(!$('#city').val()){
//            $('#requiredCity').html('* required');
//        }
//        else if(!$('#state').val()){
//            $('#requiredState').html('* required');
//        }
//        else if(!$('#zip').val()){
//            $('#requiredZip').html('* required');
//        }
//        else if(!$('#phone').val()){
//            $('#requiredPhone').html('* required');
//        }
//        else {
//            alert('All fields correct. Ajax POST request made back to the server!!')
//        }

    });
})
