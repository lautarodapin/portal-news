from django.urls import re_path, path
from .consumers import (TestConsumer, UsuarioConsumerObserver, RoomConsumer,)
websocket_urlpatterns = [
            # path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),
            path('ws/test/', TestConsumer.as_asgi()),
            path('ws/usuarios/', UsuarioConsumerObserver.as_asgi()),
            # re_path(r'ws/chat/(?P<room_name>[A-Za-z 0-9 _\-])/$', ChatConsumer.as_asgi()),
            # re_path(r'ws/chat/(?P<room_name>\w+)/$', ChatConsumer.as_asgi()),
            path('ws/messages/', RoomConsumer.as_asgi()),
]   