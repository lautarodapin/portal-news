from django import forms
from crispy_forms.layout import Fieldset, Layout, Column, Row, Submit, ButtonHolder
from crispy_forms.helper import FormHelper

from .models import *
class NotaForm(forms.ModelForm):
    class Meta:
        model = Nota
        fields = [
            "titulo",
            "subtitulo",
            "cuerpo",
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        # self.helper.form_tag = False
        self.helper.render_hidden_fields = False
        self.helper.layout = Layout(
            Fieldset(
                "Nota",
                "titulo",
                "subtitulo",
                "cuerpo",
                ButtonHolder(Submit("submit", "Guardar", css_class="btn btn-lg btn-success")),
            )
        )