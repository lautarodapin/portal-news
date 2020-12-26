from django.views.generic import ListView, DetailView, UpdateView, CreateView, DeleteView, TemplateView
from django.contrib.messages.views import SuccessMessageMixin
from django.urls import reverse_lazy
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import *
from .forms import *

class ImagenListView(ListView):
    model = Imagen

class ImagenCreateView(CreateView):
    model = Imagen
    form_class = ImagenForm


class NotaListView(ListView):
    model = Nota
    ordering = ["-created_at"]

class NotaDetailView(DetailView):
    model = Nota

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form_comentario"] = ComentarioForm()
        return context
    

class NotaCreateView(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    model = Nota
    form_class = NotaForm
    success_message = """Nota %(titulo)s creada con exito! """
    success_url = "/"
    login_url = reverse_lazy("login")

    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.autor = self.request.user
        obj.save()
        return super().form_valid(form)

class NotaUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = Nota
    form_class = NotaForm
    success_message = """Nota %(titulo)s fue editada con exito! """
    success_url = "/"
    login_url = reverse_lazy("login")

class NotaDeleteView(LoginRequiredMixin, SuccessMessageMixin, DeleteView):
    model = Nota
    success_message = """Nota %(titulo)s fue eliminada"""
    success_url = "/"
    login_url = reverse_lazy("login")


class ComentarioCreateView(LoginRequiredMixin, CreateView):
    model = Comentario
    fields = ["cuerpo", "autor", "nota"]
    success_url = "."
    login_url = reverse_lazy("login")
        
    def form_valid(self, form):
        response = super().form_valid(form)
        if self.request.is_ajax():
            return JsonResponse({"message":"Comentario creado", "cuerpo":form.cleaned_data["cuerpo"], "autor":form.cleaned_data["autor"].username})
        return response

class ComentarioUpdateView(LoginRequiredMixin, UpdateView):
    model = Comentario
    fields = ["cuerpo"]
    success_url = "."
    login_url = reverse_lazy("login")

    def form_valid(self, form):
        response = super().form_valid(form)
        if self.request.is_ajax():
            return JsonResponse({"message":"Comentario editado", "cuerpo":form.cleaned_data["cuerpo"]})
        return response

class ComentarioDeleteView(LoginRequiredMixin, DeleteView):
    model = Comentario
    success_url = '.'
    login_url = reverse_lazy("login")

    def form_valid(self, form):
        response = super().form_valid(form)
        if self.request.is_ajax():
            return JsonResponse({"message":"Comentario borrado"})
        return response
