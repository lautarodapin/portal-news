from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(extra_context={'title':'Login'}), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(extra_context={'title':'Logout'}), name='logout'),
]
