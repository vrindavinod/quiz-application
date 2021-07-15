from django.contrib import admin
from .models import Test,Question,Options,Ability,TestScore

# Register your models here.
admin.site.register(Test)
admin.site.register(Question)
admin.site.register(Options)
admin.site.register(Ability)
admin.site.register(TestScore)