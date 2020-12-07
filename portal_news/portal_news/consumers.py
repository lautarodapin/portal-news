
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils.timezone import now
from django.conf import settings



class StadisticalConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.room_group_name = 'stadistical'
        self.user = self.scope["user"]
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'send_message',
                'action':'add',
            }
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'send_message',
                'action':'remove',
            }
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        pass

    async def send_message(self, event:dict):
        await self.send(text_data=json.dumps({'action':event['action']}))