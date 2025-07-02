from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactrequest',
            name='script_file',
            field=models.FileField(blank=True, null=True, upload_to='uploads/scripts/'),
        ),
    ]
