from django.core.management.base import BaseCommand, CommandError
# -*- encoding: utf-8 -*-
import traceback
import sys,os
from main.models import *
import csv

csv_tarifas = "/home/juan/Documents/GIT/liquidacionmelyak/csv-files/tarifario.csv"

print("----------------------INIT----------------------")
InfoFCL.objects.all().delete()
print("lol1")

with open(csv_tarifas,'rt') as csv_file:
	print("lol2")
	data_reader = csv.reader(csv_file.read().splitlines(), delimiter=';')
	i = 0
	for row in data_reader:
		i = i+1
		try:
			if i>1: # No se mete el primer registro
				inf = InfoFCL()
				inf.puerto_cargue = row[0].strip()
				inf.puerto_descargue = row[1].strip()
				inf.divisa = row[2].strip()
				inf.FCL_20 = row[3].strip()
				inf.FCL_40 = row[4].strip()
				inf.servicio = row[5].strip()
				inf.tiempo_transito = row[6].strip()
				inf.bl = row[7].strip()
				inf.gastos_fob = row[8].strip()
				inf.gastos_naviera = row[9].strip()
				inf.manejo = row[10].strip()
				inf.collect_fee = row[11].strip()
				inf.pais = row[12].strip()
				inf.save()
				print(i)
		except Exception as err:
			print(i)
			print("error")
			print(row[0])
			print(traceback.format_exc())
			break
	print("----------------------STOP----------------------")

print("Sale")
