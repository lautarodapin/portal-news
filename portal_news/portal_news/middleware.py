from django.conf import settings
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy, reverse

class RequireLoginMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.login_path = reverse_lazy("login")
        self.register_path = reverse("register")

    def __call__(self, request):
        response = self.get_response(request)
        # if request.path != self.login_path and request.path != self.register_path and request.user.is_anonymous:
        #     return HttpResponseRedirect('%s?next=%s' % (self.login_path, request.path))
        return response
