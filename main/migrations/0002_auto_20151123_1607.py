# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='InfoFCL',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('puerto_cargue', models.CharField(max_length=90)),
                ('puerto_descargue', models.CharField(max_length=90)),
                ('divisa', models.CharField(default=b'COP', max_length=5, choices=[(b'COP', b'Pesos'), (b'EUR', b'Euros'), (b'USD', b'Dolares')])),
                ('FCL_20', models.DecimalField(max_digits=19, decimal_places=10)),
                ('FCL_40', models.DecimalField(max_digits=19, decimal_places=10)),
                ('servicio', models.CharField(max_length=90)),
                ('tiempo_transito', models.DecimalField(max_digits=19, decimal_places=10)),
                ('bl', models.DecimalField(max_digits=19, decimal_places=10)),
                ('gastos_fob', models.DecimalField(max_digits=19, decimal_places=10)),
                ('gastos_naviera', models.DecimalField(max_digits=19, decimal_places=10)),
                ('manejo', models.DecimalField(max_digits=19, decimal_places=10)),
                ('collect_fee', models.DecimalField(max_digits=19, decimal_places=10)),
                ('pais', models.CharField(max_length=90)),
            ],
        ),
        migrations.DeleteModel(
            name='TarifasFijas',
        ),
    ]
