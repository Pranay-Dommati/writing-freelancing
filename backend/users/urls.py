from django.urls import path
from .views import CollegeSearchView

urlpatterns = [
    path('search/', CollegeSearchView.as_view(), name='college-search'),
]