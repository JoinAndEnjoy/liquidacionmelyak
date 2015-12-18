# -*- encoding: utf-8 -*-

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

class PaisAltAdmin(admin.ModelAdmin):
	list_display = ['nombre_pais']

	class Meta:
		model = PaisAlt
		ordering = ('-nombre_pais',)

class CiudadAltAdmin(admin.ModelAdmin):
	list_display = ['nombre_ciudad']

	class Meta:
		model = CiudadAlt
		ordering = ('-nombre_ciudad',)

admin.site.register(Pais)
admin.site.register(Ciudad)
admin.site.register(PaisAlt, PaisAltAdmin)
admin.site.register(CiudadAlt, CiudadAltAdmin)
admin.site.register(InfoAereo)
admin.site.register(Descripcion)
admin.site.register(InfoFCL, InfoFCLAdmin)
admin.site.register(InfoLCL)
admin.site.register(SettingsNegocio, SettingsNegocioAdmin)
"""
No debe ser posible agregar mas registros a la tabla. Deje esto comentado por favor
#admin.site.register(SettingsNegocio)
"""