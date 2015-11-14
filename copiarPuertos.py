from django.core.management.base import BaseCommand, CommandError
# -*- encoding: utf-8 -*-
import traceback
import sys,os
from main.models import *
import csv
import requests

csv_paises = "/home/juan/Documents/GIT/liquidacionmelyak/csv-files/pais.csv"

print("----------------------INIT----------------------")
Pais.objects.all().delete()
print("lol1")

with open(csv_paises,'rt') as csv_file:
	print("lol2")
	data_reader = csv.reader(csv_file.read().splitlines(), delimiter=';')
	i = 0
	for row in data_reader:
		i = i+1
		try:
			if i>1: # No se mete el primer registro
				pais = Pais()
				pais.cc_fips = row[0].strip()
				pais.cc_iso = row[1].strip()
				pais.tld = row[2].strip()
				pais.nombre_pais = row[3].strip()
				str="http://www.icontainers.com/api?callback=jQuery110104115063361823559_1447292910843&method=arrivalPortForPopup&impexp=E&countryID="+pais.cc_fips+"&language=EN&rateType=FLLCL&_=1447292910846"
				r = requests.get(str)
				pais.puertos_json = r.text[42:-4]
				pais.save()
				print(i+": "+pais.cc_fips)
		except Exception as err:
			print(i)
			print("error")
			print(row[0])
			print(traceback.format_exc())
			break
	print("----------------------STOP----------------------")

print("Sale")
