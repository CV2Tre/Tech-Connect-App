from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


class LoginView(APIView):
    def get(self, request):
        # Add the GET method to handle requests to the login endpoint
        return Response({'message': 'GET request received at the login endpoint'})

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=401)
class ApiRootView(APIView):
    def get(self, request):
        return Response({'message': 'Welcome to the API root'})

class APITest(APIView):
    def get(self, request):
        return Response({'message': 'This is a test API endpoint'})

class CSRFTokenView(APIView):
    def get(self, request):
        return Response({'csrfToken': get_token(request)})


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_data = {
            'username': user.username,
            'email': user.email,
            # Add any other user profile information you want to return
        }
        return Response(user_data)
    

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Handles the token obtain pair functionality.
    """
    pass

class CustomTokenRefreshView(TokenRefreshView):
    """
    Handles the token refresh functionality.
    """
    pass