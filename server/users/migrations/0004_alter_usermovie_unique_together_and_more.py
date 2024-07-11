# Generated by Django 4.2.3 on 2024-07-10 21:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_movie_usermovie'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='usermovie',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='usermovie',
            name='movie',
        ),
        migrations.RemoveField(
            model_name='usermovie',
            name='user',
        ),
        migrations.DeleteModel(
            name='Movie',
        ),
        migrations.DeleteModel(
            name='UserMovie',
        ),
    ]