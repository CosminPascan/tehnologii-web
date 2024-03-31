import { Component } from 'react'
import moment from 'moment'

class Event extends Component {
  render() {
  	let {item} = this.props
    const today = moment(new Date())
    let status = ''
    if (today.isAfter(moment(item.begin)) && today.isBefore(moment(item.end))) {
        status = 'open'
    } else {
        status = 'closed'
    }

    return (
        <p>
            {item.name} <br />
            {item.description} <br />
            {status} <br />
        </p>
    )
  }
}

export default Event