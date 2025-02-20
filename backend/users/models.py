from django.db import models

class College(models.Model):
    name = models.CharField(max_length=500, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} (ID: {self.id})"

    class Meta:
        ordering = ['name']

class Assignment(models.Model):
    college = models.ForeignKey(
        College, 
        on_delete=models.CASCADE, 
        related_name='assignments'
    )
    name = models.CharField(max_length=200)
    pages = models.IntegerField()
    price_per_page = models.DecimalField(max_digits=10, decimal_places=2)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Assignment: {self.name} - College: {self.college.name} (ID: {self.college.id})"

    class Meta:
        ordering = ['-created_at']
        
        
        
class Application(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='applications')
    name = models.CharField(max_length=200)
    contact_type = models.CharField(max_length=20)
    contact_value = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Application by {self.name} for {self.assignment.name}"

    class Meta:
        ordering = ['-created_at']