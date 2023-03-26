from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, \
    DestroyModelMixin
from .serializers import UserSerializer
from .models import User


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

# class UserCustomViewSet(CreateModelMixin, ListModelMixin, UpdateModelMixin, DestroyModelMixin,
#                         RetrieveModelMixin, GenericViewSet):
class UserCustomViewSet(ListModelMixin,CreateModelMixin,
                        RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = UserLimitOffsetPagination
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    ordering = ('id',)
