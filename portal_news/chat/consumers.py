
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils.timezone import now
from .models import Message, Room
from django.conf import settings
class ChatConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        self.user = self.scope["user"]
        # Join room group
        room = await self.get_room() 
        await self.add_user_to_room(room)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'update_users',
                'usuarios':await self.current_users(room)
            }
        )

    async def disconnect(self, close_code):
        room = await self.get_room()
        await self.remove_user_to_room(room)
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = "%s %s: %s" % (
            now().strftime("%d-%m-%Y %H:%M:%S"), 
            self.user, 
            text_data_json['message']) #? El receive se ejecuta en un solo consumidor
        room = await self.get_room()
        await self.save_message(message, room)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def update_users(self, event:dict):
        await self.send(text_data=json.dumps({'usuarios':event["usuarios"]}))

    # Receive message from room group
    async def chat_message(self, event:dict):
        message = event["message"]
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

    @database_sync_to_async
    def get_room(self)->Room:
        return Room.objects.get(slug=self.room_name)
    
    @database_sync_to_async
    def save_message(self, message:str, room:Room):
        Message.objects.create(room=room, text=message, user=self.user)

    @database_sync_to_async
    def add_user_to_room(self, room:Room):
        room.current_users.add(self.user)
        room.save()
    
    @database_sync_to_async
    def remove_user_to_room(self, room:Room):
        room.current_users.remove(self.user)
        room.save()

    @database_sync_to_async
    def current_users(self, room:Room):
        return [usuario.username for usuario in room.current_users.all()]


from djangochannelsrestframework.generics import GenericAsyncAPIConsumer, AsyncAPIConsumer
from djangochannelsrestframework.observer.generics import ObserverModelInstanceMixin
from djangochannelsrestframework.observer import model_observer
from .serializers import UserSerializer
from news_app.models import Usuario

class TestConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    queryset = Usuario.objects.all()
    serializer_class = UserSerializer


class UsuarioConsumerObserver(GenericAsyncAPIConsumer):
    queryset = Usuario.objects.all()
    serializer_class = UserSerializer
    async def accept(self, **kwargs):
        await super().accept(** kwargs)
        await self.model_change.subscribe()


    @model_observer(Usuario)
    async def model_change(self, message, **kwargs):
        await self.send_json(message)

