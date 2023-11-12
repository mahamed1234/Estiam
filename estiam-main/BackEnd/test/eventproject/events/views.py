from django.contrib.auth.decorators import login_required
from rest_framework_simplejwt.authentication import JWTAuthentication

JWT_authenticator = JWTAuthentication()
from rest_framework.exceptions import PermissionDenied

from .models import Event

from rest_framework.status import HTTP_401_UNAUTHORIZED
import json
from django.http import HttpResponse

from .serializers import EventSerializer

from rest_framework.pagination import PageNumberPagination

from rest_framework import filters

from rest_framework import viewsets

from .permissions import IsGetRequest

from rest_framework.permissions import IsAuthenticated

from rest_framework.throttling import UserRateThrottle

from rest_framework.decorators import throttle_classes

from rest_framework.response import Response


class HttpResponseNoContent(HttpResponse):
    status_code = 204


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer

    filter_backends = [filters.SearchFilter]

    search_fields = ["id", "title", "start_date", "end_date" "user_id"]

    pagination_class = PageNumberPagination

    def get_queryset(self, **kwargs):
        response = JWT_authenticator.authenticate(self.request)
        print(response)
        if response:
            user, response = response

            if user.is_superuser:
                return Event.objects.all()
            else:
                return Event.objects.filter(user_id=user)

        raise PermissionDenied(
            {"status": HTTP_401_UNAUTHORIZED, "message": "Unauthorized"}
        )


@throttle_classes([UserRateThrottle])
class RateLimitedUsersView(EventViewSet):
    def get(self, request):
        return Response("This is the RateLimitedUsersView GET response")

    def post(self, request):
        return Response("This is the RateLimitedEventsView POST response")

    def put(self, request):
        return Response("This is the RateLimitedEventsView PUT response")


class EventDetailView(viewsets.ModelViewSet):
    queryset = Event.objects.all()

    serializer_class = EventSerializer

    pagination_class = PageNumberPagination

    def get_permissions(self):
        if self.action == "list":
            permission_classes = [IsGetRequest]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
