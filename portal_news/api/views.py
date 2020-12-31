from rest_framework import status, viewsets, views
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from chat.models import (Message, Room,)
from news_app.models import (Usuario, Imagen, Nota, Comentario)
from django.conf import settings
from chat.serializers import (MessageSerializer, RoomSerializer, UserSerializer, UserSerializerWithToken)
from news_app.serializers import (ImagenSerializer, NotaSerializer, ComentarioSerializer)
from typing import List
from rest_framework.response import Response
from news_app.forms import ImagenForm
import json
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
    permission_classes = [IsAuthenticatedOrReadOnly,]

class MessageViewSet(MixinFilter, viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_kwargs = ["room__nombre__icontains", "user__username__icontains"]
    permission_classes = [IsAuthenticatedOrReadOnly,]

class UsuarioViewSet(MixinFilter, viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]


class ImagenViewSet(MixinFilter, viewsets.ModelViewSet):
    queryset = Imagen.objects.all()
    serializer_class = ImagenSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

class NotaViewSet(MixinFilter, viewsets.ModelViewSet):
    queryset = Nota.objects.all()
    serializer_class = NotaSerializer
    filter_kwargs = ["slug",]
    lookup_field = 'slug'
    permission_classes = [IsAuthenticatedOrReadOnly,]

class ComentarioViewSet(MixinFilter, viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticatedOrReadOnly,]


@api_view(["GET"])
def current_user(request):
    print(request.user)
    return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)

class UserList(views.APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def test(request):
    data = json.loads(request.body)
    html = data.get("html")

    Nota.objects.create(titulo="Prueba", cuerpo=html, autor=request.user)
