window.onload= function(){cambiarCiudades("CO");}

function mostrarPag(pagina)
{
	if(pagina==1)
	{
		document.getElementById("bola1").setAttribute("class", "bolitas primera activa movidas");
		document.getElementById("bola2").setAttribute("class", "bolitas segunda apagada movidas");
		document.getElementById("bola3").setAttribute("class", "bolitas tercera apagada");
	}
	else if(pagina==2)
	{
		document.getElementById("bola1").setAttribute("class", "bolitas primera apagada movidas");
		document.getElementById("bola2").setAttribute("class", "bolitas segunda activa movidas");
		document.getElementById("bola3").setAttribute("class", "bolitas tercera apagada");
	}
	else if(pagina==3)
	{
		$("#Parte2").css("display", "none");
		document.getElementById("bola1").setAttribute("class", "bolitas primera apagada movidas");
		document.getElementById("bola2").setAttribute("class", "bolitas segunda apagada movidas");
		document.getElementById("bola3").setAttribute("class", "bolitas tercera activa");
	}
}

//Aqui se esta usando ajax de una forma mas sencilla pero que 
function cambiarCiudades(cc_fips)
{
	var xhttp;    
	if(cc_fips == "")
	{
		document.getElementById("ciudades").innerHTML = "";
		return;
	}
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if (xhttp.readyState == 4 && xhttp.status == 200)
		{
			document.getElementById("ciudades").innerHTML = xhttp.responseText;
			document.getElementById("dePrueba").setAttribute("src", "");
		}
	}
	xhttp.open("GET", "auxiliar/get/"+cc_fips, true);
	xhttp.send();
	document.getElementById("dePrueba").setAttribute("src", "http://www.geeksphone.com/wp-content/themes/gp/img/loading.gif");
}
