from django.urls import path, re_path
from django.shortcuts import render

urlpatterns = [
    # path('', lambda r, *args, **kwargs: render(r, 'frontend/index.html')),
    re_path(r'^(?:.*)/?$', lambda r, *args, **kwargs: render(r, 'frontend/index.html')),
]
