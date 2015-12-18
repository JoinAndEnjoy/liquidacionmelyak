from django.core.management.base import BaseCommand, CommandError
# -*- encoding: utf-8 -*-
import traceback
import sys,os
from main.models import *
import csv
import sys

#reload(sys)
#sys.setdefaultencoding("utf-8")

class Command(BaseCommand):
	help = 'Sube los otros paises y las ciudades a la base de datos'

	def add_arguments(self, parser):
		print("Lol, no se que poner aqui")

	def handle(self, *args, **options):

		#csv_paises = "/home/caroso1222/webapps/liquidacionmelyak/myproject/main/management/commands/csv-files/pais.csv"
		#csv_ciudades = "/home/caroso1222/webapps/liquidacionmelyak/myproject/main/management/commands/csv-files/ciudad.csv"
		csv_ciudades_paises = "/home/carlos/Desktop/liquidacionmelyak/main/management/commands/csv-files/paises_ciudades.csv"

		print("Comenzando a subir los Paises")
		PaisAlt.objects.all().delete()
		CiudadAlt.objects.all().delete()
		with open(csv_ciudades_paises,'rt') as csv_file:
			data_reader = csv.reader(csv_file.read().splitlines(), delimiter=',')
			i = 0
			pais = None
			ultima_ciudad = None
			for row in data_reader:
				i = i+1
				print i
				try:
					if i>1: # No se mete el primer registro
						if '(PAIS)' in row[0].strip():
							print anterior
							pais = PaisAlt(nombre_pais = anterior)
							pais.save()
							if ultima_ciudad is not None:
								ultima_ciudad.delete()
						elif pais is not None:
							#nombre_ciudad = row[0].decode('utf-8')
							nombre_ciudad = row[0].strip().lower().capitalize()
							ciudad = CiudadAlt(paisAlt = pais, nombre_ciudad = nombre_ciudad)
							ciudad.save()
							ultima_ciudad = ciudad
						anterior = row[0].split('-')[0].strip().lower().capitalize()
				except Exception as err:
					print(i-1)
					print("error")
					print(row[0])
					print(traceback.format_exc())
					break
			print("Subidos los paises")

