import React, {Component} from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import adapter from './../adapter';


let url = "http://localhost:3001/api/v1/transactions"

const options = [
  { key: 'i', text: 'Income', value: 'income' },
  { key: 'e', text: 'Expense', value: 'expense' }]


class TransactionForm extends Component{
     constructor(props){
        super(props);

        this.state={
           date: "",
           description:"",
           category_id: 1,
           transaction_type : null,
           amount : null,
           user_id: localStorage.id,
        }
    }
    handleChange = (e, {name, value}) => {
      let id = (e.target.id === "") ? e.target.parentElement.id : e.target.id
     if (typeof(e.target.name) === "undefined"){
        (name === "category_id") ?  (this.setState({[name]: id})) : (this.setState({[name]: value}, () => { console.log(this.state) }))
       } else {
          this.setState({[e.target.name] : e.target.value}, () => {
             console.log(this.state)}
          )
       }
    }

    handleSubmit = (e) => {
      console.log("handleSubmit",this.state);
      e.preventDefault()
      let body = {
        date: this.state.date,
        description:this.state.description,
        category_id: this.state.category_id,
        transaction_type : this.state.transaction_type,
        amount : this.state.amount,
        user_id: localStorage.id,
      }
      console.log(body);
      adapter.post(url, body)
         .then(response=>response.json())
         .then(transaction=>this.props.addNewTransaction(transaction))
         // .then(transaction=>console.log(transaction, "what is"))


    }

  render() {

    return (
        <div id="transaction-form">
      <Form onSubmit={this.handleSubmit}>

        <Form.Group >
          <Form.Field
             required
             id="formDate"
             onChange={this.handleChange}
             control={Input}
             name="date"
             type="date"
             label='Date' />
          <Form.Field
             required
             id="formDescription"
             onChange={this.handleChange}
             name="description"
             control={Input}
             label='Description'
             placeholder='Enter Description...'/>
          <Form.Select
             required
             id="formCategory"
             onChange={this.handleChange}
             name="category_id"
             label='Category'
             options={this.props.categories}
             placeholder='Category' />

          <Form.Select
             id="formType"
             onChange={this.handleChange}
             label='Transaction'
             required
             name="transaction_type"
             options={options}
             placeholder='Type'/>

          <Form.Field
             onChange={this.handleChange}
             id = "formAmount"
             label='Amount'
             type="number"
             min="1"
             step=".01"
             required
             name="amount"
             control={Input}
             placeholder='Enter Amount'/>

            <Form.Field id="formButton" control={Button}>Add</Form.Field>


        </Form.Group>


      </Form>
  </div>
    )
  }
}

export default TransactionForm;
