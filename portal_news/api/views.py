from rest_framework import status, viewsets
from chat.models import (Message, Room,)
from news_app.models import (Usuario)
from django.conf import settings
from chat.serializers import (MessageSerializer, RoomSerializer, UserSerializer)

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UserSerializer

