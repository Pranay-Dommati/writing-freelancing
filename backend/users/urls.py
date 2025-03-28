from django.urls import path
from .views import CollegeSearchView, CollegeDetailView, AssignmentCreateView, \
            CollegeAssignmentsView, ApplicationCreateView, FeedbackView, ConfirmApplicationView, \
            CollegeRequestView

urlpatterns = [
    path('search/', CollegeSearchView.as_view(), name='college-search'),
    path('colleges/<int:id>/', CollegeDetailView.as_view(), name='college-detail'),
    path('colleges/<int:college_id>/assignments/', AssignmentCreateView.as_view(), name='assignment-create'),
    path('colleges/<int:college_id>/assignments/list/', CollegeAssignmentsView.as_view(), name='college-assignments'),
    path('colleges/<int:college_id>/assignments/<int:assignment_id>/apply/', 
         ApplicationCreateView.as_view(), 
         name='application-create'),
    path('feedback/', FeedbackView.as_view(), name='feedback'),
    path('confirm-application/<str:token>/', ConfirmApplicationView.as_view(), name='confirm-application'),
    path('send-college-request/', CollegeRequestView.as_view(), name='send-college-request'),
]