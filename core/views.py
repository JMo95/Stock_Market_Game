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
		details = []
		for detail in PullStock.objects.all():
			stock_details = scrape_stock(detail.stock_name)
			details.append({"Name": detail.stock_name, "Daily Low": stock_details[0], "Daily High": stock_details[1], "Volume": stock_details[2], "Avg. Volume": stock_details[3], 
			"Market Cap": stock_details[4], "PE Ratio (TTM)": stock_details[5], "Price": stock_details[6]})

		"""detail = [ {"name": detail.stock_name, "elements": scrape_stock(detail.stock_name)} 
		for detail in PullStock.objects.all()]
		print(detail)"""
		# Daily Low, Daily High, Volume, Avg. Volume, Market Cap, PE Ratio (TTM), Price
		return details

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

class OptionsView(APIView):

	serializer_class = OptionsSerializer 

	def load_elements(self, stk_name):
		details = []
		calls, puts = scrape_options(stk_name)
		if calls:
			for c in calls:
				details.append({"Type": 'Call', "Name": c[0], "Last Trade Date": c[1], "Strike": c[2], "Last Price": c[3], "Bid": c[4], "Ask": c[5], "% Change": c[6], "Volume": c[7], 
				"Open Interest": c[8], "Implied Volatility": c[9]})
		if puts:
			for p in puts:
				details.append({"Type": 'Put', "Name": c[0], "Last Trade Date": p[1], "Strike": p[2], "Last Price": p[3], "Bid": p[4], "Ask": p[5], "% Change": p[6], "Volume": p[7], 
				"Open Interest": p[8], "Implied Volatility": p[9]})

		return details

	def get(self, request):
		return Response(self.load_elements('CLOV')) 
		#return Response(detail)

	def post(self, request): 
		serializer = OptionsSerializer(data=request.data) 
		if serializer.is_valid(raise_exception=True): 
			serializer.save()
			return Response(self.load_elements(serializer.data['stock_name']))

	def delete(self, request):
		Options.objects.all().delete()
		return Response(self.load_elements('CLOV'))
		#return Response(detail)

import re

import requests
from bs4 import BeautifulSoup

def refine_values(summary):
    important_stats = []
    for i in [6,7,8,10,-1]:
        important_stats.append(summary[i])

    hold_range = summary[4].split(' ')
    important_stats.insert(0, hold_range[2])
    important_stats.insert(0, hold_range[0])
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
        return ["ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR"]

    fields = []

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
        fields.append(value)
        i+=1

    fields.append(re.split('>|<|\n',str(price_find))[-3])

    return refine_values(fields)

def scrape_help(soup, back_text):
    contracts = []
    i=0
    while True:
        if soup.find('tr', class_='data-row' + str(i) + back_text):
            contracts.append(soup.find('tr', class_='data-row' + str(i) + back_text))
        else:
            break
        i+=1

    divided_options = []
    for con in contracts:
        divided_options.append([])
        for c in con:
            divided_options[-1].append(c.text)
    return divided_options

def scrape_options(abbr):
    URL = "https://finance.yahoo.com/quote/" + abbr + "/options?p=" + abbr #link to stock info
    page = requests.get(URL) #scrape URL
    soup = BeautifulSoup(page.content, 'html.parser') #set up parser

    calls = scrape_help(soup, ' Bgc($hoverBgColor):h BdT Bdc($seperatorColor) H(33px) in-the-money Bgc($hoverBgColor)')
    puts = scrape_help(soup, ' Bgc($hoverBgColor):h BdT Bdc($seperatorColor) H(33px)')

    if not calls and not puts:
        return None, None

    return calls, puts