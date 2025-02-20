from rest_framework import generics, status
from rest_framework.response import Response
from .models import College, Assignment
from .serializers import CollegeSerializer, AssignmentSerializer
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
    
    

class AssignmentCreateView(generics.CreateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

    def create(self, request, *args, **kwargs):
        # Add college_id from URL to the request data
        college_id = kwargs.get('college_id')
        data = {
            **request.data,
            'college': college_id
        }
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)