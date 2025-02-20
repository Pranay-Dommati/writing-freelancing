from rest_framework import serializers
from .models import College, Assignment, Application

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ['id', 'name']
        

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'name', 'pages', 'price_per_page', 'email', 'college', 'created_at']
        
        
        
class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'assignment', 'name', 'contact_type', 'contact_value', 'created_at']