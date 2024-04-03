from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

class LoginView(APIView):
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