from django.urls import path, re_path
from django.shortcuts import render
from django.contrib.auth.decorators import login_required


from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator


urlpatterns = [
    # path('', lambda r, *args, **kwargs: render(r, 'frontend/index.html')),
    re_path(r'^(?:.*)/?$', ensure_csrf_cookie(lambda r, *args, **kwargs: render(r, 'index.html')), name='frontend'),
    # re_path(r'^(?:.*)/?$', ensure_csrf_cookie(lambda r, *args, **kwargs: render(r, 'frontend/index.html')), name='frontend'),
]
