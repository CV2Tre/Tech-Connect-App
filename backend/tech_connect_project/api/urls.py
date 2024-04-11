from django.urls import path
from .views import (
    LoginView, ApiRootView, APITest, CSRFTokenView, UserProfileView,
    CustomTokenObtainPairView, CustomTokenRefreshView,
)

urlpatterns = [
    path('', ApiRootView.as_view(), name='api-root'),
    path('test/', APITest.as_view(), name='api-test'),
    path('login/', LoginView.as_view(), name='api-login'),
    path('csrf-token/', CSRFTokenView.as_view(), name='api-csrf-token'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]