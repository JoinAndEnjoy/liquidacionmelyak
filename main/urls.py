# -*- encoding: utf-8 -*-

from django.conf.urls import include,url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login', views.login, name ="login"),
    url(r'^configuracion/',include('main.urls_admin')),
    url(r'^logout$', views.logout_view, name ="logout_view"),
    url(r'^auxiliar/get/paisesJSON', views.getPaisesJSON, name='getPaisesJSON'),
    url(r'^auxiliar/get/paisesAltJSON', views.getPaisesAltJSON, name='getPaisesAltJSON'),
    url(r'^auxiliar/get/JSON_(?P<pais_cc_fips>[^\.]+)', views.getCiudadesJSON, name='getCiudadesJSON'),
    url(r'^auxiliar/get/JSONAlt_(?P<nombre_pais>[^\.]+)', views.getCiudadesAltJSON, name='getCiudadesAltJSON'),
    url(r'^auxiliar/get/tarifas_HTTP', views.getTarifasHTTP, name='getTarifasHTTP'),
    url(r'^auxiliar/get/descripcionesJSON', views.getDescripcionesJSON, name='getDescripcionesJSON'),
    url(r'^auxiliar/post/metodoPrincipal', views.metodoPrincipal, name='metodoPrincipal'),
    url(r'^auxiliar/post/hacerCotizacion', views.hacerCotizacion, name='hacerCotizacion'),
    url(r'^auxiliar/get/getParejasPuertosJSON_FCL', views.getParejasPuertosJSON_FCL, name='getParejasPuertosJSON_FCL'),
    url(r'^auxiliar/get/getParejasPuertosJSON_LCL', views.getParejasPuertosJSON_LCL, name='getParejasPuertosJSON_LCL'),
    url(r'^auxiliar/testDev$', views.testDev, name ="testDev"),
]
