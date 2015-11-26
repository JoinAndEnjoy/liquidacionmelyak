# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20151123_1607'),
    ]

    operations = [
        migrations.AlterField(
            model_name='infofcl',
            name='FCL_20',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='FCL_40',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='bl',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='collect_fee',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='divisa',
            field=models.CharField(default=b'COP', max_length=5, choices=[(b'COP', b'COP'), (b'EUR', b'EUR'), (b'USD', b'USD')]),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='gastos_fob',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='gastos_naviera',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='manejo',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='infofcl',
            name='tiempo_transito',
            field=models.IntegerField(),
        ),
    ]
