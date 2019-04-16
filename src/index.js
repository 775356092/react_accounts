import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Records from  './components/Records'
import './css/index.css'

export default class Index extends Component {
    render() {
        return (<Records/>)
    }
}

ReactDOM.render(<Index />, document.getElementById('root'))