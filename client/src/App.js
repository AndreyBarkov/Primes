import React, { Component } from 'react';
import './App.css';
import LimitForm from './components/LimitForm';


const PRIMES_URL = 'http://localhost:5000/api/primesMedian';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { median: [], limit: 0, error: '' };
  }
  fetchPrimesMedian(value) {
    this.setState({error:''})
    fetch(PRIMES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit: value })
    }).then(response => {
      if (!response.ok) {
        const err = new Error("HTTP status code: " + response.status);
        err.response = response;
        err.status = response.status;
        throw err;
      }
      return response.json()
    })
      .then((data) => {
        this.setState(
          {
            median: data.median,
            limit: value,
          });
      }).catch(error => {
        this.handleError(error);
      })
  }
  handleError(error){
    if(error.status===400){
      this.setState({error:'Invalid input parameters'})
      return;
    }
    if(error.status===500){
      this.setState({error:'Unknown error occured'})
      return;
    }
    this.setState({error:error.message})
  }

  render() {
    return (
      <div className="App">
        <LimitForm limit={this.state.limit} findMedian={(limit) => this.fetchPrimesMedian(limit)} />
        <div className='errorMsg'>{this.state.error}</div>
        <p>Limit: {this.state.limit}</p>
        <p>Median: {JSON.stringify(this.state.median)}</p>
      </div>
    );
  }
}

export default App;
