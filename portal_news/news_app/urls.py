from django.urls import path
from .views import *


app_name = "news_app"
urlpatterns = [
    path('', NotaListView.as_view(), name="nota-list"),
    path('nota/crear', NotaCreateView.as_view(), name="nota-create"),
    path('nota/<slug:slug>', NotaDetailView.as_view(), name="nota-detail"),
    path('nota/<slug:slug>/editar', NotaUpdateView.as_view(), name="nota-update"),
    path('nota/<slug:slug>/borrar', NotaDeleteView.as_view(), name="nota-delete"),

    path('comentario/crear', ComentarioCreateView.as_view(), name="comentario-create"),
    path('comentario/<int:pk>/editar', ComentarioUpdateView.as_view(), name="comentario-update"),
]
