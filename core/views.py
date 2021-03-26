from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from . serializer import *
# Create your views here. 

class ReactView(APIView): 
	
	serializer_class = ReactSerializer 

	def get(self, request): 
		detail = [ {"name": detail.name,"detail": detail.detail} 
		for detail in React.objects.all()] 
		return Response(detail) 

	def post(self, request): 

		serializer = ReactSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			return Response(serializer.data) 

class PullStockView(APIView): 
	
	serializer_class = PullStockSerializer 

	def load_elements(self):
		detail = [ {"name": detail.stock_name, "market_cap": scrape_stock(detail.stock_name)[4]} 
		for detail in PullStock.objects.all()]
		return detail

	def get(self, request):
		return Response(self.load_elements()) 
		#return Response(detail)

	def post(self, request): 
		serializer = PullStockSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save()
			return Response(self.load_elements())
			#return Response(serializer.data) 

	def put(self, request):
		serializer = PullStockSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save() 
			stk_name = serializer.data['stock_name']
			for detail in PullStock.objects.all()[:PullStock.objects.count()-1]:
				if detail.stock_name == stk_name:
					detail.delete()
					break
			return Response(self.load_elements())
			#return Response(serializer.data)

	def delete(self, request):
		PullStock.objects.all().delete()
		return Response(self.load_elements())
		#return Response(detail)

	#line below kept for future use
	#PullStock.objects.filter(id=id).delete()

import re

import requests
from bs4 import BeautifulSoup

def refine_values(summary):
    important_stats = []
    for i in [6,7,8,10,-1]:
        important_stats.append(summary[i])

    hold_range = summary[4][1].split(' ')
    important_stats.insert(0, ['Daily High', hold_range[2]])
    important_stats.insert(0, ['Daily Low', hold_range[0]])
    return important_stats

def scrape_stock(abbr):
    URL = "https://finance.yahoo.com/quote/" + abbr + "?p=" + abbr #link to stock info
    page = requests.get(URL) #scrape URL
    soup = BeautifulSoup(page.content, 'html.parser') #set up parser
    
    results = soup.find(id="quote-summary") #narrow scrape to class quote-summary
    price_find = soup.find(class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")
    #pre-defined field
    #fields stores summary info
    #narrows search further
    try:
        value_elems = results.find_all('td', class_='Ta(end) Fw(600) Lh(14px)')
    except:
        return [[None, "ERROR"], [None, "ERROR"], [None, "ERROR"], [None, "ERROR"], [None, "ERROR"], [None, "ERROR"], [None, "ERROR"]]

    fields = [["Previous Close"], 
              ["Open"],
              ["Bid"],
              ["Ask"],
              ["Day's Range"],
              ["52 Week Range"],
              ["Volume"],
              ["Avg. Volume"],
              ["Market Cap"],
              ["Beta (5Y Monthly)"],
              ["PE Ratio (TTM)"],
              ["EPS (TTM)"],
              ["Earnings Date"],
              ["Forward Dividend & Yield"],
              ["Ex-Dividend Date"],
              ["1y Target Est"],
              ["Price"]]

    i=0
    for value_elem in value_elems: #loops through classes containing important info
        value = "" #initialize string to hold value
        line = re.split('>|<|\n',str(value_elem))

        #pinpointing where on line the index(es) is located
        if len(line) == 5:
            indexes = [-3]
        elif len(line) == 9:
            indexes = [-5]
        elif len(line) == 17:
            indexes = [-13,-9,-5]

        for k in indexes: #loops through every needed index
            value = value + re.split('>|<|\n',str(value_elem))[k]
        fields[i].append(value)
        i+=1

    fields[-1].append(re.split('>|<|\n',str(price_find))[-3])

    return refine_values(fields)