import json

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer

from users.models import User
from .models import Project, Todo
from .views import ProjectViewSet, TodoViewSet


class TestThmthViewSet(APITestCase):

    def setUp(self) -> None:
        self.url_prj = '/api/projects/'
        self.url_td = '/api/todos/'
        self.name = 'admin'
        self.password = 'admin_12359876'
        self.email = 'admin@mail.ru'
        self.data_td = {'text': '', 'in_work': True}
        self.data_prj = {'title': '', 'url_rep': ''}
        self.upd_data_prj = {'title': 'update', 'url_rep': ''}
        self.user = {'username': 'bigPit', 'email': 'pit_djanson@mail.ru'}
        self.admin = User.objects.create_superuser(self.name, self.email, self.password)

    def test_get_list_td(self):
        response = self.client.get(self.url_td)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_prj(self):
        response = self.client.get(self.url_prj)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_title_prj_admin(self):
        user = User.objects.create(**self.user)
        project = Project.objects.create(title='', url_rep='')
        project.authors.set([user])
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url_prj}{project.id}/',
                                   {'title': 'update', 'url_rep': '', 'authors': [user.id]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project.refresh_from_db()
        self.assertEqual(project.title, 'update')
        self.assertEqual(list(project.authors.all()), [user])
        project.authors.set([])
        self.client.logout()

    def test_put_title_prj_mix(self):
        project = mixer.blend(Project, authors__name='admin')
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url_prj}{project.id}/',
                                   {'title': 'update', 'url_rep': '', 'authors': [project.authors.first().id]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        self.assertEqual(response_project['title'], 'update')
