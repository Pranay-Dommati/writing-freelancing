from django.urls import path
from .views import CollegeSearchView, CollegeDetailView

urlpatterns = [
    path('search/', CollegeSearchView.as_view(), name='college-search'),
    path('colleges/<int:id>/', CollegeDetailView.as_view(), name='college-detail'),
]