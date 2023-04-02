from graphene import Schema, ObjectType, List
from graphene_django import DjangoObjectType
from users.models import User
from TODO.models import Todo, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(ObjectType):
    all_user = List(UserType)
    all_todo = List(TodoType)
    all_project = List(ProjectType)

    def resolve_all_user(root, info):
        return User.objects.all()

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()


schema = Schema(query=Query)
