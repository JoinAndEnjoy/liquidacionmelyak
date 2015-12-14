from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.configuracion, name ="configuracion"),
    url(r'^editFCL/', views.editFCL, name ="editFCL"),
    url(r'^editLCL/', views.editLCL, name ="editLCL"),
    url(r'^editSettings/', views.editSettings, name ="editSettings"),

]
