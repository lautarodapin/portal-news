from django.apps import AppConfig


class NewsAppConfig(AppConfig):
    name = 'news_app'
    def ready(self):
        from . import signals