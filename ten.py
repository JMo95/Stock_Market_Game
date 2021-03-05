import tensorflow as tf

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.layers.experimental import preprocessing

import datetime as dt
import time as t
import numpy as np
import pandas as pd

def main():
    getHistoricalStockPrice("msft")
   
def getHistoricalStockPrice(Symbol):
    end_time = dt.datetime.today()
    start_time = dt.datetime.today() - dt.timedelta(days=365)
   
    start_time_int = int(t.mktime(start_time.timetuple()))
    end_time_int = int(t.mktime(end_time.timetuple()))

    
    stock_url = "https://query1.finance.yahoo.com/v7/finance/download/"+Symbol+"?period1="+str(start_time_int)+"&period2="+str(end_time_int)+"&interval=1d&events=history"
    info = pd.read_csv("MSFT.csv")
    linearRegression(info)
    
    #info = pd.read_csv(stock_url)
    

    
def linearRegression(stock_data):
    stock_data['Date'] = stock_data['Date'].apply(lambda x:int(t.mktime(dt.datetime.strptime(x,"%Y-%m-%d").timetuple()))) # converts dates to interger values
    print(stock_data)
    # if there are unknown values in a row then drop them
    stock_data.dropna()
    
    train_dataset = stock_data.sample(frac=0.8, random_state=0)
    test_dataset = stock_data.drop(train_dataset.index)
    
    train_features = train_dataset.copy()
    test_features = test_dataset.copy()
    
    train_labels = train_features.pop('Open')
    test_labels = test_features.pop('Open')
    
    normalizer = preprocessing.Normalization()
    
    normalizer.adapt(np.array(train_features))
    
    linear_model = tf.keras.Sequential([normalizer,layers.Dense(units=1)])
    
    linear_model.compile(optimizer=tf.optimizers.Adam(learning_rate=0.1),loss='mean_absolute_error')
    
    history = linear_model.fit(train_features, train_labels, epochs=100,verbose=0,validation_split = 0.2)
    
    test_results = {}

    test_results['linear_model'] = linear_model.evaluate(test_features, test_labels, verbose=0)
    
    print(test_results)
    
    
if __name__ == "__main__":
    main()
    
