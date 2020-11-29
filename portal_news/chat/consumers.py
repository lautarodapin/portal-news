
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils.timezone import now
from .models import Message, Room
class ChatConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        print("connectado al room ", self.room_name)
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print("Recibio datos")
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

    # Receive message from room group
    async def chat_message(self, event):
        print("Chat message")
        message = now().strftime("%d-%m-%Y %H:%M:%S") + ": " + event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))



    @database_sync_to_async
    def get_room(self):
        print("Obteniendo room")
        return Room.objects.get(slug=self.room_name)
    
    @database_sync_to_async
    def save_message(self, message:str, room:Room):
        print("Guardando mensaje", message)
        Message.objects.create(room=room, text=message)
