from django.test import TestCase, Client
from django.contrib.auth import get_user_model

class UserTests(TestCase):
    def setUp(self):
        test = 0

    def test_createUserTest(self):
        client = Client()
        res = client.post('/register/', {'user':'usertest', 'passowrd':'hash', 'email':'usertest@gmail.com'})
        User = get_user_model()
        users = User.objects.all().filter(username='usertest')
        self.assertEqual(users[0].username, 'usertest')
