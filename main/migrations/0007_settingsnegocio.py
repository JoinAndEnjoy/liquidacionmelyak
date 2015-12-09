# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_auto_20151203_2149'),
    ]

    operations = [
        migrations.CreateModel(
            name='SettingsNegocio',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('blGeneral_LCL', models.FloatField()),
                ('desconsolidacion', models.FloatField()),
                ('usoDePuerto', models.FloatField()),
                ('radicacion', models.FloatField()),
                ('collectFee', models.FloatField()),
                ('emisionHBL', models.FloatField()),
                ('manejoLogistico', models.FloatField()),
                ('polizaDeSeguro', models.FloatField()),
            ],
        ),
    ]
