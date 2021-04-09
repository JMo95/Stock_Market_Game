"""from django.shortcuts import render 
from json import dumps
from django import forms

from django.http import HttpResponseRedirect
from django.shortcuts import render"""

import sys
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
    """fields = [["Previous Close"], 
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
              ["Price"]]"""

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

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("ERROR: Expecting 1 command line argument")
        exit()

    calls, puts = scrape_options(sys.argv[1])
    print(calls)
    print(puts)
    #summary = scrape_stock(sys.argv[1])
    #print(summary)