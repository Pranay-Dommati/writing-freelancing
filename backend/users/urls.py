from django.urls import path
from .views import CollegeSearchView, CollegeDetailView, AssignmentCreateView

urlpatterns = [
    path('search/', CollegeSearchView.as_view(), name='college-search'),
    path('colleges/<int:id>/', CollegeDetailView.as_view(), name='college-detail'),
    path('colleges/<int:college_id>/assignments/', AssignmentCreateView.as_view(), name='assignment-create'),
]