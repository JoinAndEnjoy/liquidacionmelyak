var boolGeneral=true;

jQuery(window).load(function () {
    console.log("loaded");
    $("#tabla-puertos .table-input").prop("type","number");
    $("#tabla-puertos-LCL .table-input").prop("type","number");
    $("#tabla-settings .table-input").prop("type","number");
    console.log("hosdf");
    //$(".my-loader").css("display","none");
    $('.my-loader').animate({
        opacity: 0
    }, 1000, function(){
        jQuery(this).css("display","none");
    });
});

$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  


  $('nav ul li:first').addClass('active');
    $('.tab-content:not(:first)').hide();
    $('nav ul li a').click(function (event) {
        event.preventDefault();
        var content = $(this).attr('href');
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        $(content).show();
        $(content).siblings('.tab-content').hide();
        hamburger_cross(); 
        $('#wrapper').toggleClass('toggled');
    });

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
        identifier: [[1,'puerto_cargue'],[2,'puerto_descargue']],
        editable: [ [3, 'FCL_20'], [4, 'FCL_40'], [5, 'tiempo_transito'], [6, 'gastos_fob'], [7, 'gastos_naviera'], [8, 'manejo'], [9, 'collect_fee']]
    },
    buttons: {
        save: {
            html: 'Guardar'
        }
    },
    inputClass: "form-control input-sm table-input",
    deleteButton:false,/*
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
    }*/onAjax: function(action, serialize) {
        console.log('onAjax(action, serialize)');
        console.log(action);
        console.log(serialize);
        $(window).trigger('resize');
        actualizarDatosFCL(serialize);
    }
});

$('#tabla-puertos-LCL').Tabledit({
    columns: {
        identifier: [[1,'puerto_cargue'],[2,'puerto_descargue']],
        editable: [ [3, 'tarifaTon_m3'], [4, 'gasolinaBAF'], [5, 'minimo'], [7, 'tiempo_transito']]
    },
    buttons: {
        save: {
            html: 'Guardar'
        }
    },
    inputClass: "form-control input-sm table-input",
    deleteButton:false,
    onAjax: function(action, serialize) {
        console.log('onAjax(action, serialize)');
        console.log(action);
        console.log(serialize);
        $(window).trigger('resize');
        actualizarDatosLCL(serialize);
    }
});
$('#tabla-settings').Tabledit({
    columns: {
        identifier: [[0,'id']],
        editable: [ [2, 'valor']]
    },
    buttons: {
        save: {
            html: 'Guardar'
        }
    },
    inputClass: "form-control input-sm table-input",
    deleteButton:false,
    onAjax: function(action, serialize) {
        console.log('onAjax(action, serialize)');
        console.log(action);
        console.log(serialize);
        $(window).trigger('resize');
        actualizarDatosSettings(serialize);
    }
});

function actualizarDatosFCL(serialize){
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

function actualizarDatosLCL(serialize){
    console.log("it is working!") // sanity check
    $.ajax({
        url : "editLCL/", // the endpoint
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

function actualizarDatosSettings(serialize){
    console.log("it is working!") // sanity check
    $.ajax({
        url : "editSettings/", // the endpoint
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
    fixedOffset: $('.temp-stripe')
});

$('#tabla-puertos-LCL').stickyTableHeaders({
    fixedOffset: $('.temp-stripe')
});

$('#tabla-settings').stickyTableHeaders({
    fixedOffset: $('.temp-stripe')
});

$('.tabledit-edit-button').click(function(){
    $(window).trigger('resize');
});

$("body").on("keyup", function(e){
    if (e.which === 27){
        return false;
    } 
});

$(".hamburger").click(function(){
    $(window).trigger('resize');
    $('html, body').animate({
        scrollTop: 0
    }, 10);
    return false;
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
