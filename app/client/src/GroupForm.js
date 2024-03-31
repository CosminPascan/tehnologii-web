import React, { useState } from 'react'

function GroupForm(props) {
    const [newGroup, setNewGroup] = useState({
        name: ''
    })

    const addGroup = () => {
        if (newGroup.name === '') {
            alert('Enter a name!')
        } else {
            props.addGroup(newGroup)
        }
    }

    function set(property, value) {
        const record = {...newGroup}
        record[property] = value;
        setNewGroup(record)
    }

    return (
        <form className='group-form'>
            <label>Group Event Name</label>
            <input type="text" value={newGroup.name}
                onChange={event => set('name', event.target.value)} />
            <button onClick={addGroup}>Add group</button>
        </form>	
	)
}

export default GroupForm