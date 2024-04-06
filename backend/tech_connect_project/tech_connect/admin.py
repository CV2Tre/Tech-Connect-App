from django.contrib import admin
from .models import JobPosting, Technology,ExperienceLevel,Category 

# Register your models here.

admin.site.register(JobPosting)
admin.site.register(Technology)
admin.site.register(Category)

admin.site.register(ExperienceLevel)
