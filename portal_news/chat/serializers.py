from .models import *
from news_app.models import Usuario
from rest_framework import serializers

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["code", "nombre", "host", "slug", "messages__text", "messages__user"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = []

