"""
Django settings for portal_news project.

Generated by 'django-admin startproject' using Django 3.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os
from decouple import config
import dj_database_url
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
AMBIENTE = config('AMBIENTE', default='PROD')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG")

ALLOWED_HOSTS = ["*",]


# Application definition
AUTH_USER_MODEL = 'news_app.Usuario'

INSTALLED_APPS = [
    'channels',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'news_app.apps.NewsAppConfig',
    'chat.apps.ChatConfig',
    'login.apps.LoginAppConfig',
    'ads', 'sekizai',
    'django_extensions',
    'tinymce',
    'crispy_forms',
    'bootstrap4',
]
CRISPY_TEMPLATE_PACK = "bootstrap4"

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.gzip.GZipMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portal_news.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, "templates"),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'sekizai.context_processors.sekizai',
                'django.contrib.messages.context_processors.messages',
            ],
            'builtins':[
                'utils.templatetags.tags',
            ],
        },
    },
]

WSGI_APPLICATION = 'portal_news.wsgi.application'
ASGI_APPLICATION = "portal_news.asgi.application"


CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [config("REDIS_URL")],
        },
    },
}

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
if AMBIENTE == 'PROD':
    DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=True)
    


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'es-es'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# Tinymce
TINYMCE_DEFAULT_CONFIG = {
    "plugins":"image,imagetools",
    "theme":"silver",

}
# Whitenoise




from django.utils.translation import gettext_lazy as _
# ADS
ADS_GOOGLE_ADSENSE_CLIENT = None  # 'ca-pub-xxxxxxxxxxxxxxxx'

ADS_ZONES = {
    'header': {
        'name': _('Header'),
        'ad_size': {
            'xs': '720x150',
            'sm': '800x90',
            'md': '800x90',
            'lg': '800x90',
            'xl': '800x90'
        },
        'google_adsense_slot': None,  # 'xxxxxxxxx',
        'google_adsense_format': None,  # 'auto'
    },
    'content': {
        'name': _('Content'),
        'ad_size': {
            'xs': '720x150',
            'sm': '800x90',
            'md': '800x90',
            'lg': '800x90',
            'xl': '800x90'
        },
        'google_adsense_slot': None,  # 'xxxxxxxxx',
        'google_adsense_format': None,  # 'auto'
    },
    'sidebar': {
        'name': _('Sidebar'),
        'ad_size': {
            'xs': '720x150',
            'sm': '800x90',
            'md': '800x90',
            'lg': '800x90',
            'xl': '800x90'
        }
    }
}

ADS_DEFAULT_AD_SIZE = '720x150'

ADS_DEVICES = (
    ('xs', _('Extra small devices')),
    ('sm', _('Small devices')),
    ('md', _('Medium devices (Tablets)')),
    ('lg', _('Large devices (Desktops)')),
    ('xl', _('Extra large devices (Large Desktops)')),
)

ADS_VIEWPORTS = {
    'xs': 'd-block img-fluid d-sm-none',
    'sm': 'd-none img-fluid d-sm-block d-md-none',
    'md': 'd-none img-fluid d-md-block d-lg-none',
    'lg': 'd-none img-fluid d-lg-block d-xl-none',
    'xl': 'd-none img-fluid d-xl-block',
}



# CELERY
INSTALLED_APPS += ('portal_news', 'django_celery_beat',)
# BROKER_URL = 'redis://localhost:6379/1'
# BROKER_TRANSPORT = 'redis'
# CELERYBEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'


# EMAIL
# EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend'
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' #? Muestra en consola
# EMAIL_BACKEND = 'django_mailgun.MailgunBackend'
# MAILGUN_ACCESS_KEY = config("MAILGUN_ACCESS_KEY")
# MAILGUN_SERVER_NAME = 'https://api.mailgun.net/v3/sandbox06c86d2720174571847ca3f6c3fe1ff6.mailgun.org?'