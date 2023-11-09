from django.contrib.auth.models import User
from rest_framework import serializers

from eventproject.events.serializers import EventSerializer
from django.contrib.auth.hashers import make_password
class UserSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)

    def validate_password(self, value: str) -> str:
        return make_password(value)
    
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'password', 'events', 'is_superuser']



             
