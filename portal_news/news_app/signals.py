from django.dispatch import receiver
from django.db.models.signals import pre_delete, post_delete

from .models import Imagen

import cloudinary


@receiver(post_delete, sender=Imagen)
def remove_cloudinary_image(sender:Imagen.__class__, instance:Imagen, using, **kwargs):
    if hasattr(instance.imagen, "public_id") and instance.imagen.public_id != None:
        cloudinary.uploader.destroy(instance.imagen.public_id)
    