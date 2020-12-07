from django.urls import re_path, path
from .consumers import *
websocket_urlpatterns = [
    path('ws/stadistical/', StadisticalConsumer.as_asgi()),
]