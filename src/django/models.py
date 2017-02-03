from __future__ import unicode_literals
from django.db import models




class JobPost(models.Model):
    index = models.IntegerField(blank=True, null=True)
    isActive = models.BooleanField(default=True, blank=True)
    age = models.IntegerField(max_length=240, blank=True, null=True)
    eyeColor = models.CharField(max_length=240, blank=True, null=True)
    name = models.CharField(max_length=240, blank=True, null=True)
    gender = models.CharField(max_length=240, blank=True, null=True)
    company = models.CharField(max_length=480, blank=True, null=True)
    email = models.CharField(max_length=480, blank=True, null=True)
    phone = models.CharField(max_length=480, blank=True, null=True)
    address = models.CharField(max_length=480, blank=True, null=True)
    favoriteFruit = models.CharField(max_length=120, blank=True, null=True)
    created_at = models.DateTimeField(db_index=True, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']


