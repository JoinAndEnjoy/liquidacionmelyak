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

"""
La que sigue va a ser una tabla de solo una fila, su funcion es guardar variables globales
Existen otra forma de implementar lo mismo como una tabla llave valor, pero me tramo mas esta
http://programmers.stackexchange.com/questions/163606/configuration-data-single-row-table-vs-name-value-pair-table

"""
class SettingsNegocio(models.Model):
    blGeneral_LCL = models.FloatField()
    blGeneral_FCL = models.FloatField()
    desconsolidacion = models.FloatField()
    usoDePuerto = models.FloatField()
    radicacion = models.FloatField()
    collectFee = models.FloatField()
    emisionHBL = models.FloatField()
    manejoLogistico = models.FloatField()
    polizaDeSeguro = models.FloatField()
    
    def __str__(self):              # __unicode__ on Python 2
        return "Objeto Creado %.2f" % self.blGeneral_FCL

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
    gastos_fob = models.FloatField()
    gastos_naviera = models.FloatField()
    manejo = models.FloatField()
    collect_fee = models.FloatField()
    pais = models.CharField(max_length=90)

    def __str__(self):              # __unicode__ on Python 2
        return self.puerto_cargue+" "+self.puerto_descargue

    def __repr__(self):
        return self.__str__()

class InfoLCL(models.Model):
    pais = models.CharField(max_length=90)
    puerto_cargue = models.CharField(max_length=90)
    servicio = models.CharField(max_length=90)
    puerto_descargue = models.CharField(max_length=90)
    tarifaTon_m3 = models.FloatField()
    gasolinaBAF = models.FloatField()
    minimo = models.FloatField()
    frecuencia = models.CharField(max_length=90)
    tiempo_transito = models.FloatField()

    def __str__(self):              # __unicode__ on Python 2
        return self.puerto_cargue+" "+self.puerto_descargue

    def __repr__(self):
        return self.__str__()

class Descripcion(models.Model):
    idDescripcion = models.CharField(max_length=100, primary_key=True)
    descripcion = models.TextField()

    def __str__(self):              # __unicode__ on Python 2
        return self.idDescripcion

    def __repr__(self):
        return self.__str__()