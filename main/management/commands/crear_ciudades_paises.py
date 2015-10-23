from django.core.management.base import BaseCommand, CommandError
# -*- encoding: utf-8 -*-
import traceback
import sys,os
from main.models import *
import csv

class Command(BaseCommand):
	help = 'Sube los paises y las ciudades a la base de datos'

	def add_arguments(self, parser):
		print("Lol, no se que poner aqui")

	def handle(self, *args, **options):

		csv_paises = "/home/caroso1222/webapps/liquidacionmelyak/myproject/main/management/commands/csv-files/pais.csv"
		csv_ciudades = "/home/caroso1222/webapps/liquidacionmelyak/myproject/main/management/commands/csv-files/ciudad.csv"

		print("Comenzando a subir los Paises")
		Pais.objects.all().delete()
		with open(csv_paises,'rt') as csv_file:
			data_reader = csv.reader(csv_file.read().splitlines(), delimiter=';')
			i = 0
			for row in data_reader:
				i = i+1
				try:
					if row[0]!='cc_fips': # No se mete el primer registro
						pais = Pais()
						pais.cc_fips = row[0].strip()
						pais.cc_iso = row[1].strip()
						pais.tld = row[2].strip()
						pais.nombre_pais = row[3].strip()
						pais.save()
				except Exception as err:
					print(i)
					print("error")
					print(row[0])
					print(traceback.format_exc())
					break
			print("Subidos los paises")

		print("----------------------Comenzando a subir las ciudades---------------")
		Ciudad.objects.all().delete() # Se borran todos los registros de la tabla
		with open(csv_ciudades,'rt') as csv_file:
			data_reader = csv.reader(csv_file.read().splitlines(), delimiter=';')
			i = 0
			for row in data_reader:
				print(i)
				i = i+1
				try:
					if row[0]!='cc_fips': # No se mete el primer registro
						ciudad = Ciudad()
						ciudad.cc_fips_id = row[0].strip()
						ciudad.nombre_ciudad = row[1].strip()
						ciudad.save()
				except Exception as err:
					print(i)
					print("error")
					print(row[1])
					print(traceback.format_exc())
			print("Subidas las ciudades")
