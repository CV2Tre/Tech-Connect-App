from rest_framework import serializers
from .models import JobPosting, Technology, ExperienceLevel, Category

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id', 'name']

class ExperienceLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceLevel
        fields = ['id', 'name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class JobPostingSerializer(serializers.ModelSerializer):
    experience_levels = ExperienceLevelSerializer(many=True, read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = JobPosting
        fields = ['id', 'title', 'description', 'company_name', 'job_type', 'experience_levels', 'salary_range', 'posted_date', 'categories', 'technologies']