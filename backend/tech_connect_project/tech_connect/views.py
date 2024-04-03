from django.shortcuts import render
from rest_framework import generics
from .serializers import TechnologySerializer, ExperienceLevelSerializer, JobPostingSerializer
from .models import Technology, ExperienceLevel, JobPosting

# Create your views here.

class TechnologyList(generics.ListCreateAPIView):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer

class TechnologyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer

class ExperienceLevelList(generics.ListCreateAPIView):
    queryset = ExperienceLevel.objects.all()
    serializer_class = ExperienceLevelSerializer

class ExperienceLevelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExperienceLevel.objects.all()
    serializer_class = ExperienceLevelSerializer

class JobPostingList(generics.ListCreateAPIView):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer

class JobPostingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer
