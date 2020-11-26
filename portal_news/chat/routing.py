# import os
# from channels.auth import AuthMiddlewareStack
# import django
# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.core.asgi import get_asgi_application
# from django.urls import re_path

# from .chat import consumers
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portal_news.settings')
# application = ProtocolTypeRouter({
#     "websocket":AuthMiddlewareStack(
#         URLRouter([
#             re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
#         ])
#     )
# })

from django.urls import re_path
from . import consumers
websocket_urlpatterns = [
            re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),

]