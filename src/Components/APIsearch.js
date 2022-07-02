import React from "react";
import { Component } from 'react';

export default class APIsearch extends Component{
    state = {
        ticker: ''
    };
    onSearchChange = e => {
        this.setState({
            ticker: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSearch(this.query.value);
        e.currentTarget.reset();
    }
    
   
    render(){
        return(
            <form className="flex float-right" onSubmit={this.handleSubmit}>
                        <input type="search"
                        className="border-2" 
                        placeholder = "Enter a ticker..." 
                    onChange={this.onSearchChange}
                    name="search"
                    ref={(input) => this.query = input}
                     />
                        
                        <button type="submit" 
                        className="text-white a bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Search
                        </button>
                    
                    </form>

        )
        
    }

}
