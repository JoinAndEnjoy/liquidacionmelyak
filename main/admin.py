from django.contrib import admin

from .models import *

# Register your models here.

class InfoFCLAdmin(admin.ModelAdmin):
	list_display = ['id','puerto_cargue','puerto_descargue']

	class Meta:
		model = InfoFCL

class SettingsNegocioAdmin(admin.ModelAdmin):
	list_display = ['id','blGeneral_LCL','collectFee']

	class Meta:
		model = SettingsNegocio

admin.site.register(Pais)
admin.site.register(Ciudad)
admin.site.register(Descripcion)
admin.site.register(InfoFCL, InfoFCLAdmin)
admin.site.register(InfoLCL)
admin.site.register(SettingsNegocio, SettingsNegocioAdmin)
"""
No debe ser posible agregar mas registros a la tabla. Deje esto comentado por favor
#admin.site.register(SettingsNegocio)
"""