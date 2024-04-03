from django.urls import path
from .views import LoginView, ApiRootView,APITest

urlpatterns = [
    path('/', ApiRootView.as_view(), name=''),

    path('/test', APITest.as_view(), name='test'),
    path('/auth', LoginView.as_view(), name='login')
]