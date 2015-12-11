/* global parseFloat */

//----------------------------------------------------------------------------------------------------------
//						PARTE 1: Obligatorios AJAX
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

//----------------------------------------------------------------------------------------------------------
//																					PARTE 2: Angularjs
//----------------------------------------------------------------------------------------------------------

//1) Preparacion del ambiente de Angular
var app = angular.module('appMelyak', []);
app.controller('ctrlMelyak', function ($scope)
{
    $scope.user = {};
    $scope.user.otm = false;
    //TODO: poner los valores que son.
    $scope.configTipoProducto = [{name: "Textiles", value: "Textiles"},
        {name: "Confecciones", value: "Confecciones"},
        {name: "Ferreteria", value: "Ferreteria"},
        {name: "Autopartes", value: "Autopartes"},
        {name: "Jugueteria", value: "Jugueteria"},
        {name: "Productos Medicos", value: "Productos Medicos"},
        {name: "Farmaceuticos", value: "Farmaceuticos"},
        {name: "Maquinaria Agricola", value: "Maquinaria Agricola"},
        {name: "Electricidad", value: "Electricidad"},
        {name: "peligrosa (IMO)", value: "peligrosa (IMO)"},
        {name: "Carga general no peligrosa", value: "Carga general no peligrosa"}];
    $scope.user.tipoProducto = $scope.configTipoProducto[0].value;
    //TODO: poner los valores que son.
    $scope.configTipoMoneda = [{name: "USD", value: "USD"}, {name: "COP", value: "COP"}, {name: "EUR", value: "EUR"}];
    $scope.user.tipoMoneda = $scope.configTipoMoneda[0].value;
    $scope.configTipoEnvio = [{name: "Via Maritima", value: "Via Maritima"}, {name: "Via Aerea", value: "Via Aerea"}, {name: "Proyecto Especial", value: "Proyecto Especial"}];
    $scope.configTipoEnvio2 = [{name: "Full Container Load (FCL)", value: "FCL"}, {name: "Less than Container Load (LCL)", value: "LCL"}];

    //Para pedir los pasises a la base de datos
    $.ajax({
        url: 'auxiliar/get/paisesJSON',
        type: "GET",
        success: function (json)
        {
            var data = json.todos_pais;
            $scope.$apply(function ()
            {
                $scope.configPais = data;
                $scope.user.paisDatos = $scope.configPais[50].cc_fips;//El numero corresponde a Colombia (50)
                $scope.user.paisProducto = $scope.configPais[0].cc_fips;
            });

            $scope.cambiarCiudades("CO"); //Para colombia es CO

            $("#boton1").removeAttr("disabled");
        }
    });

    //Para pedir la informacion de los puertos a la base de datos (FCL)
    $.ajax({
        url: 'auxiliar/get/getParejasPuertosJSON_FCL',
        type: "GET",
        success: function (json)
        {
            $scope.$apply(function ()
            {
                $scope.configParPuertosFCL = json.infoFCL;
                $scope.user.idPuertosFCL = $scope.configParPuertosFCL[0].id;
                $scope.puertoLlegadaFCL = $scope.configParPuertosFCL[0].puerto_descargue;
            });
            $("#boton1").removeAttr("disabled");
        }
    });

    $scope.cambiarPuertosFCL = function (id)
    {
        for (var i = 0; i < $scope.configParPuertosFCL.length; i++)
        {
            if ($scope.configParPuertosFCL[i].id === id)
            {
                $scope.puertoLlegadaFCL = $scope.configParPuertosFCL[i].puerto_descargue;
                break;
            }
        }
    };

    //Para pedir la informacion de los puertos a la base de datos (LCL)
    $.ajax({
        url: 'auxiliar/get/getParejasPuertosJSON_LCL',
        type: "GET",
        success: function (json)
        {
            $scope.$apply(function ()
            {
                $scope.configParPuertosLCL = json.infoLCL;
                $scope.user.idPuertosLCL = $scope.configParPuertosLCL[0].id;
                $scope.puertoLlegadaLCL = $scope.configParPuertosLCL[0].puerto_descargue;
            });
            $("#boton1").removeAttr("disabled");
        }
    });

    $scope.cambiarPuertosLCL = function (id)
    {
        for (var i = 0; i < $scope.configParPuertosLCL.length; i++)
        {
            if ($scope.configParPuertosLCL[i].id === id)
            {
                $scope.puertoLlegadaLCL = $scope.configParPuertosLCL[i].puerto_descargue;
                break;
            }
        }
    };

    var contenedores = [0, 0, 0];
    var nombres = ["20", "40", "Aereo"];
    //Cuando lo meto en un for se daña
    $("#slider" + nombres[0]).slider({max: 10}).slider("pips", {rest: "label"}).on("slidechange", function (e, ui) {
        $scope.crearCajas(ui, 0);
    });
    $("#slider" + nombres[1]).slider({max: 10}).slider("pips", {rest: "label"}).on("slidechange", function (e, ui) {
        $scope.crearCajas(ui, 1);
    });
    $("#slider" + nombres[2]).slider({max: 10}).slider("pips", {rest: "label"}).on("slidechange", function (e, ui) {
        $scope.crearCajas(ui, 2);
    });

    $scope.crearCajas = function (ui, index)
    {
        var hayQueArmar = ui.value - contenedores[index];
        if (hayQueArmar > 0)
        {
            var aPoner = contenedores[index] + 1;
            for (var i = 0; i < hayQueArmar; i++)
            {
                //Se crean diferentes cosas segun el contenedor
                var texto = "<div class='row' id='caja" + nombres[index] + "_" + aPoner + "'>";
                if (index === 0)
                    texto += "<i class='col-md-1 col-sm-1 col-xs-1 fa fa-cube'></i><p class='col-md-2 col-sm-2 col-xs-2'>" + aPoner + ":</p><input class='col-xs-8' id='FCL20_" + aPoner + "' type='number' min=0 value=0\>";
                else if (index === 1)
                    texto += "<i class='col-md-1 col-sm-1 col-xs-1 fa fa-cube'></i><p class='col-md-2 col-sm-6 col-xs-2'>" + aPoner + ":</p><input class='col-xs-8' id='FCL40_" + aPoner + "' type='number' min=0 value=0\>";
                else if (index === 2)
                {
                    //texto += "<p> Caja #" + aPoner + ":</p>";
                    texto += "<div class='row' id='medidas'>";
                    texto += "<div class='col-xs-3 input-group'>";
                    texto += "<input type='number' min='0' class='form-control cosasSerias' placeholder='X [m]' aria-describedby='basic-addonancho'>";
                    texto += "<span class='input-group-addon' id='basic-addonancho'><i class='fa fa-arrows-h fa-lg'></i></span>";
                    texto += "</div>";
                    texto += "<div class='col-xs-3 input-group'>";
                    texto += "<input type='number' min='0' class='form-control cosasSerias' placeholder='Y [m]' aria-describedby='basic-addonalto'>";
                    texto += "<span class='input-group-addon' id='basic-addonalto'><i class='fa fa-arrows-v fa-lg'></i></span>";
                    texto += "</div>";
                    texto += "<div class='col-xs-3 input-group'>";
                    texto += "<input type='number' min='0' class='form-control cosasSerias' placeholder='Z [m]' aria-describedby='basic-addonprofundo'>";
                    texto += "<span class='input-group-addon' id='basic-addonprofundo'><i class='fa fa-expand fa-lg'></i></span>";
                    texto += "</div>";
                    texto += "<div class='col-xs-3 input-group'>";
                    texto += "<input type='number' min='0' class='form-control cosasSerias' placeholder='[Ton]' aria-describedby='basic-addonpeso'>";
                    texto += "<span class='input-group-addon' id='basic-addonpeso'><i class='fa fa-balance-scale'></i></span>";
                    texto += "</div>";
                    texto += "</div>";
                }
                texto += "</div>";
                $("#containers" + nombres[index]).append(texto);
                aPoner++;
            }
        } else if (hayQueArmar < 0)//Cuando tengo que quitar contenedores
        {
            var aQuitar = contenedores[index];
            hayQueArmar *= -1;
            for (var i = 0; i < hayQueArmar; i++)
            {
                var texto = "#caja" + nombres[index] + "_" + aQuitar;
                $(texto).remove();
                aQuitar--;
            }
        }
        contenedores[index] = ui.value;
        if (contenedores[0] !== 0 || contenedores[1] !== 0)
            $("#textosPreguntaPeso").css("display", "block");
        else
            $("#textosPreguntaPeso").css("display", "none");
    };

    //Este metodo se llama desde los botones de siguiente y anterior
    $scope.mostrarPag = function (pagina)
    {
        if(pagina === 2)
        {
            var pasa = true;
            if (angular.isUndefined($scope.user.nombre) || $scope.user.nombre === "") {
                pasa = false;
                $("#avisoNombre").css("display", "block");
            } else
                $("#avisoNombre").css("display", "none");
            if (angular.isUndefined($scope.user.correo) || $scope.user.correo === "") {
                pasa = false;
                $("#avisoCorreo").css("display", "block");
            } else
                $("#avisoCorreo").css("display", "none");
            if (angular.isUndefined($scope.user.telefono) || $scope.user.telefono === "") {
                pasa = false;
                $("#avisoTelefono").css("display", "block");
            } else
                $("#avisoTelefono").css("display", "none");

            if (pasa)
            {
                //Sobre aparecer las diferentes partes del formulario
                $("#Parte1").css("display", "none");
                $("#Parte2").css("display", "block");
                $("#Parte3").css("display", "none");
                //Sobre colorear las bolitas
                $("#bola1").attr("class", "bolitas primera apagada movidas");
                $("#bola2").attr("class", "bolitas segunda activa movidas");
                $("#bola3").attr("class", "bolitas tercera apagada");
                //Sobre los colores de los textos bajo las bolas
                $("#textoB1").css("color", "#909090");
                $("#textoB2").css("color", "#000000");
                $("#textoB3").css("color", "#909090");
                //Sobre los chulos
                $("#num1").css("display", "none");
                $("#bola1").css("padding-top", "5px");
                $("#chulo1").css("display", "block");
                $("#chulo1").css("color", "green");
            }
        } else if (pagina === 3)
        {
            var pasa = true;
            //decide si mostrar o no cada uno de los errores de tipado
            if (angular.isUndefined($scope.user.valorMercancia) || $scope.user.valorMercancia === "" || $scope.user.valorMercancia == null) {
                pasa = false;
                $("#avisoValMerc").css("display", "block");
            } else
                $("#avisoValMerc").css("display", "none");
            if (angular.isUndefined($scope.user.prdif) || $scope.user.prdif === "" || $scope.user.prdif == null) {
                pasa = false;
                $("#avisoPrdif").css("display", "block");
            } else
                $("#avisoPrdif").css("display", "none");
            if (angular.isUndefined($scope.user.tipoEnvio) || $scope.user.tipoEnvio === "") {
                pasa = false;
                $("#avisoTipoEnvio").css("display", "block");
            } else
            {
                $("#avisoTipoEnvio").css("display", "none");
                if ($scope.user.tipoEnvio === "Via Maritima")
                {
                    if (angular.isUndefined($scope.user.tipoEnvio2) || $scope.user.tipoEnvio2 === "") {
                        pasa = false;
                        $("#avisoTipoEnvio2").css("display", "block");
                    } else
                        $("#avisoTipoEnvio2").css("display", "none");
                }
            }

            $scope.user.arregloFCL_20 = [];
            $scope.user.arregloFCL_40 = [];
            $scope.user.arregloAereo = [];
            for (var c = 0; c < 3; c++)
            {
                for (var i = 1; i <= contenedores[c]; i++)
                {
                    if (c === 0)
                        $scope.user.arregloFCL_20.push($("#FCL20_" + i).val());
                    else if (c === 1)
                        $scope.user.arregloFCL_40.push($("#FCL40_" + i).val());
                    else if (c === 2)// TODO: esto debe guardar un objeto con 4 atributos
                        $scope.user.arregloAereo.push($("#Aereo_" + i).val());
                }
            }

            if (pasa)
            {
                $("#Parte2").css("display", "none");
                $("#waitting").css("display", "block");
                $.ajax({
                    url: 'auxiliar/post/metodoPrincipal/', // the endpoint
                    type: "POST", // http method
                    data: {elUsuario: JSON.stringify(angular.toJson($scope.user))},
                    // handle a successful response
                    success: function (json)
                    {
                        $("#Parte1").css("display", "none");
                        $("#Parte2").css("display", "none");
                        //--------------Dependiendo del tipo de cotizacion-------------------
                        $("#Parte3").css("display", "block");
                        var tipoCotizacion;
                        if ($scope.user.tipoEnvio === "Via Aerea")
                            tipoCotizacion = "Via Aerea";
                        else if ($scope.user.tipoEnvio === "Via Maritima")
                        {
                            if ($scope.user.tipoEnvio2 === "FCL")
                                tipoCotizacion = "FCL";
                            else if ($scope.user.tipoEnvio2 === "LCL")
                                tipoCotizacion = "LCL";
                        } else if ($scope.user.tipoEnvio === "Proyecto Especial")
                            tipoCotizacion = "Proyecto Especial";

                        pintarPagina3(json, tipoCotizacion);
                        $scope.cotizacion=json;
                        //-------------------------------------------------------------------
                        $("#waitting").css("display", "none");
                        //Sobre colorear las bolitas
                        $("#bola1").attr("class", "bolitas primera apagada movidas");
                        $("#bola2").attr("class", "bolitas segunda apagada movidas");
                        $("#bola3").attr("class", "bolitas tercera activa");
                        //Sobre los colores de los textos bajo las bolas
                        $("#textoB1").css("color", "#909090");
                        $("#textoB2").css("color", "#909090");
                        $("#textoB3").css("color", "#000000");
                        //Sobre los chulos
                        $("#num2").css("display", "none");
                        $("#bola2").css("padding-top", "5px");
                        $("#chulo2").css("display", "block");
                        $("#chulo2").css("color", "green");
                    },
                    // handle a non-successful response
                    error: function (xhr, errmsg, err)
                    {
                        $('body').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
                    }
                });
            }
        }
    };

    $scope.cambiarCiudades = function (cc_fips)
    {
        if (cc_fips === "")
            $("#ciudad_datos").html("");
        else
        {
            var laUrl = "auxiliar/get/JSON_" + cc_fips;
            $.ajax({
                url: laUrl,
                type: "GET",
                success: function (json)
                {
                    var data = json.todas_ciudades;
                    $scope.$apply(function ()
                    {
                        $scope.configCiudad = data;
                        if (cc_fips === "CO")
                            $scope.user.ciudad_datos = $scope.configCiudad[1279].nombre_ciudad;//: El numero corresponde a Bogota es (1279)
                        else
                            $scope.user.ciudad_datos = $scope.configCiudad[0].nombre_ciudad;
                        $("#icono_datos").css("display", "none");
                        $("#boton1").removeAttr("disabled");
                    });

                }
            });
            $("#icono_datos").css("display", "block");
            $("#boton1").attr("disabled", "true");
        }
    };

    $scope.enviarLiquidacion = function () {
        $scope.cotizacion.infoUser=$scope.user;
        $.ajax({
            url: 'auxiliar/post/hacerCotizacion/', // the endpoint
            type: "POST", // http method
            data: {cotizacion: JSON.stringify(angular.toJson($scope.cotizacion))},
            // handle a successful response
            success: function (json)
            {
                console.log(json);
            },
            // handle a non-successful response
            error: function (xhr, errmsg, err)
            {
                $('body').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                        " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    };

    $scope.cambiarTipoEnvio = function (tipoEnvio)
    {
        if (tipoEnvio === "Via Aerea")
        {
            $("#proyectoEspecial").css("display", "none");
            $("#TipoEnvioBarco").css("display", "none");
            $(".maritimo").css("display", "none");
            $("#envioAereo").css("display", "block");
            $("#part2_cuadrado1").css("padding-bottom", "6px");
        } else if (tipoEnvio === "Proyecto Especial")
        {
            $("#proyectoEspecial").css("display", "block");
            $("#TipoEnvioBarco").css("display", "none");
            $(".maritimo").css("display", "none");
            $("#part2_cuadrado1").css("padding-bottom", "6px");
            $("#envioAereo").css("display", "none");
        } else if (tipoEnvio === "Via Maritima")
        {
            $("#proyectoEspecial").css("display", "none");
            $("#envioAereo").css("display", "none");
            $("#TipoEnvioBarco").css("display", "block");
            $("#part2_cuadrado1").css("padding-bottom", "20px");
            if (angular.isDefined($scope.user.tipoEnvio2))
            {
                if ($scope.user.tipoEnvio2 === "FCL")
                {
                    $("#maritimoFCL").css("display", "block");
                    $("#maritimoLCL").css("display", "none");
                } else if ($scope.user.tipoEnvio2 === "LCL")
                {
                    $("#maritimoFCL").css("display", "none");
                    $("#maritimoLCL").css("display", "block");
                }
            }
        } else if (tipoEnvio === "FCL")
        {
            $("#maritimoFCL").css("display", "block");
            $("#maritimoLCL").css("display", "none");
        } else if (tipoEnvio === "LCL")
        {
            $("#maritimoFCL").css("display", "none");
            $("#maritimoLCL").css("display", "block");
        }
    };
});

function pintarPagina3(json, tipoCotizacion)
{
    //"Via Aerea" "LCL"
    var contenido = "";
    var textospar3 = ["1. Informacion del Transporte", "2. Costos de la Carga", "3. Costos Fijos", "4. Costos Opcionales"];
    if (tipoCotizacion === "FCL" || tipoCotizacion === "LCL" )
    {
        var k, keys = [];
        for (k in json)
            if (json.hasOwnProperty(k))
                keys.push(k);

        keys.sort();
        var granTotal = 0;

        for (var i = 0; i < keys.length; i++)
        {
            k = keys[i];
            contenido += "<div id='part3_cuadrado" + (i + 1) + "' class='cuadrado'>";
            contenido += "<span class='dato agrandado escondido uppercase'>" + textospar3[i] + "</span><br/><br/>";

            var total = 0;
            //console.log(k);
            for (var key in json[k])
            {
                //if(json[k].hasOwnProperty(key)) console.log("    "+key + " -> " + json[k][key]);
                if (key === "Divisa")
                    continue;
                contenido += "<div class='row'>";
                if ($.isNumeric(json[k][key]) && i > 0)
                {
                    var valorAPoner = parseFloat(Math.round(json[k][key] * 100) / 100).toFixed(2);
                    contenido += "<span id='" + key.replace(/\s/g, "") + "' class='dato col-md-7 col-sm-7 col-xs-7'>" + key + "</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ " + valorAPoner + "</span>";
                    total += json[k][key];
                } else
                    contenido += "<span id='" + key.replace(/\s/g, "") + "' class='dato col-md-7 col-sm-7 col-xs-7'>" + key + "</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>" + json[k][key] + "</span>";
                contenido += "</div>";
            }
            if (i > 0) //No se espera que el primero tenga un total porque es el de informacion general
            {
                contenido += "<div class='row'>";
                contenido += "<span class='dato col-md-9 col-sm-9 col-xs-9 total'>Total</span><span class='dato derecha col-md-3 col-sm-3 col-xs-3 conNegrilla'>$ " + parseFloat(Math.round(total * 100) / 100).toFixed(2) + "</span>";
                contenido += "</div>";
            }
            contenido += "</div>";
            granTotal += total;
        }
        contenido += "<div id='part3_cuadradoVerde' class='cuadrado'>";
        contenido += "	<div class='row'>";
        contenido += "      <span class='dato col-md-7 col-sm-7 col-xs-7 textoBlanco conNegrilla'>Total liquidación costos de importación</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris textoBlanco conNegrilla'>$ " + parseFloat(Math.round(granTotal * 100) / 100).toFixed(2) + "</span>";
        contenido += "	</div>";
        contenido += "</div>";
    } else if (tipoCotizacion === "Proyecto Especial")
    {
        contenido = "<div id='part3_cuadrado1' class='cuadrado'>";
        contenido += "  <span class='dato agrandado escondido uppercase'>1. Aviso</span><br/><br/>";
        contenido += "</div>";
    } else
    {
        contenido = "<div id='part3_cuadrado1' class='cuadrado'>"
                + "							<span class='dato agrandado escondido uppercase'>1. Tributos Aduaneros</span><br/><br/>"
                + "							<div class='row'>"
                + "								<span id='gravamen' class='dato col-md-7 col-sm-7 col-xs-7'>Gravamen</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 0</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='iva' class='dato col-md-7 col-sm-7 col-xs-7'>IVA 16% (IVA deducible de aduanas)</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 5.843.456</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span class='dato col-md-7 col-sm-7 col-xs-7 total'>Total</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 conNegrilla'>$ 5.843.456</span>"
                + "							</div>"
                + "						</div>"
                + "						<div id='part3_cuadrado2' class='cuadrado'>"
                + "							<span class='dato agrandado escondido uppercase'>2. Flete internacional</span><br/><br/>"
                + "							<div class='row'>"
                + "								<span id='flete' class='dato col-md-7 col-sm-7 col-xs-7'>Flete internacional</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 15.609.600</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='bl' class='dato col-md-7 col-sm-7 col-xs-7'>BL</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 137.500</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='manejo' class='dato col-md-7 col-sm-7 col-xs-7'>Manejo logístico</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 2.100.000</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='radicacion' class='dato col-md-7 col-sm-7 col-xs-7'>Radicación, liberación y endoso</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 600.000</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='emisionBl' class='dato col-md-7 col-sm-7 col-xs-7'>Emisión BL</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 137.500</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='colect' class='dato col-md-7 col-sm-7 col-xs-7'>Colect Fee</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 468.288</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='seguro' class='dato col-md-7 col-sm-7 col-xs-7'>Seguro de transporte de mercancía 0.35%</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 136.575</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span class='dato col-md-7 col-sm-7 col-xs-7 total'>Total</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 conNegrilla'>$ 19.189.463</span>"
                + "							</div>"
                + "						</div>"
                + "						<div id='part3_cuadrado3' class='cuadrado'>"
                + "							<span class='dato agrandado escondido uppercase'>3. Transporte Nacional</span><br/><br/>"
                + "							<div class='row'>"
                + "								<span id='transporte' class='dato col-md-7 col-sm-7 col-xs-7'>Transporte nacional</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 9.855.730</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span class='dato col-md-7 col-sm-7 col-xs-7 total'>Total</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 conNegrilla'>$ 9.855.730</span>"
                + "							</div>"
                + "						</div>"
                + "						<div id='part3_cuadrado4' class='cuadrado'>"
                + "							<span class='dato agrandado escondido uppercase'>4. Nacionalización</span><br/><br/>"
                + "							<div class='row'>"
                + "								<span id='outsourcing' class='dato col-md-7 col-sm-7 col-xs-7'>Outsourcing en comercio exterior</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 500.000</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='gastosOperativos' class='dato col-md-7 col-sm-7 col-xs-7'>Gastos operativos</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 110.000</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='declaracion' class='dato col-md-7 col-sm-7 col-xs-7'>Elaboracion de declaracion de impo/valor</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 72.000</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='transmision' class='dato col-md-7 col-sm-7 col-xs-7'>Transmisión siglo XXI - Formularios</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 12.000</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='gastosPortuarios' class='dato col-md-7 col-sm-7 col-xs-7'>Gastos portuarios</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 1.500.000</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='poliza' class='dato col-md-7 col-sm-7 col-xs-7'>Poliza seguro nacional</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 220.500</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span id='decontenerizacion' class='dato col-md-7 col-sm-7 col-xs-7'>Descontenerización</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris'>$ 2.100.000</span>"
                + "							</div>"
                + "							<div class='row'>"
                + "								<span class='dato col-md-7 col-sm-7 col-xs-7 total'>Total</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 conNegrilla'>$ 4.514.500</span>"
                + "							</div>"
                + "						</div>"
                + "						<div id='part3_cuadradoVerde' class='cuadrado'>"
                + "							<div class='row'>"
                + "								<span class='dato col-md-7 col-sm-7 col-xs-7 textoBlanco conNegrilla'>Total liquidación costos de importación</span><span class='dato derecha col-md-5 col-sm-5 col-xs-5 textoGris textoBlanco conNegrilla'>$ 54.471.693</span>"
                + "							</div>"
                + "						</div>";
    }
    $("#zonaCentro").html(contenido);
    invocar_Descripciones();
}

//----------------------------------------------------------------------------------------------------------
//																							LOL
//----------------------------------------------------------------------------------------------------------

//3) Tiene que ver con como se pegaron las descripciones para la pagina 3
var idPaDescripcion = [];
var texto = [];

function invocar_Descripciones()
{
    $.ajax({
        url: "auxiliar/get/descripcionesJSON",
        type: "GET",
        success: function (json)
        {
            var data = json.todas_ids;
            for (var i = 0; i < data.length; i++)
            {
                idPaDescripcion.push(data[i].idDescripcion.replace(/\s/g, ""));
                texto.push(data[i].descripcion);
            }

            document.getElementById("zonaCentro").onmouseleave = function () {
                $("#textoInformacion").html("Situa el puntero encima de cualquier item para ver más información");
            };
            for (var i = 0; i < texto.length; i++)
                pegarDescripcion(i);
        },
        error: function (xhr, errmsg, err)
        {
            $('body').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

function pegarDescripcion(i)
{
    if ($("#" + idPaDescripcion[i]).length > 0)//it exist
    {
        document.getElementById("" + idPaDescripcion[i]).onmouseover = function ()
        {
            $("#textoInformacion").html("" + texto[i]);
            $("#" + idPaDescripcion[i]).css("color", "#999999");
        };
        document.getElementById("" + idPaDescripcion[i]).onmouseleave = function () {
            $("#" + idPaDescripcion[i]).css("color", "black");
        };
    }
}

document.getElementById("valorMercancia").addEventListener("focusout", SoloDejarPositivosDecimal, false);
document.getElementById("prdif").addEventListener("input", SoloDejarPositivos, false);

function SoloDejarPositivos()
{
    // Let's match only digits.
    var num = this.value.match(/^\d+$/);
    if (num === null)
        this.value = "";
    // If we have no match, value will be empty.
}

function SoloDejarPositivosDecimal()
{
    // Let's match only digits.
    var num = this.value.match(/^\d+$/);
    if (num === null)
    {
        num = this.value.match(/^\d+\.\d+$/);
        if (num === null) this.value = "";
    }
    // If we have no match, value will be empty.
}


function mostrarDropdown(idSelect)
{
    console.log(idSelect);
    var dropdown = $("#" + idSelect)[0];
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    dropdown.dispatchEvent(event);
}
