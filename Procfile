release: python portal_news/manage.py migrate --noinput
release: python manage.py collectstatic --no-input
web: cd portal_news/ && daphne portal_news.asgi:application --port $PORT --bind 0.0.0.0 -v2
# worker: cd portal_news/ && python manage.py runworker channel_layer -v2
worker: cd portal_news/ && python manage.py runworker channels --settings=portal_news.settings -v2
ps:scale web=1:free worker=1:free