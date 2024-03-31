import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import GroupList from './GroupList.js'
import EventList from './EventList.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<GroupList />} />
      <Route path='/groups/:id' element={<EventList />} />
    </Routes>
  </HashRouter>
)