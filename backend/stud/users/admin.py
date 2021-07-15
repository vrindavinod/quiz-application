from django.contrib import admin
from .models import UserProfile,TeacherStudent

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(TeacherStudent)