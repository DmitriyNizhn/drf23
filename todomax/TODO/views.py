from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination

from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .filters import ProjectFilter, TodoFilter
from .serializers import ProjectSerializer, TodoSerializer
from .models import Project, Todo
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, \
    DestroyModelMixin


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    filterset_class = TodoFilter
    pagination_class = TodoLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.in_work = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
