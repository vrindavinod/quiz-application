from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TestSerializer,QuestionSerializer,OptionsSerializer,AbilitySerializer
from .models import Test,Question,Options,Ability,TestScore
from users.models import UserProfile,TeacherStudent

from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.parsers import JSONParser


# Create your views here.
class QpaperViewSet(APIView):

    def get(self, request, format=None):
        userProfile = UserProfile.objects.filter(user=request.user)
        classes = TeacherStudent.objects.filter(students=userProfile[0])
        test = Test.objects.filter(teacher=classes[0].teacher)
        testScore = TestScore.objects.filter(test = test[0],student=userProfile[0])
        if(testScore):
            didTake = True
        else:
            didTake = False
        user_data = {
            "didTake": didTake
        }
        return Response(user_data, status=status.HTTP_201_CREATED)

    def post(self, request, format=None):
        title       = request.data['questionPaperTitle']
        questions   = request.data['questions']
        userProfile = UserProfile.objects.filter(user=request.user)
        test        = Test.objects.create(questionPaperTitle  = title,teacher=userProfile[0])
        for _question in questions:
            question    = Question.objects.create(questionVal = _question['questionVal'])
            for _option in _question['options']:
                option  = Options.objects.create(optionVal = _option['optionVal'],is_correct=_option['is_correct'])
                for _ability in _option['abilities']:
                    ability = Ability.objects.create(**_ability)
                    option.abilities.add(ability)
                question.options.add(option)
            test.questions.add(question)
        
        form = TestSerializer(test)
        user_data = {
            "message": form.data
        }
        return Response(user_data, status=status.HTTP_201_CREATED)

class TestpaperViewSet(APIView):

    def get_test(self,user):
        userProfile = UserProfile.objects.filter(user=user)
        classes = TeacherStudent.objects.filter(students=userProfile[0])
        return Test.objects.filter(teacher=classes[0].teacher)

    def get(self, request, format=None):
        test = self.get_test(request.user)
        if(test):
            qpaper = TestSerializer(test[0])
            return Response(qpaper.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, format=None):
        test = self.get_test(request.user)
        userProfile = UserProfile.objects.filter(user=request.user)
        TestScore.objects.create(test=test[0],student=userProfile[0],scored=request.data['score'],totalScored =request.data['total'])
        user_data = {
            "message": "All Okay"
        }
        return Response(user_data, status=status.HTTP_201_CREATED)
