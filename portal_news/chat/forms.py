from django import forms
from .models import *


class RoomForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ["nombre"]


class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ["text"]

        widgets = {
            "text":forms.Textarea(attrs=dict(rows=3))
        }