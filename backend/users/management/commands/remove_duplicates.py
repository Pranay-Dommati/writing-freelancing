from django.core.management.base import BaseCommand
from users.models import College
from django.db.models import Count

class Command(BaseCommand):
    help = 'Remove duplicate colleges from database while keeping one instance'

    def handle(self, *args, **kwargs):
        self.stdout.write('Checking for duplicates...')
        
        # Find duplicates by name (case-insensitive)
        duplicates = (
            College.objects.values('name')
            .annotate(name_count=Count('name'))
            .filter(name_count__gt=1)
        )
        
        total_duplicates = 0
        removed_count = 0
        
        if duplicates.exists():
            self.stdout.write(self.style.WARNING(f'Found duplicate entries:'))
            
            for duplicate in duplicates:
                name = duplicate['name']
                count = duplicate['name_count']
                total_duplicates += count - 1  # Subtract 1 to keep one instance
                
                # Get all colleges with this name
                colleges = College.objects.filter(name=name).order_by('created_at')
                
                # Keep the first one, delete the rest
                first_college = colleges.first()
                colleges.exclude(id=first_college.id).delete()
                
                removed_count += count - 1
                self.stdout.write(
                    self.style.WARNING(
                        f'Removed {count-1} duplicates of "{name}"'
                    )
                )
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'\nSummary:\n'
                    f'Total duplicates found: {total_duplicates}\n'
                    f'Entries removed: {removed_count}\n'
                    f'Unique colleges remaining: {College.objects.count()}'
                )
            )
        else:
            self.stdout.write(
                self.style.SUCCESS('No duplicates found in the database.')
            )