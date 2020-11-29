from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import HttpResponseRedirect, Http404
from django.views.generic import TemplateView, FormView, CreateView, UpdateView
from news_app.models import Usuario
from django.contrib.auth import logout as do_logout
from django.contrib.auth import login as do_login
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError

from .forms import *

class FormNextMixin:
    def get_success_url(self):
            next_url = self.request.GET.get('next')
            if next_url:
                return next_url
            return super().get_success_url()


class LoginView(FormNextMixin, FormView):
    form_class = AuthForm
    template_name = 'login/login_page.html'
    success_url = '/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if self.request.method == 'POST': # ? Evita que ponga como next url el url de login
            context["next"] = self.get_success_url()
        return context
    
   
    def form_valid(self, form):
        response = super().form_valid(form)
        user = authenticate(username=form.cleaned_data["username"], password=form.cleaned_data["password"])
        if user is not None:
            do_login(self.request, user)
        return response

class RegisterView(FormNextMixin, CreateView):
    template_name = 'login/register.html'
    form_class = UserForm
    success_url = '/'

    def form_valid(self, form):
        response = super().form_valid(form)
        do_login(self.request, form.instance)
        return response


class LogoutView(TemplateView):

    def get(self, request, *args, **kwargs):
        do_logout(request)
        next_ = request.GET.get('next', None)
        if next_:
            return HttpResponseRedirect(next_)
        return HttpResponseRedirect('.')
