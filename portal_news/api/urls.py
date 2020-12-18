from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from .views import *
app_name = 'api'

router = DefaultRouter()
router.register(r'rooms', RoomViewSet, basename='room'),
router.register(r'messages', MessageViewSet, basename='message'),
router.register(r'users', UsuarioViewSet, basename='user'),

urlpatterns = router.urls