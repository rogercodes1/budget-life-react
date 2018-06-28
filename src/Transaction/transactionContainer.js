import React, {Component} from 'react'
//import PropTypes from 'prop-types'
import TransactionList from './transactionList';
import TransactionForm from './transactionForm';
// import { Radio } from 'semantic-ui-react'
// let dateFormat = require('dateformat');
// let now = new Date()
let url = "http://localhost:3001/api/v1/"


class Transaction extends Component{
     constructor(){
        super();

        this.state={
           transactions:[],
           categories: []


        }
    }

    componentDidMount() {
      Promise.all([
        fetch(`${url}users/${localStorage.id}/transactions/`,
          {headers: {
              "Content-Type": 'application/json',
              "Accept": "application/json",
              "Authorization": `${localStorage.getItem("token")}`
              }
            }),
        fetch(`${url}categories`)])
         .then(([res1,res2])=>Promise.all([res1.json(), res2.json()]))
         .then(([transactions,categories])=>this.setState({
               transactions, categories
            },()=>{console.log("currentState",this.state)}))

      // fetch(`${url}users/${localStorage.id}/transactions/`,
      //   {headers: {
      //       "Content-Type": 'application/json',
      //       "Accept": "application/json",
      //       "Authorization": `${localStorage.getItem("token")}`
      //       }
      //     })
      //  .then((res1)=>res1.json())
      //  .then(transactions=>this.setState({transactions}))
   }

    addNewTransaction = (newTransaction) => {
      this.setState({transactions: [...this.state.transactions, newTransaction]},() => console.log(this.state))
    }
    render() {
      console.log("cats",this.state.categories);
        return (
            <div id="transactionCont">
                <TransactionForm
                   categories={this.state.categories}
                   addNewTransaction={this.addNewTransaction}
                   onClick={this.handleSubmit}/>
                <TransactionList
                   categories={this.state.categories}
                   transactions={this.state.transactions}/>
            </div>
        );
    }
}

export default Transaction;
