from django.contrib import admin
from .models import JobPosting, Technology,ExperienceLevel

# Register your models here.

admin.site.register(JobPosting)
admin.site.register(Technology)

admin.site.register(ExperienceLevel)
