#TODO: importante, se consume este servicio: http://fixer.io/ para pasar de EUR a USD

from django.shortcuts import render, redirect
from django.http import HttpResponse
#from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives

from main.forms import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as auth_login

from .models import *

import json
import requests

from django.forms.models import model_to_dict

from django.contrib.auth.decorators import login_required

# Create your views here.
def index(request):
    return render(request, 'index.html')

def login(request):
    formularioLogin = LoginForm(request.POST or None)
    
    if request.method == 'POST':
	formulario = formularioLogin
	if formulario.is_valid():
            usern = formulario.cleaned_data['user']
            print(usern)
            password = formulario.cleaned_data['password']
            print(password)
            user = authenticate(username = usern, password = password)
            if user is not None:
                if user.is_active:
                    print("Usuario valido, activo y autenticado")
                    auth_login(request,user)
                    return redirect('configuracion')
                else:
                    print("Usuario valido pero la cuenta ha sido deshabilitada")
            else:
                print("Usuario y contrasena incorrectas")
                mensaje = "login-fail"
                context = {"mensaje":mensaje,"formularioLogin": formularioLogin}
		return render(request,'login.html', context)
    
    context = {"formularioLogin": formularioLogin}
    if not request.user.is_authenticated():    
        return render(request,"login.html", context)
    else:
        return redirect('configuracion')

@login_required(login_url='/main/login/')
def configuracion(request):
    infoFCL_all = InfoFCL.objects.all()
    context = {"infoFCL":infoFCL_all }
    return render(request, "configuracion2.html", context)

def editFCL(request):
    print "llego"
    if request.method == 'POST':
        respose_data = {}
        response_data['respuesta'] = "SUCCESS"
        print request
        return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
            )

def logout_view(request):
    logout(request)
    return redirect('login')

def getPaisesJSON(request):
    response_data = {}
    todos_pais = [model_to_dict(item) for item in Pais.objects.all().order_by('nombre_pais')]
    response_data['todos_pais'] = todos_pais
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def getParejasPuertosJSON_FCL(request):
    response_data = {}
    infoFCL = [model_to_dict(item) for item in InfoFCL.objects.all().order_by('puerto_cargue')]
    response_data['infoFCL'] = infoFCL;
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def getParejasPuertosJSON_LCL(request):
    response_data = {}
    infoLCL = [model_to_dict(item) for item in InfoLCL.objects.all().order_by('puerto_cargue')]
    response_data['infoLCL'] = infoLCL;
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
    if request.is_ajax():
        if request.method == 'POST':
            #Para coger un json de un request post
            str=request.POST['elUsuario'] #envien el json como un texto y el key es "elUsuario"
            str=str.replace("\\", "")[1:-1] #Viene con algo de ruido que hay que limpiar
            d = json.loads(str) #Se carga en esta estructura especial para json y ahora se puede acceder cada parametro ej: print d['telefono']
            #-------------------------------------------------
            response_data={}
            #PASO 1) Mirar si llegaron todos los parametros necesarios para realizar una cotizacion, en etapa1, los basicos
            infoBuscada=['paisDatos','ciudad_datos','correo','telefono','tipoEnvio','tipoProducto','paisProducto','valorMercancia','tipoMoneda','prdif','otm']
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
                        #Si esto fallo el usuario intervino mi javascript asi que se le muestra un error no especificado
                        #TODO inventar un error no especificado
                        return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)
                    else:
                        if d['tipoEnvio2']=="FCL":
                            arreglo20=d['arregloFCL_20']
                            arreglo40=d['arregloFCL_40']
                            infoNecesaria=InfoFCL.objects.get(id = d['idPuertosFCL'])
                            negocio=SettingsNegocio.objects.all()[0]
                            esOTM=d['otm']
                            flete=0

                            parte1={} #La voy a usar para mandar la informacion del transporte
                            string=""
                            string+=infoNecesaria.puerto_cargue
                            string+=" - "
                            string+=infoNecesaria.pais
                            parte1['Origen']=string
                            parte1['Destino']=infoNecesaria.puerto_descargue
                            parte1['Servicio']=infoNecesaria.servicio
                            parte1['Tiempo de transito']=infoNecesaria.tiempo_transito
                            response_data['parte1']=parte1

                            parte2={} #La voy a usar para mandar los costos de la carga
                            parte2['Divisa']=infoNecesaria.divisa

                            multiplicador=1;
                            if infoNecesaria.divisa=="EUR":
                                resp = requests.get("http://api.fixer.io/latest?symbols=USD")
                                tazaCambioEUR_USD=json.loads(resp.text)['rates']['USD']
                                multiplicador=tazaCambioEUR_USD;
                            elif infoNecesaria.divisa=="USD":
                                multiplicador=1;

                            parte2['Costo Transoprte contenedores 20 ft']=(len(arreglo20)*infoNecesaria.FCL_20*multiplicador)
                            parte2['Costo Transoprte contenedores 40 ft']=(len(arreglo40)*infoNecesaria.FCL_40*multiplicador)
                            parte2['bl']=negocio.blGeneral_FCL
                            response_data['parte2']=parte2
                            
                            parte3={} #La voy a usar para mandar los costos fijos
                            parte3['Gastos fob']=infoNecesaria.gastos_fob
                            parte3['Gastos naviera']=infoNecesaria.gastos_naviera
                            parte3['Manejo']=infoNecesaria.manejo
                            parte3['Collect fee']=infoNecesaria.collect_fee
                            response_data['parte3']=parte3
                            
                            parte4={} #La voy a usar para mandar los costos opcionales
                            #TODO:
                            response_data['parte4']=parte4

                        elif d['tipoEnvio2']=="LCL":
                            infoNecesaria=InfoLCL.objects.get(id = d['idPuertosLCL'])
                            negocio=SettingsNegocio.objects.all()[0]
                            esOTM=d['otm']
                            flete=0

                            parte1={} #La voy a usar para mandar la informacion del transporte
                            string=""
                            string+=infoNecesaria.puerto_cargue
                            string+=" - "
                            string+=infoNecesaria.pais
                            parte1['Origen']=string
                            parte1['Destino']=infoNecesaria.puerto_descargue
                            parte1['Servicio']=infoNecesaria.servicio
                            parte1['Tiempo de transito']=infoNecesaria.tiempo_transito
                            parte1['Frecuencia']=infoNecesaria.frecuencia
                            response_data['parte1']=parte1
                            
                            parte2={} #La voy a usar para mandar los costos de la carga
                            volumenCarga=d['anchoLCL']*d['altoLCL']*d['largoLCL']
                            pesoCarga=d['pesoLCL']
                            parte2['Costo Transporte']=max(volumenCarga, pesoCarga)*infoNecesaria.tarifaTon_m3
                            parte2['Costo gasolina']=max(volumenCarga, pesoCarga)*infoNecesaria.gasolinaBAF
                            parte2['Desconsolidacion de la carga']=max(volumenCarga, pesoCarga)*negocio.desconsolidacion
                            parte2['Uso de las instalaciones portuarias']=max(volumenCarga, pesoCarga)*negocio.usoDePuerto
                            parte2['Collect Fee']=0 #TODO: preguntar esta regla de nuevo(recordar que es un porcentaje)
                            response_data['parte2']=parte2
                            
                            parte3={} #La voy a usar para mandar los costos fijos
                            parte3['BL']=negocio.blGeneral_LCL
                            parte3['Radicacion']=negocio.radicacion
                            parte3['Manejo Logistico']=negocio.manejoLogistico
                            parte3['Emision HBL en destino']=negocio.emisionHBL
                            response_data['parte3']=parte3
                            
                            parte4={} #La voy a usar para mandar los costos opcionales
                            if d['seguro']:
                                parte4['Seguro']=max(90, negocio.polizaDeSeguro*d['valorMercancia']/100.0)
                            else:
                                parte4['Seguro']=0
                            response_data['parte4']=parte4

                elif d['tipoEnvio']=="Via Aerea":
                    print("aereo")
                elif d['tipoEnvio']=="Proyecto Especial":
                    print("especial")
                return HttpResponse(json.dumps(response_data), content_type="application/json")
            #-------------------------------------------------
            print(noEncontradas)

def hacerCotizacion(request):
    if request.is_ajax():
        if request.method == 'POST':
            #Para coger un json de un request post
            str=request.POST['cotizacion'] #envien el json como un texto y el key es "elUsuario"
            str=str.replace("\\", "")[1:-1] #Viene con algo de ruido que hay que limpiar
            d = json.loads(str) #Se carga en esta estructura especial para json y ahora se puede acceder cada parametro ej: print d['telefono']
            #-------------------------------------------------
            elCorreo=d['correo']
            print(elCorreo)
            contenido=d['contenido']
            #TODO : las pruebas son con mi correo pero debo ponder uno valido
            subject = 'Tu cotizacion'
            from_email = 'noreply@melyakinternational.com'
            text_content = 'Te enviamos tu aproximacion presupuestal'
            html_content = armarMail(contenido)
            msg = EmailMultiAlternatives(subject, text_content, from_email, [elCorreo, 'jmanuel816@gmail.com'])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            response_data=d
            return HttpResponse(json.dumps(response_data), content_type="application/json")

def armarMail(contenido):
    rta="<head><meta charset='utf-8'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'/><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'/><style>"
    rta+=".cuadrado{background-color: #F8F8F8; border-style: solid; border-color: #cfcfcf; border-width: 1px; border-radius: 3px; padding-left: 50px; padding-right: 50px; padding-bottom: 50px; padding-top: 35px;} .dato{color: #000000; font-size: 16px; font-weight: 400;} .escondido{color: #999999; font-size: 14px;font-weight: 500;} .agrandado {font-size: 14px; color: #222222;} .derecha { direction: rtl;} .distanciado {margin-bottom: 10px;} .textoGris {color: #999999;} .conNegrilla {font-weight: 900;} .cuadrado#part3_cuadrado1 {padding-top: 16px;padding-bottom: 22px;} .cuadrado#part3_cuadrado2 {padding-top: 16px;padding-bottom: 22px;position: relative; bottom: 2px;} .cuadrado#part3_cuadrado3 {padding-top: 16px;padding-bottom: 22px;position: relative; bottom: 4px;} .cuadrado#part3_cuadrado4 {padding-top: 16px;padding-bottom: 22px;position: relative; bottom: 6px;} .cuadrado#part3_cuadradoVerde {padding-top: 16px;padding-bottom: 22px;position: relative; bottom: 8px; background-color: #52B259}"
    rta+="</style></head><body>"
    rta+=contenido
    rta+="</body>"
    return rta