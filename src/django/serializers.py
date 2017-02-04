from rest_framework import serializers
from .models import *

class UserSearchPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserSearchPost
        fields = ('id', 'index', 'isActive', 'age', 'eyeColor', 'name','gender', 'company', 'email', 'phone', 'address', 'favoriteFruit', 'created_at', 'updated_at')