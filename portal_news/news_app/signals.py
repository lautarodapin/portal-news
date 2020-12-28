from django.dispatch import receiver
from django.db.models.signals import pre_delete

from .models import Imagen

import cloudinary


@receiver(pre_delete, sender=Imagen)
def remove_cloudinary_image(sender:Imagen.__class__, instance:Imagen, using, **kwargs):
    cloudinary.uploader.destroy(instance.imagen.public_id)