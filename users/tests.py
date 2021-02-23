from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from users.models import TrackedStock
import json

class UserTests(TestCase):
    def setUp(self):
        test = 0

    def test_createUserTest(self):
        client = Client()
        res = client.post('/register/', {'user':'usertest', 'passowrd':'hash', 'email':'usertest@gmail.com'})
        User = get_user_model()
        users = User.objects.all().filter(username='usertest')
        self.assertEqual(users[0].username, 'usertest')
        
    def test_DeleteUserTest(self):
        
        client = Client()
        res = client.post('/register/', {'user':'usertest', 'passowrd':'hash', 'email':'usertest@gmail.com'})
        res = client.post('/changeName/', {'user':'usertest' ,'new':'newname'})
        User = get_user_model()
        users = User.objects.all().filter(username='newname')
        self.assertEqual(users[0].username, 'newname')

    def test_ChangeUserTest(self):
        
        client = Client()
        res = client.post('/register/', {'user':'usertest', 'passowrd':'hash', 'email':'usertest@gmail.com'})
        res = client.post('/delete/', {'user':'usertest'})
        User = get_user_model()
        users = User.objects.all().filter(username='usertest')
        self.assertEqual(users.count(), 0)
        
    def test_addStockTest(self):
        User = get_user_model()
        client = Client()
        res = client.post('/register/', {'user':'usertest', 'passowrd':'hash', 'email':'usertest@gmail.com'})
        res = client.post('/addstock/', {'stock':'APL', 'user':'usertest'})
        stock = TrackedStock.objects.all().filter(Symbol='APL')
        self.assertEqual(stock[0].Account, User.objects.all().filter(username='usertest')[0])
        
        
    def test_addMutlipleStockTest(self):
        User = get_user_model()
        client = Client()
        res = client.post('/register/', {'user':'usertest', 'passowrd':'hash', 'email':'usertest@gmail.com'})
        res = client.post('/addstock/', {'stock':'APL', 'user':'usertest'})
        res = client.post('/addstock/', {'stock':'AMZ', 'user':'usertest'})
        res = client.post('/addstock/', {'stock':'GGL', 'user':'usertest'})
        res =  client.get('/getstocks/')
        jsonres = json.loads(res.content)
        self.assertEqual(jsonres[0]['Symbol'], 'APL')
        self.assertEqual(jsonres[1]['Symbol'], 'AMZ')
        self.assertEqual(jsonres[2]['Symbol'], 'GGL')
        
    def test_GetUserInfoTest(self):
        User = get_user_model()
        client = Client()
        res = client.post('/register/', {'user':'usertest', 'passowrd':'hash', 'email':'usertest@gmail.com'})
        res = client.get('/getuser/')
        jsonres = json.loads(res.content)
        self.assertEqual(jsonres, 'APL')
