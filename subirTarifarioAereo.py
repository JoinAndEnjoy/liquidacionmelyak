from django.core.management.base import BaseCommand, CommandError
# -*- encoding: utf-8 -*-
import traceback
import sys,os
from main.models import *
import csv

csv_tarifas = "/home/juan/Documents/GIT/liquidacionmelyak/csv-files/tarifarioAereo.csv"

print("----------------------INIT----------------------")
InfoAereo.objects.all().delete()
print("lol1")

with open(csv_tarifas,'rt') as csv_file:
	print("lol2")
	data_reader = csv.reader(csv_file.read().splitlines(), delimiter=';')
	i = 0
	for row in data_reader:
		i = i+1
		try:
			if i>1: # No se mete el primer registro
				inf = InfoAereo()
                                inf.id = i-1
				inf.destino = row[0].strip()
				inf.flete_minimo = row[1].strip()
				inf.flete_menos100 = row[2].strip()
				inf.flete_mas100 = row[3].strip()
				inf.flete_mas300 = row[4].strip()
				inf.flete_mas500 = row[5].strip()
				inf.gasolina_minimo = row[6].strip()
				inf.gasolina_tarigaKg = row[7].strip()
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
