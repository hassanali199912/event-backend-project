const express = require("express");
const routes = express.Router();

const { createDay, updateDay, deleteDay,createSession, getAlldaysByEventId } = require('../../controllers/dashboard/day')
const { isAdmin } = require('../../middlewares/AuthVaildator')

routes.post('/day/', isAdmin, createDay)
routes.post('/day/:id', isAdmin, updateDay)
routes.delete('/day/:id', isAdmin, deleteDay)

routes.post('/session', isAdmin, createSession)

routes.get('/event-day/:id', isAdmin, getAlldaysByEventId)




module.exports = routes;