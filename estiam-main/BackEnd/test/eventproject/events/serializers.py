from rest_framework import serializers

from rest_framework_simplejwt.authentication import JWTAuthentication

JWT_authenticator = JWTAuthentication()
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_401_UNAUTHORIZED
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Event


def authenticateUser(request):
    response = JWT_authenticator.authenticate(request)
    if response:
        user, response = response
        print(response)
        print("this is decoded token claims", response)
        if request.data:
            return (user, True)
        return (user, False)


@swagger_auto_schema(
    operation_description="Create events",
    responses={201: openapi.Response("Event created", Event)},
    response_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            "exampleTest": openapi.Schema(
                type=openapi.TYPE_STRING, description="Example descroption"
            ),
        },
        required=["exampleTest"],
    ),
)
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

    def create(self, validated_data):
        user, isAuthenitcated = authenticateUser(self.context["request"])
        if isAuthenitcated:
            return Event.objects.create(user_id=user, **validated_data)
        raise PermissionDenied(
            {"status": HTTP_401_UNAUTHORIZED, "message": "Unauthorized"}
        )

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.start_date = validated_data.get("start_date", instance.start_date)
        instance.end_date = validated_data.get("end_date", instance.end_date)
        instance.description = validated_data.get("description", instance.description)
        user, isAuthenitcated = authenticateUser(self.context["request"])
        if isAuthenitcated:
            instance.save()
            return instance
        raise PermissionDenied(
            {"status": HTTP_401_UNAUTHORIZED, "message": "Unauthorized"}
        )

    def destroy(self, instance):
        user, isAuthenitcated = authenticateUser(self.context["request"])
        if isAuthenitcated:
            instance.delete()
            return {"message": "Deleted!"}
        raise PermissionDenied(
            {"status": HTTP_401_UNAUTHORIZED, "message": "Unauthorized"}
        )
