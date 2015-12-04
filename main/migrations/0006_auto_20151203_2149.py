# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_remove_descripcion_tipodescripcion'),
    ]

    operations = [
        migrations.CreateModel(
            name='InfoLCL',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('pais', models.CharField(max_length=90)),
                ('puerto_cargue', models.CharField(max_length=90)),
                ('puerto_descargue', models.CharField(max_length=90)),
                ('tarifaTon_m3', models.FloatField()),
                ('servicio', models.CharField(max_length=90)),
                ('gasolinaBAF', models.FloatField()),
                ('minimo', models.FloatField()),
                ('frecuencia', models.CharField(max_length=90)),
                ('tiempo_transito', models.FloatField()),
            ],
        ),
        migrations.RemoveField(
            model_name='infofcl',
            name='bl',
        ),
    ]
