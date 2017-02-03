from rest_framework import serializers
from .models import *

class JobPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobPost
        fields = ('id', 'index', 'isActive', 'age', 'eyeColor', 'name','gender', 'company', 'email', 'phone', 'address', 'favoriteFruit', 'created_at', 'updated_at')