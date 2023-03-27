import json

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer

from users.models import User
from .views import UserCustomViewSet


class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin_12359876'
        self.email = 'admin@mail.ru'
        self.url = '/api/users/'
        self.data = {'username': 'Pit', 'email': 'pit_djanson@mail.ru'}
        self.upd_data = {'username': 'bigPit', 'email': 'pit_djanson@mail.ru'}
        self.admin = User.objects.create_superuser(self.name, self.email, self.password)

    def test_get_list(self):
        factory = APIRequestFactory()

        request = factory.get(self.url)
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_quest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, {'username': 'pit', 'email': 'pit@mail.ru'}, format='json')
        force_authenticate(request, self.admin)
        view = UserCustomViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = User.objects.create(username='pit', email='pit@mail.ru', last_name='jonson', first_name='Pieter')
        client = APIClient()
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_upd_quest(self):
        user = User.objects.create(**self.data)
        client = APIClient()
        response = client.put(f'{self.url}{user.id}/', {'username': 'BIGPIT'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_upd_admin(self):
        user = User.objects.create(**self.data)
        client = APIClient()
        client.login(username=self.name, password=self.password)
        response = client.put(f'{self.url}{user.id}/', self.upd_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        auth = User.objects.get(id=user.id)
        self.assertEqual(auth.username, 'bigPit')
        client.logout()

    def tearDown(self) -> None:
        pass



