import React, { useState } from 'react'

function EventForm(props) {
    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        begin: '2024-01-15T09:30',
        end: '2024-01-15T19:30',
        groupId: ''
    })

    const addEvent = () => {
        if (newEvent.name === '' || newEvent.description === '') {
            alert('Fill in all fields!')
        } else {
            props.addEvent(newEvent)
        }
    }

    function set(property, value) {
        const record = {...newEvent}
        record[property] = value;
        setNewEvent(record)
    }

    return (
        <form className='event-form'>
            <div className='field'>
                <label>Event Name</label>
                <input type="text" value={newEvent.name}
                    onChange={event => set('name', event.target.value)} />
            </div>
            <div className='field'>
            <label>Event Description</label>
                <input type="text" value={newEvent.description}
                    onChange={event => set('description', event.target.value)} />
            </div>
            <div className='field'>
                <label>Begin Date</label>
                <input type="datetime-local" value={newEvent.begin}
                    onChange={event => set('begin', event.target.value)} />
            </div>
            <div className='field'>
                <label>End Date</label>
                <input type="datetime-local" value={newEvent.end}
                    onChange={event => set('end', event.target.value)} />
            </div>
            <button onClick={addEvent}>Add event</button>
        </form>	
	)
}

export default EventForm