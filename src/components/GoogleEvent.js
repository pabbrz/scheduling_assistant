
import React, { useEffect, useState } from 'react'
import { gapi } from 'gapi-script'
import Event from './components/Event.js'

function GoogleIntegrate() {
    const [events, setEvents] = useState([])

    const calendarID = process.env.REACT_APP_CALENDAR_ID
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY
    const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN

    //pull events from google calendar
    const getEvents = (calendarID, apiKey) => {
        function initiate() {
            gapi.client
                .init({
                    apiKey: apiKey,
                })
                .then(function () {
                    return gapi.client.request({
                        path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`, //fill in calendarID
                    })
                })
                .then(
                    (response) => {
                        let events = response.result.items
                        setEvents(events)
                    },
                    function (err) {
                        return [false, err]
                    }
                )
        }
        gapi.load('client', initiate)
    }

    useEffect(() => {
        const events = getEvents(calendarID, apiKey)
        setEvents(events)
    }, [])
    //add events to google calendar from scheduling app
    const addEvent = (calendarID, event) => {
        function initiate() {
            gapi.client
                .request({
                    path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
                    method: 'POST',
                    body: event,
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then(
                    (response) => {
                        return [true, response]
                    },
                    function (err) {
                        console.log(err)
                        return [false, err]
                    }
                )
        }
        gapi.load('client', initiate)
    }

    //area to display event in calendar (placeholder and must change accordingly to our scheduling app)
    return (
        <div className="App flex flex-col justify-center py-8">
            <h1 className="mb-4 text-2xl font-bold">
                <ul>
                    {events?.map((event) => (
                        <li key={event.id} className="flex justify-center">
                            <Event description={event.summary} />
                        </li>
                    ))}
                </ul>
            </h1>
        </div>
    )
}

export default GoogleIntegrate
