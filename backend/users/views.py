from rest_framework import generics, status
from rest_framework.response import Response
from .models import College, Assignment, Application
from django.core.mail import send_mail
from django.conf import settings
from .serializers import CollegeSerializer, AssignmentSerializer, ApplicationSerializer
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
    

class CollegeAssignmentsView(generics.ListAPIView):
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        college_id = self.kwargs['college_id']
        return Assignment.objects.filter(college_id=college_id).order_by('-created_at')
    
    
    
class ApplicationCreateView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer

    def create(self, request, *args, **kwargs):
        assignment_id = kwargs.get('assignment_id')
        college_id = kwargs.get('college_id')
        
        # Add assignment to request data
        data = {
            **request.data,
            'assignment': assignment_id
        }

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        application = serializer.save()

        # Get assignment details
        assignment = Assignment.objects.get(id=assignment_id)
        
        # Send email to assignment owner
        subject = f'New Application for Your Assignment: {assignment.name}'
        message = f"""
        Hello,

        Someone has applied to write your assignment!

        Assignment Details:
        - Name: {assignment.name}
        - Pages: {assignment.pages}
        - Pay per page: ${assignment.price_per_page}

        Applicant Details:
        - Name: {application.name}
        - Contact via: {application.contact_type}
        - Contact info: {application.contact_value}

        You can connect with them through their provided contact information.

        Best regards,
        Your Writing Platform Team
        """

        try:
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [assignment.email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Error sending email: {e}")
            # Continue even if email fails
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)