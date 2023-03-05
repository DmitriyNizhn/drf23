from django.db import models

from users.models import User


# Create your models here.


class Project(models.Model):
    title = models.CharField(max_length=32)
    url_rep = models.URLField(null= True, blank=True)
    authors = models.ManyToManyField(User)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    authors = models.ForeignKey(User, on_delete=models.PROTECT)
    in_work = models.BooleanField(default=True)
