# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20151124_1712'),
    ]

    operations = [
        migrations.AlterField(
            model_name='infofcl',
            name='FCL_20',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='FCL_40',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='bl',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='collect_fee',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='gastos_fob',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='gastos_naviera',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='manejo',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='tiempo_transito',
            field=models.FloatField(),
        ),
    ]
