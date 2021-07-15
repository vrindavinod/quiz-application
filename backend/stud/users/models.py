from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    userType = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username

class TeacherStudent(models.Model):
    teacher = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    students = models.ManyToManyField(UserProfile,related_name="students", blank=True)