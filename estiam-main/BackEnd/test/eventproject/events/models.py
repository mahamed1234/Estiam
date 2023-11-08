from django.db import models
from django.contrib.auth.models import User


def get_default_author():
    user = User.objects.get_or_create(username='admin')[0]
    return user.id

class Event(models.Model):
    
    title = models.CharField(max_length=100)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description = models.TextField()
    user_id= models.ForeignKey(User, on_delete=models.CASCADE, default=get_default_author)          

    def __str__(self):
        return self.title

