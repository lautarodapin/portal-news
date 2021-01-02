from django.urls import path, re_path, include
from django.views.generic import base
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.fields import CurrentUserDefault  # <-- Here
from rest_framework.routers import DefaultRouter

from rest_framework_jwt.views import obtain_jwt_token, ObtainJSONWebToken
from rest_framework_jwt.views import refresh_jwt_token

from .views import *
app_name = 'api'

router = DefaultRouter()
router.register(r'rooms', RoomViewSet, basename='room')
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'users', UsuarioViewSet, basename='user')
router.register(r'imagen', ImagenViewSet, basename="imagen")
router.register(r'nota', NotaViewSet, basename="nota")
router.register(r'comentario', ComentarioViewSet, basename="comentario")

urlpatterns = [
    path('', include(router.urls)),
    path('token-auth/', obtain_jwt_token, name='token-auth'),
    path('token-auth/refresh/', refresh_jwt_token),
    path('current/', current_user),
    path('usuarios/', UserList.as_view(), name='usuarios-list'),
    path("test/", test),
]