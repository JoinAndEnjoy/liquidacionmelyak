# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_settingsnegocio'),
    ]

    operations = [
        migrations.AddField(
            model_name='settingsnegocio',
            name='blGeneral_FCL',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]
