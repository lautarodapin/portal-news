# chat/urls.py
from django.urls import path
from .views import *

app_name = 'chat'

urlpatterns = [
    # path('', index, name='index'),
    path('rooms/', RoomListView.as_view(), name='room-list'),
    path('rooms/create/', RoomCreateView.as_view(), name='room-create'),
    path('rooms/<slug:slug>/', RoomDetailView.as_view(), name='room-detail'),

]