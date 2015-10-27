window.onload= function()
{
	//console.log("HOLA :D");
	cambiarCiudades("CO");
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
