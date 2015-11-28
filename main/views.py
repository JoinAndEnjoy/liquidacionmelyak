from django.shortcuts import render
from django.http import HttpResponse

from .models import *

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

def getParejasPuertosJSON(request):
    response_data = {}
    infoFCL = [model_to_dict(item) for item in InfoFCL.objects.all().order_by('puerto_cargue')]
    response_data['infoFCL'] = infoFCL;
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
    todas_ids = [model_to_dict(item) for item in Descripcion.objects.order_by('idDescripcion')]
    response_data['todas_ids'] = todas_ids
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def metodoPrincipal(request):
    response_data = {}
    if request.is_ajax():
        if request.method == 'POST':
            #Para coger un json de un request post
            str=request.POST['elUsuario'] #envien el json como un texto y el key es "elUsuario"
            str=str.replace("\\", "")[1:-1] #Viene con algo de ruido que hay que limpiar
            d = json.loads(str) #Se carga en esta estructura especial para json y ahora se puede acceder cada parametro ej: print d['telefono']
            #-------------------------------------------------
            response_data={}
            #PASO 1) Mirar si llegaron todos los parametros necesarios para realizar una cotizacion, en etapa1, los basicos
            infoBuscada=['paisDatos','ciudad_datos','correo','telefono','tipoEnvio','tipoProducto','paisProducto','valorMercancia','tipoMoneda','prdif','otm','bl']
            noEncontradas=[]
            indice=0;
            for info in infoBuscada:
                if info not in d:
                    noEncontradas.append(info)
                indice+=1

            #PASO 2) se mira si falta algo y se informa
            if len(noEncontradas) > 0:
                #Si no ha llegado todo, se devuelve cuales faltan
                #TODO tengo que mirar como informo el error
                return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)
            else:
                #Si todo llego, paso a una segunda etapa de revision
                if d['tipoEnvio']=="Via Maritima":
                    if 'tipoEnvio2' not in d:
                        #TODO tengo que mirar como informo el error
                        return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)
                    else:
                        if d['tipoEnvio2']=="FCL":
                            arreglo20=d['arregloFCL_20']
                            arreglo40=d['arregloFCL_40']
                            infoNecesaria=InfoFCL.objects.get(id = d['idPuertosFCL'])
                            pidioBL=d['bl']
                            esOTM=d['otm']

                            parte4={} #La voy a usar para mandar los costos opcionales
                            if pidioBL:
                                parte4['bl']=infoNecesaria.bl
                            else:
                                parte4['bl']=0
                            response_data['parte4']=parte4

                            parte3={} #La voy a usar para mandar los costos fijos
                            parte3['Gastos fob']=infoNecesaria.gastos_fob
                            parte3['Gastos naviera']=infoNecesaria.gastos_naviera
                            parte3['Manejo']=infoNecesaria.manejo
                            parte3['Collect fee']=infoNecesaria.collect_fee
                            response_data['parte3']=parte3

                            parte2={} #La voy a usar para mandar la informacion del transporte
                            parte2['Servicio']=infoNecesaria.servicio
                            parte2['Tiempo de transito']=infoNecesaria.tiempo_transito
                            response_data['parte2']=parte2

                            parte1={} #La voy a usar para mandar los costos de la carga
                            parte1['Divisa']=infoNecesaria.divisa
                            parte1['Costo Transoprte contenedores 20 ft']=len(arreglo20)*infoNecesaria.FCL_20
                            parte1['Costo Transoprte contenedores 40 ft']=len(arreglo40)*infoNecesaria.FCL_40
                            response_data['parte1']=parte1

                        elif d['tipoEnvio2']=="LCL":
                            print("pidieron LCL")
                elif d['tipoEnvio']=="Via Aerea":
                    print("aereo")
                elif d['tipoEnvio']=="Proyecto Especial":
                    print("especial")
                return HttpResponse(json.dumps(response_data), content_type="application/json")
            #-------------------------------------------------
            print(noEncontradas)
