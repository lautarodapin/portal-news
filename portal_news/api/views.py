from rest_framework import status, viewsets
from chat.models import (Message, Room,)
from news_app.models import (Usuario)
from django.conf import settings
from chat.serializers import (MessageSerializer, RoomSerializer, UserSerializer)
from typing import List
class MixinFilter:
    filter_kwargs : List[str]= []

    def get_queryset(self):
        queryset = super().get_queryset()
        kwargs = dict()
        if self.filter_kwargs.__len__() != 0:
            for f in self.filter_kwargs:
                temp = f.split('__')
                if len(temp) == 1: # ? solo tengo por ejemplo 'id' 
                    key = temp[0]
                    arg = self.request.GET.get(temp[0])
                # todo hay 2 casos en el caso que tenga longitud 2, una que sea una many to many y otra que sea un filtro
                elif len(temp) > 2: # ? 'name__icontains'
                    key = '__'.join(temp)
                    arg = self.request.GET.get(temp[0])
                else: # ? 'user__username__icontains
                    key = "__".join(temp)
                    temp.pop(-1)
                    arg = self.request.GET.get("__".join(temp))

                if arg is not None:
                    kwargs[key] = arg
            if kwargs != {}:
                queryset = queryset.filter(**kwargs)
        return queryset


class RoomViewSet(MixinFilter, viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    filter_kwargs = ["code", "nombre__icontains"]

class MessageViewSet(MixinFilter, viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_kwargs = ["room__nombre__icontains", "user__username__icontains"]

class UsuarioViewSet(MixinFilter, viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UserSerializer

