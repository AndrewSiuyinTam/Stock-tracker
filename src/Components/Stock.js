import React from "react";
import { Component } from 'react';
import Plot from 'react-plotly.js';
import  APIsearch  from "./APIsearch";
import axios from 'axios';

export class Stock extends Component{

    state = {
        loading:true,
        stock:'MSFT',
        time_intervals: [],
        stock_prices: [],
        interval: '&interval=',
        time_interval: '5min',
        api_type: 'TIME_SERIES_INTRADAY'

    }

    // Todo: Display price information in table,allow user to search for ticker Symbol,
    // allow user to toggle between different time intervals
    async componentDidMount(){ // fetch the data in this function
        // let stockTicker = 'TSLA';
        this.apiCall(this.state.stock) // user search input should be used as parameter here
}
 api = (event) => {
    
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log(event.target.value);
    
    const url =`https://www.alphavantage.co/query?function=${this.state.api_type}&symbol=${event.target.value}${this.state.interval}${this.state.time_interval}&apikey=ATJGLZRV3VLJ0OVK`;
    axios.get(url).then((response) => {
        const data = response.data;
        console.log(this.state.time_interval);
        const stockTicker = data['Meta Data']['2. Symbol'];
        let ts_5 = '';
        if(this.state.api_type === 'TIME_SERIES_DAILY '){
            ts_5 = data['Time Series (Daily)'];
        }
        else if(this.state.api_type === 'TIME_SERIES_INTRADAY'){
            ts_5 = data[`Time Series (${this.state.time_interval})`];
        }
        else if(this.state.api_type === 'TIME_SERIES_WEEKLY'){
            ts_5 = data['Weekly Time Series']
        }
        else if(this.state.api_type === 'TIME_SERIES_MONTHLY'){
            ts_5 = data['Monthly Time Series']
        }

        // const ts_5 = data[`Time Series (${this.state.time_interval})`];
        let prices_arr = [];
        let times_arr = [];
        for(const key in ts_5){
           const times = key; // we wanty to extract the time, line up x and y values, and change state for different time intervals
        //    console.log(times);
           const prices =  ts_5[key]['1. open'];
           times_arr.push(times)
           prices_arr.push(prices);
        }
        // console.log(ts_5);
        // console.log(times_arr);
        this.setState({loading:false,
             stock: stockTicker,
             time_intervals:times_arr,
             stock_prices:prices_arr});
    })
        // const response = await fetch(url);
        // const data = await response.json();
}   
}
    async apiCall (ticker) { // conditionally render a ticker based on user input
    // const tick = 'AAPL';
    const time = this.state.time_interval;
    const url =`https://www.alphavantage.co/query?function=${this.state.api_type}&symbol=${ticker}${this.state.interval}${this.state.time_interval}&apikey=ATJGLZRV3VLJ0OVK`;
        console.log(this.state.time_interval);
        const response = await fetch(url);
        const data = await response.json();
        const stockTicker = data['Meta Data']['2. Symbol'];
        // console.log(stockTicker);
        const ts_5 = data[`Time Series (${time})`];
        let prices_arr = [];
        let times_arr = [];
        for(const key in ts_5){
           const times = key; // we wanty to extract the time, line up x and y values, and change state for different time intervals
        //    console.log(times);
           const prices =  ts_5[key]['1. open'];
           times_arr.push(times)
           prices_arr.push(prices);
        }
        // console.log(ts_5);
        // console.log(times_arr);
        this.setState({loading:false,
             stock: stockTicker,
             time_intervals:times_arr,
             stock_prices:prices_arr});
}
testfunction = (event) => {
    event.preventDefault();
    this.setState({
        stock: 'META'
    })
    this.componentDidMount();
    
}
    render(){ // render before fetch
        return(
            <div>
                {this.state.loading 
                ? <div>
                    loading...
                    </div> : 
                <div>
                    <div> 
                        <div className="flex gap-3 text-white "> 
                        <button className="border-2 border-green-300 rounded bg-green-600 hover:bg-emerald-600 active:bg-violet-700" onClick={()=> { //buttons to toggle time intervals
                            this.setState({
                                interval:'&interval=',
                                time_interval: '5min'   ,
                                api_type: 'TIME_SERIES_INTRADAY'       
                            })
                            this.apiCall(this.state.ticker);
                        }}>
                            5 mins
                            </button>
                        <button className="border-2 border-green-300 rounded bg-green-600 hover:bg-emerald-600 active:bg-violet-700" onClick={()=> { //buttons to toggle time intervals
                            this.setState({
                                interval:' &interval=',
                                time_interval: '15min'  ,
                                api_type: 'TIME_SERIES_INTRADAY'        
                            })
                            this.apiCall(this.state.ticker);
                        }}>
                            15 mins
                            </button>
                            <button className="border-2 border-green-300 rounded bg-green-600 hover:bg-emerald-600 active:bg-violet-700" onClick={()=> {
                            this.setState({
                                interval: '&interval=',
                                time_interval: '30min'     ,
                                api_type: 'TIME_SERIES_INTRADAY'     
                            })
                        }}>
                            30 mins
                            </button>
                            <button className="border-2 border-green-300 rounded bg-green-600 hover:bg-emerald-600 active:bg-violet-700" onClick={()=> {
                            this.setState({
                                interval: '&interval=',
                                time_interval: '60min'       ,
                                api_type:'TIME_SERIES_INTRADAY'   
                            })
                        }}>
                            60 mins
                            </button>
                            <button className="border-2 border-green-300 rounded bg-green-600 hover:bg-emerald-600 active:bg-violet-700" onClick={()=> { //buttons to toggle time intervals
                            this.setState({
                                interval:'',
                                time_interval: '' ,
                                api_type:'TIME_SERIES_DAILY'         
                            })
                        }}>
                            Daily
                            </button>
                            <button className="border-2 border-green-300 rounded bg-green-600 hover:bg-emerald-600 active:bg-violet-700" onClick={()=> { //buttons to toggle time intervals
                            this.setState({
                                interval:'',
                                time_interval: '' ,
                                api_type: 'TIME_SERIES_WEEKLY'         
                            })
                        }}>
                            Weekly
                            </button>
                            <button className="border-2 border-green-300 rounded bg-green-600 hover:bg-emerald-600" onClick={()=> { //buttons to toggle time intervals
                            this.setState({
                                interval: '',
                                time_interval: ''  ,
                                api_type: 'TIME_SERIES_MONTHLY'        
                            })
                        }}>
                            Monthly
                            </button>
                            </div>

                        {/* Render Search for API */}
                        <form className="flex float-right">
                        <input 
                        className="border-2" 
                        // value={this.state.stock}
                        placeholder = "Enter a ticker..." 

                        // onKeyDown = {event => {
                        //     if(event.key === 13){
                        //         this.setState({stock: event.target.value});
                        // }}}
                        onKeyPress={this.api}
                    name="search"
                    
                    // onKeyPress={
                    //     event => this.setState({
                    //         stock: event.target.value
                    //     })
                        

                    // }
                    
                    type="text" 
                     />
                        <button type="submit" 
                        className="text-white a bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Search
                        </button>
                    
                    </form>

         <Plot
        data={[
          {
            x: [],
            y: this.state.stock_prices,
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'red'},
          },
          {type: '', x: this.state.time_intervals, y: this.state.stock_prices},
        ]}
        
        layout={ {width: 1350, height: 600, title: this.state.stock, titlefont: 'Courier New',
            xaxis: {
                title: {
                text: this.state.time_interval,
                font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
              }
            },

            yaxis: {
                title: {
                  text: 'Stock Price (USD)',
                  font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                  }
                },
              },
              
          },} }
      />
                    </div>
                    </div>
                    }
            </div>

        )
    }
}