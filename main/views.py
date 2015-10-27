from django.shortcuts import render
from django.http import HttpResponse

from .models import Pais, Ciudad

# Create your views here.
def index(request):
    lista_paises = Pais.objects.all().order_by('nombre_pais')
    context = {'lista_paises': lista_paises}
    return render(request, 'index.html', context)

def getCiudades(request, pais_cc_fips):
    lista_ciudades = Ciudad.objects.filter(cc_fips=""+pais_cc_fips).order_by('nombre_ciudad')
    rta=""
    for cadaCiudad in lista_ciudades:
    	if pais_cc_fips=="CO" and cadaCiudad.nombre_ciudad=="Bogota":
    		rta = rta + "<option selected=\"selected\">"+cadaCiudad.nombre_ciudad+"</option>"
    	else:
    		rta = rta + "<option>"+cadaCiudad.nombre_ciudad+"</option>"
    return HttpResponse(rta)