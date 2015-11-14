from django.contrib import admin

from .models import Pais, Ciudad, TarifasFijas, Descripcion

# Register your models here.

admin.site.register(Pais)
admin.site.register(Ciudad)
admin.site.register(TarifasFijas)
admin.site.register(Descripcion)
