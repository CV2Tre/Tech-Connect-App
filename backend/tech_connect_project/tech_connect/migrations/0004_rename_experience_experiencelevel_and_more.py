# Generated by Django 5.0.3 on 2024-04-03 02:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tech_connect', '0003_experience_remove_jobposting_technology_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Experience',
            new_name='ExperienceLevel',
        ),
        migrations.RenameField(
            model_name='jobposting',
            old_name='experiences',
            new_name='experience_levels',
        ),
        migrations.RemoveField(
            model_name='jobposting',
            name='experience_level',
        ),
    ]