from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^auxiliar/get/paisesJSON', views.getPaisesJSON, name='getPaisesJSON'),
    url(r'^auxiliar/get/JSON_(?P<pais_cc_fips>[^\.]+)', views.getCiudadesJSON, name='getCiudadesJSON'),
    url(r'^auxiliar/get/tarifas_HTTP', views.getTarifasHTTP, name='getTarifasHTTP'),
    url(r'^auxiliar/get/descripcionesJSON', views.getDescripcionesJSON, name='getDescripcionesJSON'),
    url(r'^auxiliar/post/metodoPrincipal', views.metodoPrincipal, name='metodoPrincipal'),
    #url(r'^auxiliar/get/JSON', views.getPaisesJSON, name='getPaisesJSON'),
]
