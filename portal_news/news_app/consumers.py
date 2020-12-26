
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils.timezone import now
from django.conf import settings

from djangochannelsrestframework.generics import GenericAsyncAPIConsumer, AsyncAPIConsumer
from djangochannelsrestframework.observer.generics import (ObserverModelInstanceMixin, action)
from djangochannelsrestframework.observer import model_observer

from typing import Generator
from .forms import (ImagenForm, )

class ImagenConsumer(GenericAsyncAPIConsumer):
    @action()
    async def upload_image(self, binary_image, **kwargs):
        print(binary_image)
