# chat/views.py
from django.shortcuts import render, reverse
from django.views.generic import ListView, DetailView, CreateView, DeleteView, UpdateView, TemplateView
from django.contrib.messages.views import SuccessMessageMixin
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required, permission_required

from .models import *
from .forms import *



@method_decorator(login_required, name='dispatch')
class RoomListView(ListView):
    model = Room

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["room_form"] = RoomForm
        return context
    
@method_decorator(login_required, name='dispatch')
class RoomDetailView(DetailView):
    model = Room

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        obj:Room = context["object"]
        # if not obj.current_users.filter(pk=self.request.user.pk).exists():
        #     obj.current_users.add(self.request.user)
        context["message_form"] = MessageForm
        # print(self.request.session.session_key)
        context["history"] = self.object.messages.all().order_by('-created_at')[:100]
        return context
    
    

@method_decorator(login_required, name='dispatch')
class RoomCreateView(SuccessMessageMixin, CreateView):
    model = Room
    form_class = RoomForm
    success_url = '.'
    success_message = "%(nombre)s creado con exito!"

    def form_valid(self, form):
        instance = form.save(commit=False)
        instance.host = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy('chat:room-detail', kwargs={'slug':self.object.slug})
        
