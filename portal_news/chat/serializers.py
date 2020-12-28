from .models import *
from news_app.models import Usuario
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        exclude = ["password",]
        depth = 1

class MessageSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()
    user = UserSerializer()
    class Meta:
        model = Message
        exclude = []
        depth = 1
    def get_created_at_formatted(self, obj:Message):
        return obj.created_at.strftime("%d-%m-%Y %H:%M:%S")

class RoomSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    messages = MessageSerializer(many=True, read_only=True)
    class Meta:
        model = Room
        fields = ["pk", "code", "nombre", "host", "slug", "messages", "current_users", "last_message"]
        depth = 1
        read_only_fields = ["code", "slug", "messages", "last_message"]
        
    def get_last_message(self, obj:Room):
        return MessageSerializer(obj.messages.order_by('created_at').last()).data