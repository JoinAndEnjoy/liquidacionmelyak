# -*- encoding: utf-8 -*-
import traceback
import sys,os
import csv

csv_tarifas = "csv-files/Table081.csv"

print("----------------------INIT----------------------")
print("lol1")

with open(csv_tarifas,'rt') as csv_file:
	print("lol2")
	data_reader = csv.reader(csv_file.read().splitlines(), delimiter=',')
	i = 0
	anterior = ""
	paisActual = ""
	for row in data_reader:
		i = i+1
		try:
			if i>1: # No se mete el primer registro
				if '(PAIS)' in row[0].strip():
					print anterior
					pais = anterior
				anterior = row[0]
		except Exception as err:
			print(i-1)
			print("error")
			print(row[0])
			print(traceback.format_exc())
			break
	print("----------------------STOP----------------------")

print("Sale")
