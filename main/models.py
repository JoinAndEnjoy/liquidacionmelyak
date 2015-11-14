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

class TarifasFijas(models.Model):
    nombre_tarifa = models.CharField(max_length=200, primary_key=True)
    valor_tarifa = models.DecimalField(max_digits=19, decimal_places=10)
    PORCENTAJE = 'PORC'
    PESO_COLOMBIANO = 'COP'
    EURO = 'EUR'
    DOLAR = 'USD'
    TIPO_TARIFA_CHOICES = (
        (PORCENTAJE, 'Porcentaje'),
        (PESO_COLOMBIANO, 'Pesos'),
        (EURO, 'Euros'),
        (DOLAR, 'Dolares'),
    )
    tipo_tarifa = models.CharField(max_length=5, choices=TIPO_TARIFA_CHOICES, default=PORCENTAJE)

    def __str__(self):              # __unicode__ on Python 2
        return self.nombre_tarifa

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
