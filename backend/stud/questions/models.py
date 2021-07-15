from django.db import models
from ckeditor.fields import RichTextField
from users.models import UserProfile

# Create your models here.
class Ability(models.Model):
    abilityVal = models.CharField(max_length=200,default='')


class Options(models.Model):
    optionVal = RichTextField(blank=False,null=False)
    abilities = models.ManyToManyField(Ability,related_name="option", blank=True)
    is_correct =  models.BooleanField(default=False)

class Question(models.Model):
    questionVal = RichTextField(blank=False,null=False)
    options = models.ManyToManyField(Options,related_name="question", blank=True)

class Test(models.Model):
    teacher = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    questionPaperTitle = models.CharField(max_length=200,default='')
    questions = models.ManyToManyField(Question,related_name="test", blank=True)

class TestScore(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    student = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    scored = models.IntegerField(default=0)
    totalScored = models.IntegerField(default=0)

