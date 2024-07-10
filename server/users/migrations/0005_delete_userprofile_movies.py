from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_movie_usermovie'),  # Replace with your actual last migration file name
    ]

    operations = [
        migrations.RunSQL(
            "DROP TABLE IF EXISTS users_userprofile_movies;"
        ),
    ]
