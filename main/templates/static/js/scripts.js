//----------------------------------------------------------------------------------------------------------
//																				PARTE 1: Obligatorios AJAX
//----------------------------------------------------------------------------------------------------------
// This function gets cookie with a given name
function getCookie(name)
{
	var cookieValue = null;
  if(document.cookie && document.cookie != '')
	{
		var cookies=document.cookie.split(';');
    for(var i=0; i<cookies.length; i++)
		{
			var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if(cookie.substring(0, name.length + 1) == (name + '='))
			{
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
var csrftoken = getCookie('csrftoken');

/*The functions below will create a header with csrftoken*/
function csrfSafeMethod(method)
{
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

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
	beforeSend: function(xhr, settings)
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
app.controller('ctrlMelyak', function($scope)
{
	$scope.user={};
	$scope.user.otm=false;
	$scope.user.bl=false;
	//TODO: poner los valores que son.
	$scope.configTipoProducto=[{name:"lol", value:"lolV"},{name:"fu", value:"lol2V"}];
	$scope.user.tipoProducto=$scope.configTipoProducto[0].value;
	//TODO: poner los valores que son.
	$scope.configTipoMoneda=[{name:"USD", value:"USD"},{name:"COP", value:"COP"},{name:"EUR", value:"EUR"},{name:"libra", value:"libra"}];
	$scope.user.tipoMoneda=$scope.configTipoMoneda[0].value;
	//TODO: poner los valores que son.
	$scope.configTipoEnvio=[{name:"Via Maritima", value:"Via Maritima"},{name:"Via Aerea", value:"Via Aerea"}];
	$scope.configTipoEnvio2=[{name:"FCL", value:"FCL"},{name:"opcion2", value:"opcion2"}];
	//$scope.user.tipoEnvio=$scope.configTipoEnvio[0].value;

	//Para pedir los pasises a la base de datos
	$.ajax({
		url : 'auxiliar/get/paisesJSON',
		type : "GET",
		success : function(json)
		{
			var data = json.todos_pais;
			$scope.$apply(function()
			{
				$scope.configPais=data;
				$scope.user.paisDatos = $scope.configPais[32].cc_fips;//.TODO: El numero corresponde a Colombia (50)
				$scope.user.paisProducto=$scope.configPais[0].cc_fips;
			});

			//for(var i=0; i<3; i++) $scope.cambiarCiudades("IO",i); //TODO: Para colombia es CO

			$("#boton1").removeAttr("disabled");
		},
	});

	var contenedores20=0;
	$("#slider20").slider({max: 10, step: 1}).slider("pips", {rest: "label"}).on("slidechange", function( e, ui )
	{
		var hayQueArmar=ui.value-contenedores20;
		if(hayQueArmar>0)
		{
			var aPoner=contenedores20+1;
			for(var i=0; i<hayQueArmar; i++)
			{
				$scope.$apply(function()
				{
					var texto="<p ng-model='user.caja20_"+aPoner+"' id=\"caja20_"+aPoner+"\">"+aPoner+"</p>"
					$("#containers20").append(texto);

					aPoner++;
				});
			}
		}
		else if(hayQueArmar<0)//Cuando tengo que quitar contenedores
		{
			var aQuitar=contenedores20;
			hayQueArmar*=-1;
			for(var i=0; i<hayQueArmar; i++)
			{
				var texto="#caja20_"+aQuitar;
				$(texto).remove();
				aQuitar--;
			}
		}
		contenedores20=ui.value;
	});

	var contenedores40=0;
	$("#slider40").slider({max: 10}).slider("pips", {rest: "label"}).on("slidechange", function( e, ui )
	{
		var hayQueArmar=ui.value-contenedores40;
		if(hayQueArmar>0)
		{
			var aPoner=contenedores40+1;
			for(var i=0; i<hayQueArmar; i++)
			{
				var texto="<p id=\"caja40_"+aPoner+"\">"+aPoner+"</p>"
				$("#containers40").append(texto);
				aPoner++;
			}
		}
		else if(hayQueArmar<0)//Cuando tengo que quitar contenedores
		{
			var aQuitar=contenedores40;
			hayQueArmar*=-1;
			for(var i=0; i<hayQueArmar; i++)
			{
				var texto="#caja40_"+aQuitar;
				$(texto).remove();
				aQuitar--;
			}
		}
		contenedores40=ui.value;
	});

	//Este metodo se llama desde los botones de siguiente y anterior
	$scope.mostrarPag = function(pagina)
	{
		if(pagina==2)
		{
			var pasa=true;
			if(angular.isUndefined($scope.user.nombre) || $scope.user.nombre=="") {pasa=false; $("#avisoNombre").css("display", "block");}
			else $("#avisoNombre").css("display", "none");
			if(angular.isUndefined($scope.user.correo) || $scope.user.correo=="") {pasa=false; $("#avisoCorreo").css("display", "block");}
			else $("#avisoCorreo").css("display", "none");
			if(angular.isUndefined($scope.user.telefono) || $scope.user.telefono=="") {pasa=false; $("#avisoTelefono").css("display", "block");}
			else $("#avisoTelefono").css("display", "none");

			if(pasa)
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
			}
		}
		else if(pagina==3)
		{
			var pasa=true;

			if(pasa)
			{
				$("#Parte2").css("display", "none");
				$("#waitting").css("display", "block");
				$.ajax({
					url : 'auxiliar/post/metodoPrincipal/', // the endpoint
					type : "POST", // http method
					data : { elUsuario : JSON.stringify(angular.toJson($scope.user))},
					// handle a successful response
					success : function(json)
					{
						console.log(json); // log the returned json to the console
            console.log("-----Muy bien-----")

						$("#Parte1").css("display", "none");
						$("#Parte2").css("display", "none");
						$("#Parte3").css("display", "block");
						$("#waitting").css("display", "none");
						//Sobre colorear las bolitas
						$("#bola1").attr("class", "bolitas primera apagada movidas");
						$("#bola2").attr("class", "bolitas segunda apagada movidas");
						$("#bola3").attr("class", "bolitas tercera activa");
						//Sobre los colores de los textos bajo las bolas
						$("#textoB1").css("color", "#909090");
						$("#textoB2").css("color", "#909090");
						$("#textoB3").css("color", "#000000");
					},

					// handle a non-successful response
					error : function(xhr,errmsg,err)
					{
						$('body').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
						" <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
						console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
					}
				});
			}
		}
	};

	$scope.cambiarCiudades = function(cc_fips, target)
	{
		var idDropdown = "#"+dropdownsCiudades[target];
		var idIcono = "#"+iconoCargando[target];

		if(cc_fips == "") $(idDropdown).html("");
		else
		{
			var laUrl="auxiliar/get/JSON_"+cc_fips;
			$.ajax({
				url : laUrl,
				type : "GET",
				success : function(json)
				{
					var data = json.todas_ciudades;
					$scope.$apply(function()
					{
						$scope.configCiudad=data;
						$scope.user.ciudad_datos = $scope.configCiudad[0].nombre_ciudad;//TODO: El numero corresponde a Bogota es (TODO)
					});

					$("#boton1").removeAttr("disabled");
					$(idIcono).attr("src", "");
				},
			});
			$(idIcono).attr("src", "/static/img/loading.gif");
			$("#boton1").attr("disabled", "true");
		}
	};

	$scope.cambiarTipoEnvio = function(tipoEnvio, etapa)
	{
		if(tipoEnvio=="Via Maritima" && etapa==1)
		{
			console.log("mar 1");
			$("#TipoEnvioBarco").css("display", "block");
		}
		else if(tipoEnvio=="Via Maritima" && etapa==2)
		{
			console.log("mar 2");
		}
		else if(tipoEnvio=="Via Aerea")
		{
			console.log("aerea");
			$("#TipoEnvioBarco").css("display", "none");
		}
	};
});

//----------------------------------------------------------------------------------------------------------
//																							LOL
//----------------------------------------------------------------------------------------------------------

//1) Aqui va lo que se necesita para que se desplieguen los dropdowns
var dropdownsPaises = ["paisDatos", "paisOrigen", "paisDestino"];
var dropdownsCiudades = ["ciudad_datos", "ciudad_origen", "ciudad_destino"];
var iconoCargando = ["icono_datos", "icono_origen", "icono_destino"];

//3) Tiene que ver con como
var idPaDescripcion =[];
var texto=[];
window.onload = function()
{
	$.ajax({
		url : "auxiliar/get/descripcionesJSON",
		type : "GET",
		success : function(json)
		{
			console.log("Poblar la base de datos de descripciones");
			var data = json.todas_ids;
			for(var i=0; i<data.length; i++)
			{
				idPaDescripcion.push(data[i].idDescripcion);
				texto.push(data[i].descripcion);
			}

			document.getElementById("zonaCentro").onmouseleave =function(){$("#textoInformacion").html("Situa el puntero encima de cualquier item para ver más información");};
			for(var i=0; i<texto.length; i++) pegarDescripcion(i);
		},

		error : function(xhr,errmsg,err)
		{
			$('body').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
			" <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
			console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
		}
	});
}

function pegarDescripcion(i)
{
	document.getElementById(""+idPaDescripcion[i]).onmouseover = function()
	{
		$("#textoInformacion").html(""+texto[i]);
		$("#"+idPaDescripcion[i]).css("color", "#999999");
	};
	document.getElementById(""+idPaDescripcion[i]).onmouseleave = function(){$("#"+idPaDescripcion[i]).css("color", "black");};
}
