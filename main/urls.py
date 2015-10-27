from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^auxiliar/get/(?P<pais_cc_fips>[^\.]+)', views.getCiudades, name='getCiudades'),
]