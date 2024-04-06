from django.db import models

class Technology(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class ExperienceLevel(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class JobPosting(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    title = models.CharField(max_length=100)
    description = models.TextField()
    company_name = models.CharField(max_length=100)
    job_type = models.CharField(max_length=100)
    experience_levels = models.ManyToManyField(ExperienceLevel, blank=True)
    salary_range = models.CharField(max_length=100)
    posted_date = models.DateField()
    categories = models.ManyToManyField(Category, blank=True)
    technologies = models.ManyToManyField(Technology, blank=True)

    def __str__(self):
        return self.title