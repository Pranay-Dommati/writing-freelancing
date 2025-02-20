from rest_framework import generics
from rest_framework.response import Response
from .models import College
from .serializers import CollegeSerializer
from django.db.models import Q

class CollegeSearchView(generics.ListAPIView):
    serializer_class = CollegeSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        if query:
            return College.objects.filter(
                name__icontains=query
            ).order_by('name')[:10]  # Limit to 10 results
        return College.objects.none()
    
    
    
class CollegeDetailView(generics.RetrieveAPIView):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer
    lookup_field = 'id'