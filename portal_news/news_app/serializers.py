from rest_framework import serializers
from .models import Imagen
class ImagenSerializer(serializers.ModelSerializer):
    imagen = serializers.FileField()
    class Meta:
        model = Imagen
        fields = ["imagen",]