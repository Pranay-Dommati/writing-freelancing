import csv
from django.core.management.base import BaseCommand
from django.db import IntegrityError
from users.models import College

class Command(BaseCommand):
    help = 'Import colleges from CSV file'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing colleges before importing',
        )

    def handle(self, *args, **kwargs):
        csv_file = 'data/merged_colleges.csv'
        
        if kwargs['clear']:
            self.stdout.write('Clearing existing colleges...')
            College.objects.all().delete()
        
        colleges_added = 0
        colleges_skipped = 0
        duplicates = 0
        
        try:
            with open(csv_file, 'r', encoding='utf-8') as file:
                csv_reader = csv.reader(file)
                next(csv_reader, None)  # Skip header if exists
                
                for row in csv_reader:
                    college_name = row[0].strip('"').strip()
                    if college_name:
                        try:
                            College.objects.create(name=college_name)
                            colleges_added += 1
                            self.stdout.write(
                                self.style.SUCCESS(f'Added: {college_name}')
                            )
                        except IntegrityError:
                            duplicates += 1
                            self.stdout.write(
                                self.style.WARNING(f'Duplicate found: {college_name}')
                            )
                        except Exception as e:
                            colleges_skipped += 1
                            self.stdout.write(
                                self.style.ERROR(f'Error with {college_name}: {str(e)}')
                            )

            self.stdout.write(
                self.style.SUCCESS(
                    f'\nSummary:\n'
                    f'Added: {colleges_added} colleges\n'
                    f'Duplicates: {duplicates}\n'
                    f'Skipped: {colleges_skipped}'
                )
            )
        except FileNotFoundError:
            self.stdout.write(
                self.style.ERROR(f'CSV file not found at: {csv_file}')
            )