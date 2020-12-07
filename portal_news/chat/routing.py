from django.urls import re_path, path
from . import consumers
websocket_urlpatterns = [
            path('ws/chat/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
            path('ws/test/', consumers.TestConsumer.as_asgi()),
            path('ws/usuarios/', consumers.UsuarioConsumerObserver.as_asgi()),
            # re_path(r'ws/chat/(?P<room_name>[A-Za-z 0-9 _\-])/$', consumers.ChatConsumer.as_asgi()),
            # re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),

]