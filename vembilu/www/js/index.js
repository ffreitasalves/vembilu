var settings = {
    "nome" : "",
    "email" : "",
    "eusei" : "",
    "queroaprender" : ""
};

$(document).ready(function() {

    $('#settings input[type="button"]').click(function(){
        settings.nome = $('#settings input[name="nome"]').val();
        settings.email = $('#settings input[name="email"]').val();
        settings.eusei = $('#settings input[name="eusei"]').val();
        settings.queroaprender = $('#settings input[name="queroaprender"]').val();
        save_user(settings);
        $('#settings').toggleClass('hide');
        $('#list').toggleClass('hide');
    });

    $('#students').on('click', '.make_match', function(event) {
        event.preventDefault();
        var target_email = $(this).parents('.well').find('input[type="hidden"]').val();
        // alert('clicou no '+target_email);
        $(this).attr('disabled', true);
        $(this).parents('.well').addClass('selected');
        console.log('HAEUHAEUHAEUHAUHE')
        console.log(settings.email)
        console.log(target_email)
        check_match(settings.email, target_email);
        /* Act on the event */
    });

    // $('#settings input[name="nome"]').focus();


    // get all users
    $.ajax({
      type: "GET",
      url: "http://vembilu.com/users",
      data: {},
      dataType: "json"
    }).done(function( response ) {
        // response = {
        //     "success": true,
        //     "students": [
        //         {
        //             "nome": "Roberto Bilu",
        //             "email": "roberto.cr@gmail.com",
        //             "eusei": "programação, inglês, geometria",
        //             "queroaprender": "design"
        //         },
        //         {
        //             "nome": "Jacqueline Bilua",
        //             "email": "agenciamelancia@gmail.com",
        //             "eusei": "design, marketing",
        //             "queroaprender": "inglês"
        //         }
        //     ]
        // }
        if(response.success){
            // alert(response.message)
            for (index in response.students){
                student = response.students[index];
                console.log(student);
                $('#students').append('<div class="well well-sm">'+
                    '<div style="float:right"><img src="http://lorempixel.com/64/64/nightlife/?'+Math.random()+'"></div>'+
                    '<b>'+student.nome+'</b><br>'+
                    'Sabe: '+student.eusei+'<br>'+
                    'Quer aprender: '+student.queroaprender+'<input type="hidden" name="email" value="'+student.email+'"><br>'+
                    '<div class="container"><input type="button" class="btn btn-md btn-success center-block make_match" value="Vem!"></div>'+
                    '</div>');
            }
        } else {
            alert('Internet error');
        }
    }).fail(function( jqXHR, textStatus ) {
        alert( "No internet connection! Error: " + textStatus );
    });

});

// // // // // // // 

var save_user = function(settings){
    $.ajax({
      type: "POST",
      url: "http://vembilu.com/users",
      data: settings,
      dataType: "json"
    }).done(function( response ) {
        // quietinho
    }).fail(function( jqXHR, textStatus ) {
        alert( "No internet connection! Error: " + textStatus );
    });
}

// // // // // // // 

var check_match = function(own_email, target_email){
    $.ajax({
      type: "POST",
      url: "http://vembilu.com/match",
      data: {
        own_email: own_email,
        target_email: target_email
      },
      dataType: "json"
    }).done(function( response ) {
        // response = {
        //     "success": false
        // }
        // if( own_email=='ffreitasalves@gmail.com' && target_email=='roberto.cr@gmail.com' ){
        //     response = {
        //         "success": true,
        //         "message": "Você encontrou um par para estudar! Já avisamos a pessoa (caso queira, fale com "+target_email+")"
        //     }
        // }
        if(response.success){
            // alert(response.message);
            alert("Você encontrou um par para estudar! Já avisamos a pessoa (caso queira, fale com "+target_email+")");
        }
    }).fail(function( jqXHR, textStatus ) {
        alert( "No internet connection! Error: " + textStatus );
    });
}