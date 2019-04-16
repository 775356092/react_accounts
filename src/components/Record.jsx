import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class Record extends Component {

    constructor(props) {
        super(props)
        this.state = {
            edit: false
        }
    }

    edit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    update = (e) => {
        e.preventDefault()
        const record = {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: Number.parseInt(this.refs.amount.value, 0)
        }
        // console.log(record)
        let { id } = this.props.records
        id = id + ''
        axios.put(`https://5c947470498269001487f032.mockapi.io/records/${id}`, record).then(
            response => {
                this.props.update()
                this.setState({
                    edit: false
                })
                // console.log(response.data)
            }).catch(
                error => console.log(error.message))
    }

    delete = () => {
        let { id } = this.props.records
        axios.delete(`https://5c947470498269001487f032.mockapi.io/records/${id}`).then(
            response => {
                this.props.delete()
                // console.log(response.data)
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    render() {
        if (this.state.edit) {
            return (
                <tr>
                    <td><input type='text' className='form-contol' defaultValue={this.props.records.date} ref='date'></input></td>
                    <td><input type='text' className='form-contol' defaultValue={this.props.records.title} ref='title'></input></td>
                    <td><input type='text' className='form-contol' defaultValue={this.props.records.amount} ref='amount'></input></td>
                    <td><button className="btn btn-primary" onClick={this.update}>更新</button ><button className="btn btn-danger" onClick={this.edit}>取消</button></td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td className='td'>{this.props.records.date}</td>
                    <td className='td'>{this.props.records.title}</td>
                    <td className='td'>{this.props.records.amount}</td>
                    <td className='td'><button className="btn btn-primary" onClick={this.edit}>编辑</button ><button className="btn btn-danger" onClick={this.delete}>删除</button></td>
                </tr>
            )
        }


    }
}

Record.propTypes = {
    id: PropTypes.number,
    date: PropTypes.number,
    title: PropTypes.string,
    amount: PropTypes.number
}