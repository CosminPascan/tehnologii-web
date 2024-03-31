import express from 'express'
import { Group, Event, Participant } from './repository.mjs'
import {
    getRecords, postRecord,
    getRecord, headRecord, deleteRecord,
    getEvents, postEvent
} from './service.mjs'

const router = express.Router()

router.route('/groups')
    .get((req, res) => getRecords(Group, req, res))
    .post((req, res) => postRecord(Group, req, res))

router.route('/groups/:id')
    .get((req, res) => getRecord(Group, req, res))
    .head((req, res) => headRecord(Group, req, res)) // head verifica daca exista record-ul
    .delete((req, res) => deleteRecord(Group, req, res))

router.route('/events')
    .get((req, res) => getRecord(Event, req, res))

router.route('/events/:groupId')
    .get((req, res) => getEvents(Event, req, res))
    .post((req, res) => postEvent(Event, req, res))

router.route('/events/:id')
    .delete((req, res) => deleteRecord(Event, req, res))

export default router