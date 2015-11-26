from django.contrib import admin

from .models import Pais, Ciudad, Descripcion, InfoFCL

# Register your models here.

admin.site.register(Pais)
admin.site.register(Ciudad)
admin.site.register(Descripcion)
admin.site.register(InfoFCL)
