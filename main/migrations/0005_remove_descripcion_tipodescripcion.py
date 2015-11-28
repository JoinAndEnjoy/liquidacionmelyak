# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20151124_1719'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='descripcion',
            name='tipoDescripcion',
        ),
    ]
