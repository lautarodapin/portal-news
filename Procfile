release: python portal_news/manage.py migrate --noinput
web: cd portal_news/ && daphne portal_news.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker: cd portal_news/ && python manage.py runworker channel_layer -v2
