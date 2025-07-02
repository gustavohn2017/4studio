from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="VoiceCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("slug", models.SlugField(blank=True, unique=True)),
                ("description", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Categoria de Voz",
                "verbose_name_plural": "Categorias de Voz",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="VoiceType",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                (
                    "gender",
                    models.CharField(
                        choices=[
                            ("male", "Masculino"),
                            ("female", "Feminino"),
                            ("ai", "Inteligência Artificial"),
                        ],
                        max_length=10,
                    ),
                ),
                ("is_ai", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Tipo de Voz",
                "verbose_name_plural": "Tipos de Voz",
            },
        ),
        migrations.CreateModel(
            name="Testimonial",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("client_name", models.CharField(max_length=100)),
                ("company", models.CharField(blank=True, max_length=200)),
                ("quote", models.TextField()),
                (
                    "image",
                    models.ImageField(
                        blank=True, null=True, upload_to="images/testimonials/"
                    ),
                ),
                ("active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "Depoimento",
                "verbose_name_plural": "Depoimentos",
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="ContactRequest",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(max_length=20)),
                ("company", models.CharField(blank=True, max_length=200)),
                ("message", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("contacted", models.BooleanField(default=False)),
                (
                    "service_type",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="api.voicecategory",
                    ),
                ),
            ],
            options={
                "verbose_name": "Solicitação de Contato",
                "verbose_name_plural": "Solicitações de Contato",
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="AudioSample",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField(blank=True)),
                ("audio_file", models.FileField(upload_to="audio/samples/")),
                ("duration", models.DurationField(blank=True, null=True)),
                ("featured", models.BooleanField(default=False)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="audio_samples",
                        to="api.voicecategory",
                    ),
                ),
                (
                    "voice_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="audio_samples",
                        to="api.voicetype",
                    ),
                ),
            ],
            options={
                "verbose_name": "Amostra de Áudio",
                "verbose_name_plural": "Amostras de Áudio",
                "ordering": ["-featured", "-created_at"],
            },
        ),
    ]
