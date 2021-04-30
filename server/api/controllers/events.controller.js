import eventService from '../services/events.service'


const getEvents = (request, response) => {
    const promise = eventService.getAllEvents();
    promise.then(res => {
        response.status(200);
        response.json(res);
    })

};

const insertEvent = (request, response) => {
    const newEvent = { ...request.body };
    eventService.addNewEvent(newEvent).then(event => {
        response.status(201);
        response.json(event);
    }).catch(err =>
        response.json(err)
    );

}

const updateEvent = (request, response) => {
    const id = request.params.id;
    const updatedEvent = { ...request.body };
    console.log("update event 1", id);
    console.log("update event 2", updatedEvent);
    eventService.updateEvent(id, updatedEvent).then(event => {
        response.status(200);
        console.log("update event ", event);
        response.json(event);
    }).catch(err => {
        console.log("update event error", err);
        response.json(err)
    });

}

const deleteEvent = (request, response) => {
    const id = request.params.eventId;
    eventService.deleteEvent(id).then(event => {
        response.status(200);
        response.json(event);
    }).catch(err =>
        response.json(err)
    );

}

const getGoogleCalendarEvents = (request, response) => {
    const { accesstoken } = { ...request.headers };
    // console.log("request.header", request.headers);
    eventService
        .getGoogleCalendarEvents(accesstoken, 'primary')
        .then(res => {
            response.status(200);
            // console.log("res", res.data)
            response.json(res.data);
        }).catch(err => response.json(err))
}

const addGoogleCalendarEvent = (request, response) => {
    const { accesstoken } = { ...request.headers };
    const event = request.body;
    console.log("event", event);
    eventService
        .addGoogleCalendarEvent(accesstoken, 'primary', event)
        .then(res => {
            response.status(201);
            // console.log("res", res.data)
            response.json(res.data);
        }).catch(err => response.json(err))
}

const deleteGoogleEvent = (request, response) => {
    const id = request.params.eventId;
    const { accesstoken } = { ...request.headers };
    eventService
        .deleteGoogleCalendarEvent(accesstoken, 'primary', id)
        .then(res => {
            response.status(200);
            response.json(res);
        }).catch(error => response.json(error))
}

const updateGoogleCalendar = (request, response) => {
    const id = request.params.eventId;
    const { accesstoken } = { ...request.headers };
    const updatedEvent = { ...request.body }
    eventService
        .updateGoogleCalendarEvent(accesstoken, 'primary', id, updatedEvent)
        .then(res => {
            response.status(200);
            response.json(res);
        }).catch(error => response.json(error))
}


export default {
    getEvents
    , insertEvent
    , updateEvent
    , deleteEvent
    , getGoogleCalendarEvents
    , addGoogleCalendarEvent
    , deleteGoogleEvent
    , updateGoogleCalendar
}