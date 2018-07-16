import React, {Component} from 'react'
//import PropTypes from 'prop-types'
import TransactionList from './transactionList';
import TransactionForm from './transactionForm';
// import { Radio } from 'semantic-ui-react'
import Categories from '../Helpers/categoryHelper.js';
let url = "http://localhost:3001/api/v1/"


class Transaction extends Component{
     constructor(props){
        super(props);

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
         .then(([data,categories])=>this.setState({
               transactions: data.transactions, categories
            },()=>{console.log("currentState",this.state)}))

   }

    addNewTransaction = (newTransaction) => {
      this.setState({transactions: [...this.state.transactions, newTransaction]},() => console.log("newTransaction",this.state))
    }
    render() {
        return (
            <div id="transactionCont">
                <TransactionForm
                   user_id={this.props.user_id}
                   categories={Categories(this.state.categories)}
                   addNewTransaction={this.addNewTransaction}
                   onClick={this.handleSubmit}/>

                 {this.state.transactions !== undefined && this.state.transactions.length !== 0 ?
                   <TransactionList
                     categories={Categories(this.state.categories)}
                     transactions={this.state.transactions}/> :
                    "No Current Transactions, Please add a new one!" }
            </div>
        );
    }
}

export default Transaction;
// console.log(this.state.transactions, newTransaction);

// Promise.all([
//   fetch(`${url}transactions/`,
//     {headers: {
//         "Content-Type": 'application/json',
//         "Accept": "application/json",
//         "Authorization": `${localStorage.getItem("token")}`
//         }
//       }),
//   fetch(`${url}categories`)])
//    .then(([res1,res2])=>Promise.all([res1.json(), res2.json()]))
//    .then(([transactions,categories])=>this.setState({
//          transactions, categories
//       },()=>{console.log("currentState",this.state)}))
