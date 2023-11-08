from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Event

class EventViewSetTests(APITestCase):
    def setUp(self):
        self.superuser = User.objects.create_superuser(username='adminTest', password='azerty123456', email='admintest@test.com')

        # Create and obtain a valid JWT token
        refresh = RefreshToken.for_user(self.superuser)
        self.access_token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

        self.event_data = {
            'title': 'Test Event Title',
            'start_date': '2023-10-30T12:00:00Z',
            'end_date': '2023-10-31T12:00:00Z',
            'description': 'Test Event Description'
        }

        self.test_event = Event.objects.create(user_id=self.superuser, **self.event_data)

    def test_list_events(self):
        response = self.client.get('/Events/')  # Use the correct URL

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertGreater(len(response.data), 0)
        
    def test_create_event_authenticated_user(self):
        response = self.client.post('/Events/', self.event_data, format='json')  # Use the correct URL

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(Event.objects.count(), 2)

        self.assertEqual(Event.objects.last().description, 'Test Event Description')

    def test_retrieve_event(self):
        response = self.client.get(f'/Events/{self.test_event.id}/')  # Use the correct URL

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data['description'], 'Test Event Description')

    def test_partial_update_event_authenticated_user(self):
        updated_data = {'description': 'Updated Test Event Description'}
        response = self.client.patch(f'/Events/{self.test_event.id}/', updated_data, format='json')  # Use the correct URL

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.test_event.refresh_from_db()
        self.assertEqual(self.test_event.description, 'Updated Test Event Description')

    def test_destroy_event_authenticated_user(self):
        response = self.client.delete(f'/Events/{self.test_event.id}/')  # Use the correct URL

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        with self.assertRaises(Event.DoesNotExist):
            Event.objects.get(id=self.test_event.id)

    def test_destroy_events_nonexistent(self):
        response = self.client.delete('/Events/9999/')  # Use the correct URL

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
