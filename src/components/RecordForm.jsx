import React, { Component } from 'react'
import axios from 'axios'

export default class RecordForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: '',
            title: '',
            amount: ''
        }
    }

    handleDateChange = (e) => {
        const date = e.target.value
        this.setState({ date })
    }

    handleTitleChange = (e) => {
        const title = e.target.value
        this.setState({ title })
    }

    handleAmountChange = (e) => {
        const amount = e.target.value
        this.setState({ amount: Number.parseInt(amount, 0) })
    }

    addRecord = (e) => {
        e.preventDefault()
        let data = this.state
        // 使用axios发送post请求
        axios.post('https://5c947470498269001487f032.mockapi.io/records', data).then(
            response => {
                this.props.addRecord(response.data)
                this.setState({
                    date: "",
                    title: "",
                    amount: ""
                })
            }).catch(
                error =>
                    console.log(error.message))

    }

    valid = () => this.state.date && this.state.title && this.state.amount

    render() {
        return (
            <form className='form-inline' onSubmit={this.addRecord}>
                <div className='form-group'>
                    <input type="text" placeholder='date' onChange={this.handleDateChange} value={this.state.date} />
                </div>
                <div className='form-group'>
                    <input type="text" placeholder='title' onChange={this.handleTitleChange} value={this.state.title} />
                </div>
                <div className='form-group'>
                    <input type="text" placeholder='amount' onChange={this.handleAmountChange} value={this.state.amount} />
                </div>
                <button type='submit' className='btn btn-primary' disabled={!this.valid()}>Create Record</button>
            </form>
        )
    }
}
