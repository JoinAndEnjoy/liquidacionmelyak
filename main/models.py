from django.db import models

# Create your models here.

class Pais(models.Model):
    cc_fips = models.CharField(max_length=10, primary_key=True)
    cc_iso = models.CharField(max_length=10)
    tld = models.CharField(max_length=10)
    nombre_pais = models.CharField(max_length=200)

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