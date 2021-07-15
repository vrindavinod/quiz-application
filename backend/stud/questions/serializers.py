from rest_framework import serializers
from .models import Test,Question,Options,Ability
from users.serializers import UserProfileSerializer


class AbilitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Ability
        fields = ['abilityVal']

class OptionsSerializer(serializers.ModelSerializer):
    abilities = AbilitySerializer(many=True)

    class Meta:
        model = Options
        fields = ['optionVal','abilities','is_correct']


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionsSerializer(many=True)

    class Meta:
        model = Question
        fields = ['questionVal','options']

class TestSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Test
        fields = ['questionPaperTitle','questions']


