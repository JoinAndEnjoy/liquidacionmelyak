from django.contrib import admin

from .models import *

# Register your models here.

admin.site.register(Pais)
admin.site.register(Ciudad)
admin.site.register(Descripcion)
admin.site.register(InfoFCL)
admin.site.register(InfoLCL)
"""
No debe ser posible agregar mas registros a la tabla. Deje esto comentado por favor
#admin.site.register(SettingsNegocio)
"""