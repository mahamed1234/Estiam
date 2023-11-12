from django.urls import include, path

from rest_framework import routers
from eventproject.users.views import UserViewSet,CustomTokenObtainPairView

from eventproject.events import views as events_views
from django.contrib import admin
from drf_yasg.views import get_schema_view
from drf_yasg import openapi



from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

schema_view = get_schema_view(
    openapi.Info(title="ESTIAM API", default_version="v1"),
    public=True,
)
router = routers.DefaultRouter()

router.register(r"Events", events_views.EventViewSet, basename="Event")
router.register(r"users", UserViewSet)


# Wire up our API using automatic URL routing.

# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
]
