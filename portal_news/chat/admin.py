from django.contrib import admin

from .models import Room, Message


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'mod_at', 'created_at', 'code', 'nombre', 'host', 'slug')
    list_filter = ('mod_at', 'created_at')


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'mod_at', 'created_at', 'room', 'text')
    list_filter = ('mod_at', 'created_at', 'room')