from django import forms
from .models import *

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, Field

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
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.layout = Layout('text')
        self.helper.form_show_labels = False
        self.helper.form_tag = False
        self.helper.render_unmentioned_fields = False