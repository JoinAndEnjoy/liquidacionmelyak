from django.shortcuts import render
from django.http import HttpResponse

from .models import Pais, Ciudad, TarifasFijas, Descripcion

import json
import time
from django.forms.models import model_to_dict
# Create your views here.
def index(request):
    return render(request, 'index.html')

def getPaisesJSON(request):
    response_data = {}
    todos_pais = [model_to_dict(item) for item in Pais.objects.all().order_by('nombre_pais')]
    response_data['todos_pais'] = todos_pais
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def getCiudadesJSON(request, pais_cc_fips):
    response_data = {}
    todas_ciudades = [model_to_dict(item) for item in Ciudad.objects.filter(cc_fips=""+pais_cc_fips).order_by('nombre_ciudad')]
    response_data['todas_ciudades'] = todas_ciudades
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def getTarifasHTTP(request):
    lista_tarifas = TarifasFijas.objects.all().order_by('nombre_tarifa')
    rta=""
    for cadaTarifa in lista_tarifas:
        rta = rta + "<option>"+cadaTarifa.nombre_tarifa+"</option>"
    return HttpResponse(rta)

def getDescripcionesJSON(request):
    response_data = {}
    todas_ids = [model_to_dict(item) for item in Descripcion.objects.order_by('tipoDescripcion', 'idDescripcion')]
    response_data['todas_ids'] = todas_ids
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def metodoPrincipal(request):
    response_data = {}
    if request.is_ajax():
        if request.method == 'POST':
            #Para coger un json de un request post
            str=request.POST['elUsuario'] #envien el json como un texto y el key es "elUsuario"
            str=str.replace("\\", "")[1:-1] #Viene con algo de ruido que hay que limpiar
            d = json.loads(str) #Se carga en esta estructura especial para json y ahora se puede acceder cada parametro
            print d['telefono']
            response_data=d
            time.sleep(5) #TODO quitar
    return HttpResponse(json.dumps(response_data), content_type="application/json")
