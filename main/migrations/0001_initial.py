# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ciudad',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre_ciudad', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Descripcion',
            fields=[
                ('idDescripcion', models.CharField(max_length=100, serialize=False, primary_key=True)),
                ('descripcion', models.TextField()),
                ('tipoDescripcion', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Pais',
            fields=[
                ('cc_fips', models.CharField(max_length=10, serialize=False, primary_key=True)),
                ('cc_iso', models.CharField(max_length=10)),
                ('tld', models.CharField(max_length=10)),
                ('nombre_pais', models.CharField(max_length=200)),
                ('puertos_json', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='TarifasFijas',
            fields=[
                ('nombre_tarifa', models.CharField(max_length=200, serialize=False, primary_key=True)),
                ('valor_tarifa', models.DecimalField(max_digits=19, decimal_places=10)),
                ('tipo_tarifa', models.CharField(default=b'PORC', max_length=5, choices=[(b'PORC', b'Porcentaje'), (b'COP', b'Pesos'), (b'EUR', b'Euros'), (b'USD', b'Dolares')])),
            ],
        ),
        migrations.AddField(
            model_name='ciudad',
            name='cc_fips',
            field=models.ForeignKey(to='main.Pais'),
        ),
    ]
