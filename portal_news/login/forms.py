from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, Row, Column, Submit, ButtonHolder

from django.contrib.auth.forms import AuthenticationForm, UserCreationForm, UserChangeForm


class AuthForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_tag = False
        self.helper.layout = Layout(
            Fieldset(
                "Login",
                "username",
                "password",
            )
        )
        self.fields["username"].label = "Nombre de usuario"
        self.fields["password"].label = "Contraseña"