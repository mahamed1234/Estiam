from rest_framework import authentication
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()

class EmailPasswordAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            return None

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None

        if user.check_password(password):
            return (user, None)

        raise AuthenticationFailed("Invalid email or password")
