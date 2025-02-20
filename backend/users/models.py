from django.db import models

class College(models.Model):
    name = models.CharField(max_length=500, unique=True, db_index=True)  # Added db_index=True
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']