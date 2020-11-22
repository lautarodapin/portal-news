from django.views.generic import ListView, DetailView, UpdateView, CreateView, DeleteView, TemplateView
from django.contrib.messages.views import SuccessMessageMixin
from django.http import JsonResponse
from django.contrib import messages
from .models import *
from .forms import *


class NotaListView(ListView):
    model = Nota

class NotaDetailView(DetailView):
    model = Nota

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form_comentario"] = ComentarioForm()
        return context
    

class NotaCreateView(SuccessMessageMixin, CreateView):
    model = Nota
    form_class = NotaForm
    success_message = """Nota %(titulo)s creada con exito! """
    success_url = "/"

    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.autor = self.request.user
        obj.save()
        return super().form_valid(form)

class NotaUpdateView(SuccessMessageMixin, UpdateView):
    model = Nota
    form_class = NotaForm
    success_message = """Nota %(titulo)s fue editada con exito! """
    success_url = "/"

class NotaDeleteView(SuccessMessageMixin, DeleteView):
    model = Nota
    success_message = """Nota %(titulo)s fue eliminada"""
    success_url = "/"


class ComentarioCreateView(CreateView):
    model = Comentario
    fields = ["cuerpo", "autor", "nota"]
    success_url = "."
        
    def form_valid(self, form):
        response = super().form_valid(form)
        if self.request.is_ajax():
            return JsonResponse({"message":"Comentario creado", "cuerpo":form.cleaned_data["cuerpo"], "autor":form.cleaned_data["autor"].username})
        return response

class ComentarioUpdateView(UpdateView):
    model = Comentario
    fields = ["cuerpo"]
    success_url = "."

    def form_valid(self, form):
        response = super().form_valid(form)
        if self.request.is_ajax():
            return JsonResponse({"message":"Comentario creado", "cuerpo":form.cleaned_data["cuerpo"]})
        return response