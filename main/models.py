from django.db import models

# Create your models here.

class Pais(models.Model):
    cc_fips = models.CharField(max_length=10, primary_key=True)
    cc_iso = models.CharField(max_length=10)
    tld = models.CharField(max_length=10)
    nombre_pais = models.CharField(max_length=200)
    puertos_json = models.TextField()

    def __str__(self):              # __unicode__ on Python 2
        return self.nombre_pais

    def __repr__(self):
        return self.__str__()

class Ciudad(models.Model):
    cc_fips = models.ForeignKey(Pais)
    nombre_ciudad = models.CharField(max_length=200)

    def __str__(self):              # __unicode__ on Python 2
        return self.nombre_ciudad

    def __repr__(self):
        return self.__str__()

class InfoFCL(models.Model):
    puerto_cargue = models.CharField(max_length=90)
    puerto_descargue = models.CharField(max_length=90)
    PESO_COLOMBIANO = 'COP'
    EURO = 'EUR'
    DOLAR = 'USD'
    TIPO_TARIFA_CHOICES = (
        (PESO_COLOMBIANO, 'COP'),
        (EURO, 'EUR'),
        (DOLAR, 'USD'),
    )
    divisa = models.CharField(max_length=5, choices=TIPO_TARIFA_CHOICES, default=PESO_COLOMBIANO)
    FCL_20 = models.FloatField()
    FCL_40 = models.FloatField()
    servicio = models.CharField(max_length=90)
    tiempo_transito = models.FloatField()
    bl = models.FloatField()
    gastos_fob = models.FloatField()
    gastos_naviera = models.FloatField()
    manejo = models.FloatField()
    collect_fee = models.FloatField()
    pais = models.CharField(max_length=90)

    def __str__(self):              # __unicode__ on Python 2
        return self.puerto_cargue+" "+self.puerto_descargue

    def __repr__(self):
        return self.__str__()


class Descripcion(models.Model):
    idDescripcion = models.CharField(max_length=100, primary_key=True)
    descripcion = models.TextField()
    tipoDescripcion = models.IntegerField()

    def __str__(self):              # __unicode__ on Python 2
        return self.idDescripcion

    def __repr__(self):
        return self.__str__()
