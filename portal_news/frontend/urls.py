from django.urls import path, re_path
from django.shortcuts import render
from django.contrib.auth.decorators import login_required


urlpatterns = [
    # path('', lambda r, *args, **kwargs: render(r, 'frontend/index.html')),
    re_path(r'^(?:.*)/?$', login_required(lambda r, *args, **kwargs: render(r, 'frontend/index.html')), name='frontend'),
]
