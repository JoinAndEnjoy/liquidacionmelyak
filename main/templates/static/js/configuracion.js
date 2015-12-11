var boolGeneral=true;

jQuery(window).load(function () {
    console.log("loaded");
    $(".table-input").prop("type","number");
    console.log("hosdf");
    $(".my-loader").css("display","none");
});


function editarConfGeneral()
{
    if(boolGeneral){
        $(".escondidoGeneral").css("display","block");
        $(".infoGeneral").css("display","none");
    }
    else{
        $(".escondidoGeneral").css("display","none");
        $(".infoGeneral").css("display","block");
    }
    boolGeneral=!boolGeneral;
}

var boolFCL=true;
function editarFCL()
{
    if(boolFCL){
        $(".escondidoFCL").css("display","block");
        $(".infoFCL").css("display","none");
    }
    else{
        $(".escondidoFCL").css("display","none");
        $(".infoFCL").css("display","block");
    }
    boolFCL=!boolFCL;
}

var boolLCL=true;
function editarLCL()
{
    if(boolLCL){
        $(".escondidoLCL").css("display","block");
        $(".infoLCL").css("display","none");
    }
    else{
        $(".escondidoLCL").css("display","none");
        $(".infoLCL").css("display","block");
    }
    boolLCL=!boolLCL;
}

var boolAereo=true;
function editarAereo()
{
    if(boolAereo){
        $(".escondidoAereo").css("display","block");
        $(".infoAereo").css("display","none");
    }
    else{
        $(".escondidoAereo").css("display","none");
        $(".infoAereo").css("display","block");
    }
    boolAereo=!boolAereo;
}

$('#tabla-puertos').Tabledit({
    columns: {
        identifier: [0, 'id'],
        editable: [ [3, 'FCL_20'], [4, 'FCL_40'], [5, 'tiempo_transito'], [6, 'gastos_fob'], [7, 'gastos_naviera'], [8, 'manejo'], [9, 'collect_fee']]
    },
    buttons: {
        save: {
            html: 'Guardar'
        }
    },
    inputClass: "form-control input-sm table-input",
    deleteButton:false,
    onSuccess: function(data, textStatus, jqXHR) {
        console.log('onSuccess(data, textStatus, jqXHR)');
        console.log(data);
        console.log(textStatus);
        console.log(jqXHR);
    },onFail: function(jqXHR, textStatus, errorThrown) {
        console.log('onFail(jqXHR, textStatus, errorThrown)');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    },onAjax: function(action, serialize) {
        console.log('onAjax(action, serialize)');
        console.log(action);
        console.log(serialize);
    }
});

function actualizarDatos(serialize){
    console.log("it is working!") // sanity check
    $.ajax({
        url : "editFCL/", // the endpoint
        type : "POST", // http method
        data : { payload : serialize }, // data sent with the post request

        // handle a successful response
        success : function(json) {
            console.log("success"); // another sanity check
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

$('#tabla-puertos').stickyTableHeaders({
    fixedOffset: $('.navbar-inverse')
});

$('.tabledit-edit-button').click(function(){
    $(window).trigger('resize');
});


//----------------------------------------------------------------------------------------------------------
//                      PARTE 1: Obligatorios AJAX
//----------------------------------------------------------------------------------------------------------
// This function gets cookie with a given name
function getCookie(name)
{
    var cookieValue = null;
    if (document.cookie && document.cookie != '')
    {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++)
        {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '='))
            {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/*The functions below will create a header with csrftoken*/
function csrfSafeMethod(method)
{
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
var csrftoken = getCookie('csrftoken');

function sameOrigin(url)
{
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return(url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
}

$.ajaxSetup({
    beforeSend: function (xhr, settings)
    {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url))
        {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
