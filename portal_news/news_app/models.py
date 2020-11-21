from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.utils.timezone import now
from django.utils.translation import gettext as _

from tinymce.models import HTMLField

class AbstractDate(models.Model):
    class Meta:
        abstract = True

    created_at = models.DateTimeField(auto_now_add=True)
    mod_at = models.DateTimeField(auto_now=True)

class Usuario(AbstractUser):
    pass


class Nota(AbstractDate):
    titulo = models.CharField(max_length=255)
    subtitulo = models.CharField(max_length=255, blank=True, null=True)
    cuerpo = HTMLField()
    slug = models.SlugField(blank=True, unique=True, editable=False)

    autor = models.ForeignKey(Usuario, verbose_name=_("Autor"), on_delete=models.CASCADE, related_name="notas")

    def save(self, *args, **kwargs):
        self.slug = slugify(self.created_at.strftime("%Y-%m-%d-") + str(self.titulo) + "-" + str(self.autor.username))
        super().save(*args, **kwargs)


class Comentario(AbstractDate):
    cuerpo = HTMLField()
    nota = models.ForeignKey(Nota, verbose_name=_("Nota"), on_delete=models.CASCADE, related_name="comentarios")
    autor = models.ForeignKey(Usuario, verbose_name=_("Autor"), on_delete=models.CASCADE, related_name="comentarios")
    
