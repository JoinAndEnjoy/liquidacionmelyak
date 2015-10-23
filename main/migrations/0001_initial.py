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
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('nombre_ciudad', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Pais',
            fields=[
                ('cc_fips', models.CharField(serialize=False, max_length=10, primary_key=True)),
                ('cc_iso', models.CharField(max_length=10)),
                ('tld', models.CharField(max_length=10)),
                ('nombre_pais', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='ciudad',
            name='cc_fips',
            field=models.ForeignKey(to='main.Pais'),
        ),
    ]
