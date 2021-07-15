from .views import QpaperViewSet,TestpaperViewSet
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('settest/', QpaperViewSet.as_view()),
    path('gettest/', TestpaperViewSet.as_view()),

]
urlpatterns = format_suffix_patterns(urlpatterns)