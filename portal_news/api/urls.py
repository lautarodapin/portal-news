from django.urls import path, re_path, include
from rest_framework.authtoken.views import obtain_auth_token  # <-- Here
from rest_framework.routers import DefaultRouter
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
    path('token-auth/', obtain_auth_token, name='token-auth'),
    path("test/", test),
]