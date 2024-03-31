import { Component } from 'react'

class Group extends Component {
  render() {
  	let {item} = this.props
    return (
        <p>{item.name}</p>
    )
  }
}

export default Group