from django.template import Library
from django.shortcuts import resolve_url
register = Library()


@register.simple_tag(name='is_active', takes_context=True)
def is_active(context, link):   
    return 'active' if context.request.get_full_path() == resolve_url(link) else ''