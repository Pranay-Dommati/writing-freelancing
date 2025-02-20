from rest_framework import serializers
from .models import College, Assignment

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ['id', 'name']
        

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'name', 'pages', 'price_per_page', 'email', 'college', 'created_at']