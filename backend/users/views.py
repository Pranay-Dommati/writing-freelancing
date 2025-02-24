from rest_framework import generics, status
from rest_framework.response import Response
from .models import College, Assignment, Application
from django.core.mail import send_mail
from django.conf import settings
from .serializers import CollegeSerializer, AssignmentSerializer, ApplicationSerializer
from django.db.models import Q
from rest_framework.views import APIView

class CollegeSearchView(generics.ListAPIView):
    serializer_class = CollegeSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        if (query):
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
        confirmation_link = f"http://localhost:3000/confirm-application/{application.token}"
        subject = 'New Application for Your Assignment'
        message = f"""
        Hello,

        Someone has applied for your assignment.

        Please click the link below to navigate to a page where you can confirm or cancel the application:
        {confirmation_link}

        If you confirm, the writer's details will be sent to your email and the assignment will be removed from the website.
        If you cancel, the application will be closed and the assignment will remain active on the website.

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

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
    

class FeedbackView(APIView):
    def post(self, request):
        errors = request.data.get('errors', '')
        suggestions = request.data.get('suggestions', '')
        
        if not errors and not suggestions:
            return Response(
                {'detail': 'Please provide either errors or suggestions'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        subject = 'New Feedback Received'
        message = f"""
        New feedback has been submitted:
        
        Errors Reported:
        {errors}
        
        Suggestions:
        {suggestions}
        """
        
        try:
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
            return Response({'detail': 'Feedback submitted successfully'})
        except Exception as e:
            return Response(
                {'detail': 'Error sending feedback'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ConfirmApplicationView(APIView):
    def get(self, request, token):
        try:
            application = Application.objects.select_related('assignment').get(token=token)
            
            if application.is_confirmed:
                return Response(
                    {"error": "This application has already been processed"},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            return Response({
                "assignment_name": application.assignment.name,
                "is_valid": True
            })
            
        except Application.DoesNotExist:
            return Response(
                {"error": "Invalid or expired token"},
                status=status.HTTP_404_NOT_FOUND
            )

    def post(self, request, token):
        try:
            application = Application.objects.select_related('assignment').get(token=token)
            
            if application.is_confirmed:
                return Response(
                    {"error": "This application has already been processed"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            action = request.data.get('action')
            
            if action == 'confirm':
                # Mark as confirmed
                application.is_confirmed = True
                application.save()
                
                # Remove assignment from website
                application.assignment.is_active = False
                application.assignment.save()
                
                # Send email with writer's details
                subject = 'Writer Details for Your Assignment'
                message = f"""
                Hello,

                Here are the details of the writer who applied for your assignment:

                Name: {application.name}
                Contact Method: {application.contact_type}
                Contact Details: {application.contact_value}

                Best regards,
                Your Writing Platform Team
                """
                
                send_mail(
                    subject,
                    message,
                    settings.EMAIL_HOST_USER,
                    [application.assignment.email],
                    fail_silently=False,
                )
                
                return Response({"message": "Application confirmed successfully"})
                
            elif action == 'cancel':
                # Just expire the token
                application.token = None
                application.save()
                return Response({"message": "Application cancelled successfully"})
                
            return Response(
                {"error": "Invalid action"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except Application.DoesNotExist:
            return Response(
                {"error": "Invalid or expired token"},
                status=status.HTTP_404_NOT_FOUND
            )