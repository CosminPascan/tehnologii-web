import { useState, useEffect } from 'react'
import GroupForm from './GroupForm'
import Group from './Group'
import { useNavigate } from 'react-router-dom'

function GroupList () {
    const [groupList, setGroupList] = useState([])

    const loadGroups = async () => {
        const res = await fetch('/api/groups')
        if (res.status === 200) {
            const data = await res.json();
            console.warn(data)
            setGroupList(data)
        }
    } 

    useEffect(() => {
        loadGroups()
    }, [])

    const addGroup = async (group) => {
        const res = await fetch('api/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(group)
        })
        if (res.status === 201) {
            //console.log(group)
            const newGroupList = [...groupList, group]
            setGroupList(newGroupList)
        }
    }

    const deleteGroup = async (group) => {
        const res = await fetch(`api/groups/${group.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 204) {
            const newGroupList = groupList.filter((g) => g !== group) 
            setGroupList(newGroupList)
            //console.log(group.name + ' a fost sters')
        }
    }

    const navigate = useNavigate()

    const navigateToGroup = (id) => {
        navigate(`/groups/${id}`)
    }

    return (
        <div className='group-container'>
            <div className='title'>
                <p>Attendance Tracking Application</p>
            </div>
            <GroupForm addGroup={addGroup} />
            <div className='group-list'>
            {
                groupList.map((group, index) => {
                    return (
                        <div className='group-card' key={index}>
                            <a onClick={() => navigateToGroup(group.id)}>
                                <Group item={group} />
                            </a>
                            <button className='delete-button' onClick={() => deleteGroup(group)}> x </button>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default GroupList