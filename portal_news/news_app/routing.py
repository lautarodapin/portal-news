from django.urls import re_path, path
from .consumers import (ImagenConsumer,)
websocket_urlpatterns = [
    path("ws/imagen/", ImagenConsumer.as_asgi()),
]   