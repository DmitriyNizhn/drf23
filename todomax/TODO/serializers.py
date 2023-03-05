from rest_framework.serializers import ModelSerializer
from .models import Project, Todo


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        exclude = ('in_work',)
