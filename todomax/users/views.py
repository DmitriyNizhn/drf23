from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, \
    DestroyModelMixin
from rest_framework.generics import ListAPIView
from .serializers import UserSerializer, UserV2Serializer
from .models import User


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 30


# class UserCustomViewSet(CreateModelMixin, ListModelMixin, UpdateModelMixin, DestroyModelMixin,
#                         RetrieveModelMixin, GenericViewSet):
class UserCustomViewSet(ListModelMixin, CreateModelMixin,
                        RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = UserLimitOffsetPagination
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    ordering = ('id',)


class UserListApiView(ListAPIView):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserV2Serializer
        return UserSerializer
