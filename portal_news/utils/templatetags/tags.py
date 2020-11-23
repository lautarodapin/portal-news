from django.template import Library
from django.shortcuts import resolve_url
register = Library()


@register.simple_tag(name='is_active', takes_context=True)
def is_active(context, link):   
    return 'active' if context.request.get_full_path() == resolve_url(link) else ''


@register.inclusion_tag("tags/nota_card.html", takes_context=True)
def nota_card(context, nota):
    return dict(object=nota, request=context["request"])


    
@register.inclusion_tag('tags/breadcrumb.html', takes_context=True)
def breadcrumb(context, title, link=None, img=None, size=None):
    return dict(context=context, title=title, link=link, img=img, size=size)


@register.filter
def cut_chars(string: str, amount=100) -> str:
    cutted_string = string[:amount]
    return cutted_string
