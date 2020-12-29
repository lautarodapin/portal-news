from rest_framework import status, viewsets
from chat.models import (Message, Room,)
from news_app.models import (Usuario, Imagen)
from django.conf import settings
from chat.serializers import (MessageSerializer, RoomSerializer, UserSerializer)
from news_app.serializers import (ImagenSerializer)
from typing import List

from news_app.forms import ImagenForm
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


class ImagenViewSet(MixinFilter, viewsets.ModelViewSet):
    queryset = Imagen.objects.all()
    serializer_class = ImagenSerializer

import json
import re, io
from base64 import decodestring
import cloudinary
from django.core.files import File
"""
data_url_pattern = re.compile('data:image/(png|jpeg);base64,(.*)$')
signature_url = request.POST.get("sig_data_url")
signature_data = data_url_pattern.match(signature_url).group(2)
signature_data = bytes(signature_data, 'UTF-8')
signature_data = decodestring(signature_data)
img_io = io.BytesIO(signature_data)
model_instance.image_field.save(filename, File(img_io))
"""
def test(request):
    data = json.loads(request.body)
    html = data.get("html")
    print(html)
    data = re.compile('data:image/(png|jpeg|jpg|png);base64,(.*)">').findall(html)
    print(data)
    data = bytes(data[0][1], "UTF-8")
    print(data)
    img_io = io.BytesIO(data)
    print(img_io)
    cloudinary.uploader.upload_large(File(img_io))
    # form = ImagenForm(initial={"imagen":File(img_io)})
    # print(form)
    # print(form.is_valid())
    # print(form.errors)
    # if form.is_valid():
    #     form.save()