# Generated by Django 3.1.3 on 2020-12-19 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news_app', '0003_auto_20201121_1531'),
    ]

    operations = [
        migrations.CreateModel(
            name='Imagen',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('mod_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
