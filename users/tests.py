from django.test import TestCase, Client
from django.http import HttpResponse
from django.contrib.auth.models import User
from users.models import TrackedStock
from users.models import Investor
from users.models import FakeStock
from users.models import LimitOrders
from users.models import Option

class UserTests(TestCase):
    def setUp(self):
        test = 0

    def test_Stock(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        res = client.post('/addstock/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser'})
        
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('Quantity')[0]["Quantity"], 10)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],100000-(FakeStock.objects.filter(Symbol='APL').values("Price")[0]["Price"])*10)
        
        res = client.post('/sellStock/',{'Quantity': '11', 'stock': 'APL', 'user': 'testuser'})
        
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('Quantity')[0]["Quantity"], 10)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],100000-(FakeStock.objects.filter(Symbol='APL').values("Price")[0]["Price"])*10)
        self.assertEqual(res.content, HttpResponse("you don't own enough stock").content)
        
        res = client.post('/sellStock/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser'})
        
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').count(), 0)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],100000)
        
    def test_Stock_Invaild(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        res = client.post('/addstock/',{'Quantity': '10000', 'stock': 'APL', 'user': 'testuser'})
        
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').count(), 0)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],100000)
        self.assertEqual(res.content, HttpResponse("not enough money").content)
        
        res = client.post('/sellStock/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser'})
        
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').count(), 0)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],100000)
        self.assertEqual(res.content, HttpResponse("you don't that stock").content)
        

    def test_Stock_Limit(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        res = client.post('/buyStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '100', 'Stop': '0', 'Type': 'BL'})
        
        self.assertEqual(LimitOrders.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('Quantity')[0]["Quantity"], 10)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],99000)
        
        res = client.post('/cancelStockLimit/',{ 'user': 'testuser' , 'id' : LimitOrders.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('id')[0]["id"]})
        
        self.assertEqual(LimitOrders.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').count(), 0)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],100000)
        self.assertEqual(res.content, HttpResponse("cancel buy order").content)           
        
        res = client.post('/addstock/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser'})
        
        res = client.post('/sellStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '100', 'Stop': '0', 'Type': 'SL'})
        
        self.assertEqual(LimitOrders.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('Quantity')[0]["Quantity"], 10)
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').count(), 0)
        
        res = client.post('/cancelStockLimit/',{ 'user': 'testuser' , 'id' : LimitOrders.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('id')[0]["id"]})
                                                                                                        
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('Quantity')[0]["Quantity"], 10)
        
        
        
    def test_Stock_Limit(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        res = client.post('/buyStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '100', 'Stop': '0', 'Type': 'BL'})
        
        FakeStock.objects.filter(Symbol='APL').update(Price=90)
        
        res = client.get('/test/')
        
        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0]).count(),0)
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('Quantity')[0]["Quantity"], 10)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],99100)
        
        
    def test_Stock_Limit_stop(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        res = client.post('/buyStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '110', 'Stop': '100', 'Type': 'BSL'})
        
        FakeStock.objects.filter(Symbol='APL').update(Price=105)
        
        res = client.get('/test/')
        
        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0]).count(),0)
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('Quantity')[0]["Quantity"], 10)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],98950)
        
        
    def test_Stock_Limit_Stop_under(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        res = client.post('/buyStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '110', 'Stop': '100', 'Type': 'BSL'})
        
        FakeStock.objects.filter(Symbol='APL').update(Price=120)
        
        res = client.get('/test/')
        
        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0],Type='BL').count(),1)
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').count(), 0)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],98900)
        
        
    def test_Stock_Limit_Smartekt(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        res = client.post('/buyStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '100', 'Stop': '0', 'Type': 'BSM'})
        
        FakeStock.objects.filter(Symbol='APL').update(Price=120)
        
        res = client.get('/test/')
        
        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0]).count(),0)
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('Quantity')[0]["Quantity"], 10)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],98800)
        
    def test_Stock_Stop_Precent(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        res = client.post('/buyStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '10', 'Stop': '0', 'Type': 'BTP'})
        
        FakeStock.objects.filter(Symbol='APL').update(Price=100)
        
        res = client.get('/test/')
        
        FakeStock.objects.filter(Symbol='APL').update(Price=110)
        
        res = client.get('/test/')
        
        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0]).count(),0)
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('Quantity')[0]["Quantity"], 10)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],98900)
        
        
    def test_Stock_Stop_Dollar(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        res = client.post('/buyStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '15', 'Stop': '0', 'Type': 'BTD'})

        FakeStock.objects.filter(Symbol='APL').update(Price=100)

        res = client.get('/test/')

        FakeStock.objects.filter(Symbol='APL').update(Price=120)

        res = client.get('/test/')

        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0]).count(),0)
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').values('Quantity')[0]["Quantity"], 10)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],98800)
        
    def test_Stock_Sell_limit(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        
        
        FakeStock.objects.filter(Symbol='APL').update(Price=100)
        res = client.post('/addstock/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser'})
        
        FakeStock.objects.filter(Symbol='APL').update(Price=120)
        res = client.post('/sellStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '120', 'Stop': '0', 'Type': 'SL'})

        

        res = client.get('/test/')
        

        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0]).count(),0)
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').count(),0)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],100200)

        
        
    def test_Stock_Sell_Slimit(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        
        
        FakeStock.objects.filter(Symbol='APL').update(Price=100)
        res = client.post('/addstock/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser'})
        
        FakeStock.objects.filter(Symbol='APL').update(Price=90)
        res = client.post('/sellStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '80', 'Stop': '100', 'Type': 'SSL'})

        

        res = client.get('/test/')
        

        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0]).count(),0)
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').count(),0)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],99900)
        
        
    def test_Stock_Sell_Sllimit(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        
        
        FakeStock.objects.filter(Symbol='APL').update(Price=100)
        res = client.post('/addstock/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser'})
        
        FakeStock.objects.filter(Symbol='APL').update(Price=80)
        res = client.post('/sellStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '85', 'Stop': '90', 'Type': 'SSL'})

        

        res = client.get('/test/')
        

        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0],Type='SL').count(),1)
        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0],Type='SSL').count(),0)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],99000)
        
        
    def test_Stock_Sell_SMlimit(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        
        
        FakeStock.objects.filter(Symbol='APL').update(Price=100)
        res = client.post('/addstock/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser'})
        
        FakeStock.objects.filter(Symbol='APL').update(Price=50)
        res = client.post('/sellStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '0', 'Stop': '100', 'Type': 'SSM'})

        

        res = client.get('/test/')
        

        self.assertEqual(LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0]).count(),0)
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').count(),0)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],99500)
        
        
        
    def test_Stock_Sell_STlimit(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        
        
        FakeStock.objects.filter(Symbol='APL').update(Price=100)
        res = client.post('/addstock/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser'})
        
        res = client.post('/sellStockLimit/',{'Quantity': '10', 'stock': 'APL', 'user': 'testuser' , 'price': '10', 'Stop': '0', 'Type': 'STP'})

        
        res = client.get('/test/')
        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0]).count(),1)
        FakeStock.objects.filter(Symbol='APL').update(Price=90)
        res = client.get('/test/')
        
        self.assertEqual( LimitOrders.objects.filter(Symbol='APL',Account=User.objects.filter(username='testuser')[0]).count(),0)
        self.assertEqual(TrackedStock.objects.filter(Account=User.objects.filter(username='testuser')[0],Symbol='APL').count(),0)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],99900)
        
    def test_Stock_Buy_option_call(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        
        
        
        res = client.post('/BuyOption/',{'user': 'testuser', 'Symbol': 'APL', 'Strike': '110', 'ExperationDate': '2012-09-04T05:00:00Z', 'type': 'call', 'Quantity': '1'})
        
        
        self.assertEqual(Option.objects.filter(Symbol='APL',holder=True,Type='call',Account=User.objects.filter(username='testuser')[0]).count(),1)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],100000-12150)
        
        
    def test_Stock_Buy_option_put(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        
        
        
        res = client.post('/BuyOption/',{'user': 'testuser', 'Symbol': 'APL', 'Strike': '110', 'ExperationDate': '2012-09-04T05:00:00Z', 'type': 'put', 'Quantity': '1'})
        
        
        self.assertEqual(Option.objects.filter(Symbol='APL',holder=True,Type='put',Account=User.objects.filter(username='testuser')[0]).count(),1)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],100000-1150)
    
    
    def test_Stock_Sell_option_call(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        
        FakeStock.objects.filter(Symbol='APL').update(Price=100)
        
        res = client.post('/SellOption/',{'user': 'testuser', 'Symbol': 'APL', 'Strike': '110', 'ExperationDate': '2012-09-04T05:00:00Z', 'type': 'call', 'Quantity': '1'})
        
        
        self.assertEqual(Option.objects.filter(Symbol='APL',holder=False,Type='call',Account=User.objects.filter(username='testuser')[0]).count(),1)
        
    
    def test_Stock_Sell_option_put(self):
        client = Client()
        res = client.post('/register/',{'user': 'testuser', 'email': 'testuser@test.com', 'password': 'test1234'})
        
        
        
        res = client.post('/SellOption/',{'user': 'testuser', 'Symbol': 'APL', 'Strike': '110', 'ExperationDate': '2012-09-04T05:00:00Z', 'type': 'put', 'Quantity': '1'})
        
        
        self.assertEqual(Option.objects.filter(Symbol='APL',holder=False,Type='put',Account=User.objects.filter(username='testuser')[0]).count(),1)
        self.assertEqual(Investor.objects.filter(user=User.objects.filter(username='testuser')[0]).values('money')[0]["money"],100000-11000)
    
        
        
        
    