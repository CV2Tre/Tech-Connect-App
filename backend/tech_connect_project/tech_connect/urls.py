from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('technologies/', views.TechnologyList.as_view(), name='technology_list'),
    path('technologies/<int:pk>/', views.TechnologyDetail.as_view(), name='technology_detail'),
    path('experience-levels/', views.ExperienceLevelList.as_view(), name='experience_level_list'),
    path('experience-levels/<int:pk>/', views.ExperienceLevelDetail.as_view(), name='experience_level_detail'),
    path('job-postings/', views.JobPostingList.as_view(), name='job_posting_list'),
    path('job-postings/<int:pk>/', views.JobPostingDetail.as_view(), name='job_posting_detail'),
]