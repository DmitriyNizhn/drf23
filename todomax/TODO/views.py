from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectSerializer, TodoSerializer
from .models import Project, Todo


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
