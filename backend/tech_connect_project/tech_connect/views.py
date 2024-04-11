from django.http import Http404
from rest_framework import generics, status,viewsets
from rest_framework.response import Response
from .models import Technology, ExperienceLevel, JobPosting, Category
from .serializers import TechnologySerializer, ExperienceLevelSerializer, JobPostingSerializer, CategorySerializer

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

    def get_object(self):
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        obj = queryset.filter(id=self.kwargs['pk']).first()
        if not obj:
            raise Http404("JobPosting does not exist")
        self.check_object_permissions(self.request, obj)
        return obj
    
    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"detail": "JobPosting deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Http404:
            return Response({"detail": "JobPosting does not exist"}, status=status.HTTP_404_NOT_FOUND)

    def perform_destroy(self, instance):
        instance.delete()

class JobPostingViewSet(viewsets.ModelViewSet):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer

class ExperienceLevelViewSet(viewsets.ModelViewSet):
    queryset = ExperienceLevel.objects.all()
    serializer_class = ExperienceLevelSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_object(self):
        queryset = self.get_queryset()
        obj = queryset.filter(pk=self.kwargs['pk']).first()
        if not obj:
            raise Http404("Category does not exist")
        return obj
