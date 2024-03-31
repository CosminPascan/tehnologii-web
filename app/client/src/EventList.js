import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import EventForm from './EventForm'
import Event from './Event'
import './events.css'

function EventList () {
    const [eventList, setEventList] = useState([])
    const groupId = useLocation().pathname.split('/')[2]

    const loadEvents = async () => {
        const res = await fetch(`/api/events/${groupId}`)
        if (res.status === 200) {
            const data = await res.json();
            console.warn(data)
            setEventList(data)
        }
    } 

    useEffect(() => {
        loadEvents()
    }, [])

    const addEvent = async (ev) => {
        ev.groupId = groupId
        //console.log(event)
        const res = await fetch(`api/events/${groupId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ev)
        })
        if (res.status === 201) {
            //console.log(event)
            const newEventList = [...eventList, ev]
            setEventList(newEventList)
            loadEvents()
        }
    }

    const deleteEvent = async (event) => {
        const res = await fetch(`api/events/${event.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 204) {
            //console.log(event)
            const newEventList = eventList.filter((e) => e !== event) 
            setEventList(newEventList)
        }
    }

    return (
        <div className='events-container'>
            <div className='title'>
                <p>Attendance Tracking Application</p>
            </div>
            <EventForm addEvent={addEvent} />
            <div className='event-list'>
            {
                eventList.map((event, index) => {
                    return (
                        <div className='event-card' key={index}>
                            <Event item={event} />
                            <button className='delete-button' onClick={() => deleteEvent(event)}> x </button>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default EventList