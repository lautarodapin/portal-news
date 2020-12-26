# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Usuario, Nota, Comentario, Imagen


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'password',
        'last_login',
        'is_superuser',
        'username',
        'first_name',
        'last_name',
        'email',
        'is_staff',
        'is_active',
        'date_joined',
    )
    list_filter = (
        'last_login',
        'is_superuser',
        'is_staff',
        'is_active',
        'date_joined',
    )
    raw_id_fields = ('groups', 'user_permissions')


@admin.register(Nota)
class NotaAdmin(admin.ModelAdmin):
    list_display = (
    'id',
     'titulo',
     'subtitulo',
     'slug',
     'autor',
     'created_at',
     'mod_at',
    )
    list_filter = ('autor',)
    search_fields = ('slug',)


@admin.register(Comentario)
class ComentarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'cuerpo', 'nota', 'autor')
    list_filter = ('nota', 'autor')


@admin.register(Imagen)
class ImagenAdmin(admin.ModelAdmin):
    list_display = ('id', 'imagen')
    
