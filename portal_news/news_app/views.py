from django.views.generic import ListView, DetailView, UpdateView, CreateView, DeleteView, TemplateView
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib import messages
from .models import *
from .forms import *


class NotaListView(ListView):
    model = Nota

class NotaDetailView(DetailView):
    model = Nota

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
