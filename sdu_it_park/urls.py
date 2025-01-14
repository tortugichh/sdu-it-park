from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),  # URL для админки
    path('api/', include('proposals.urls')),  # Маршруты для API
    path('', lambda request: redirect('/admin/')),  # Редирект на админку
]

# Для обслуживания медиа-файлов в процессе разработки
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
