import React, { Component } from 'react'
import Record from './Record'
import axios from 'axios'
import RecordForm from './RecordForm'
import AmountBox from './AmountBox'


export default class Records extends Component {



    constructor(props) {

        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            records: [
                // {
                //     "id": 1,
                //     "date": "2018-01-09",
                //     "title": "收入",
                //     "amount": 20
                // },
                // {
                //     "id": 2,
                //     "date": "2018-01-10",
                //     "title": "收入",
                //     "amount": 30
                // },
                // {
                //     "id": 3,
                //     "date": "2018-01-11",
                //     "title": "收入",
                //     "amount": 40
                // }
            ]
        }
    }

    // 使用Jquery发送JSON请求
    // componentDidMount() {
    //     $.getJSON('https://5c947470498269001487f032.mockapi.io/records').then(
    //         response => this.setState({ records: response, isLoaded: true }),
    //         error => this.setState({ isLoaded: true, error }))
    // }

    // 使用axios发送JSON请求
    componentDidMount() {
        axios.get('https://5c947470498269001487f032.mockapi.io/records').then(response => this.setState({
            records: response.data,
            isLoaded: true
        })).catch(error => this.setState({
            error,
            isLoaded: true
        }))
    }


    handleAddRecord = (record) => {
        let data = this.state.records
        data = data.concat(record)
        this.setState({
            records: data,
            isLoaded: true,
            error: null
        })
    }

    handleUpdate = () => {
        axios.get('https://5c947470498269001487f032.mockapi.io/records').then(response => this.setState({
            records: response.data,
            isLoaded
            : true
        })).catch(error => this.setState({
            error,
            isLoaded: true
        }))
    }

    handleDelete = () => {
        axios.get('https://5c947470498269001487f032.mockapi.io/records').then(response => this.setState({
            records: response.data,
            isLoaded: true
        })).catch(error => this.setState({
            error,
            isLoaded: true
        }))
    }

    credit = () => {
        let total = 0
        let credits = this.state.records.filter((record) => {
            return record.amount >= 0
        })
        for (let i = 0; i < credits.length; i++) {
            total += credits[i].amount
        }
        return total
    }

    debit = () => {
        let total = 0
        let credits = this.state.records.filter((record) => {
            return record.amount < 0
        })
        for (let i = 0; i < credits.length; i++) {
            total += credits[i].amount
        }
        return total
    }

    balance = () => {
        return this.credit() + this.debit()
    }

    render() {

        const { error, isLoaded } = this.state

        if (error) {
            return <div>ERROR: Resourse {error.message}</div> //axios使用error.message
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <h2>Records</h2>
                    <div className='row'>
                        <AmountBox text='Credit'  type='success' amount={this.credit()}/>
                        <AmountBox text='Debit'   type='danger'  amount={this.debit()}/>
                        <AmountBox text='Balance' type='info'    amount={this.balance()}/>
                    </div>
                    <RecordForm addRecord={this.handleAddRecord} />
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th className='thead'>Date</th>
                                <th className='thead'>Title</th>
                                <th className='thead'>Amount</th>
                                <th className='thead'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.records.map((records, i) => <Record update={this.handleUpdate} delete={this.handleDelete} key={i} records={records} />)
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

