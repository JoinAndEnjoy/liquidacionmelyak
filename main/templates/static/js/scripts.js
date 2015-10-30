var dropdownsCiudades = ["ciudad_datos", "ciudad_origen", "ciudad_destino"];
var iconoCargando = ["icono_datos", "icono_origen", "icono_destino"];

window.onload = function()
{
	mostrarPag(1);
	for(var i=0; i<dropdownsCiudades.length; i++) cambiarCiudades("IO", i);
}

//Este metodo se llama desde los botones de siguiente y anterior
function mostrarPag(pagina)
{
	if(pagina==1)
	{
		//Sobre aparecer las diferentes partes del formulario
		$("#Parte1").css("display", "block");
		$("#Parte2").css("display", "none");
		$("#Parte3").css("display", "none");
		//Sobre colorear las bolitas
		$("#bola1").attr("class", "bolitas primera activa movidas");
		$("#bola2").attr("class", "bolitas segunda apagada movidas");
		$("#bola3").attr("class", "bolitas tercera apagada");
		//Sobre los colores de los textos bajo las bolas
		$("#textoB1").css("color", "#000000");
		$("#textoB2").css("color", "#909090");
		$("#textoB3").css("color", "#909090");
	}
	else if(pagina==2)
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
	else if(pagina==3)
	{
		//Sobre aparecer las diferentes partes del formulario
		$("#Parte1").css("display", "none");
		$("#Parte2").css("display", "none");
		$("#Parte3").css("display", "block");
		//Sobre colorear las bolitas
		$("#bola1").attr("class", "bolitas primera apagada movidas");
		$("#bola2").attr("class", "bolitas segunda apagada movidas");
		$("#bola3").attr("class", "bolitas tercera activa");
		//Sobre los colores de los textos bajo las bolas
		$("#textoB1").css("color", "#909090");
		$("#textoB2").css("color", "#909090");
		$("#textoB3").css("color", "#000000");
	}
}

//Aqui se esta usando ajax de una forma sencilla, como se explica en w3school
function cambiarCiudades(cc_fips, target)
{
	var idDropdown = "#"+dropdownsCiudades[target];
	var idIcono = "#"+iconoCargando[target];

	if(cc_fips == "")
	{
		$(idDropdown).html("");
		return;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if(xhttp.readyState==4 && xhttp.status==200)
		{
			$(idDropdown).html(xhttp.responseText);
			$(idIcono).attr("src", "");
		}
	}
	xhttp.open("GET", "auxiliar/get/"+cc_fips, true);
	$(idIcono).attr("src", "/static/img/loading.gif");
	xhttp.send();
}

//Cosas relacionadas con Angular
var app = angular.module('appMelyak', []);
app.controller('ctrlMelyak', function($scope){
	$scope.update = function(user) {
		$scope.master = angular.copy(user);
	};

	$scope.reset = function() {
		$scope.user = angular.copy($scope.master);
	};

	$scope.reset();
});
