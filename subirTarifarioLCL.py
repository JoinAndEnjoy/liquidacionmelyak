from django.core.management.base import BaseCommand, CommandError
# -*- encoding: utf-8 -*-
import traceback
import sys,os
from main.models import *
import csv

csv_tarifas = "/home/juan/Documents/GIT/liquidacionmelyak/csv-files/tarifarioLCL.csv"

print("----------------------INIT----------------------")
InfoLCL.objects.all().delete()
print("lol1")

with open(csv_tarifas,'rt') as csv_file:
	print("lol2")
	data_reader = csv.reader(csv_file.read().splitlines(), delimiter=';')
	i = 0
	for row in data_reader:
		i = i+1
		try:
			if i>1: # No se mete el primer registro
				inf = InfoLCL()
                                inf.id = i-1
				inf.pais = row[0].strip()
				inf.puerto_cargue = row[1].strip()
				inf.servicio = row[2].strip()
				inf.puerto_descargue = row[3].strip()
				inf.tarifaTon_m3 = row[4].strip()
				inf.gasolinaBAF = row[5].strip()
				inf.minimo = row[6].strip()
				inf.frecuencia = row[7].strip()
				inf.tiempo_transito = row[8].strip()
				inf.save()
				print(i-1)
		except Exception as err:
			print(i-1)
			print("error")
			print(row[0])
			print(traceback.format_exc())
			break
	print("----------------------STOP----------------------")

print("Sale")
