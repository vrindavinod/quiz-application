"""stud URL Configuration
"""
from django.contrib import admin
from django.conf.urls import url,include
from django.urls import path

urlpatterns = [
    url(r'^api-auth/', include('rest_framework.urls',namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('questions/', include('questions.urls')),
]
