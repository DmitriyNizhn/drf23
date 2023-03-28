from rest_framework.serializers import ModelSerializer
from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class UserV2Serializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('is_superuser', 'is_staff')

