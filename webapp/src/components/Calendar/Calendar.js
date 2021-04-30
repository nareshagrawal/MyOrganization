import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { connect } from 'react-redux';
// import events from '../events';
import moment from 'moment';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'
import Cookie from "js-cookie";
import EventForm from '../EventsForm/EventForm'
import {
  showAndHideModal
  , updateDateRange
} from '../../actions/eventFormModalActions'
import { getAllEvents, selectEvent, updateEvent } from '../../actions/calendarActions'
import eventService from '../../services/events.service'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Cookies from 'js-cookie';
import UserContext from '../../contexts/UserContext'


const localizer = momentLocalizer(moment);
const BigCalendar = withDragAndDrop(Calendar);
class Calender extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      viewEvent: false
    }
    //  Calendar.momentLocalizer(moment);

  }

  componentDidMount() {
    this.syncCalendar();
    console.log("this.context-->", this.context)
  }

  syncCalendar = async () => {
    const tokenId = Cookie.get('tokenId');
    const accessToken = Cookie.get('accessToken');

    const eventList = await eventService.getAllEvents(tokenId);
    const googleEventList = await eventService
      .getAllGoogleCalendarEvents(tokenId, accessToken);
    if (googleEventList.message === "Auth failed") {
      Cookie.remove('tokenId');
      Cookies.remove('accessToken');
      Cookies.remove('googleId');
      this.props.history.push('signup');
      this.context.setIsAuthenticated(false);
      alert("Authentication token is expired please sign in again")
      return;
    }

    const { items } = { ...googleEventList }

    console.log("googleEventList", googleEventList);
    console.log("EventList", eventList);
    if (items !== undefined) {
      if (items.length === eventList.length) {
        this.props.getAllEvents(eventList);
      } else {
        let finalEventList = [];
        items.forEach(async item => {
          let isExist = false;
          eventList.forEach(async event => {
            if (item.id === event.eventId) {
              isExist = true;
              finalEventList.push(event);
            }
          });
          if (!isExist) {
            const eventResponse = await eventService
              .addEvent(tokenId, { ...item, eventId: item.id });
            finalEventList.push(eventResponse);
          }
        });
        this.props.getAllEvents(finalEventList);
      }
    }
  }


  viewEventHandler = (event) => {
    this.setState({ viewEvent: true })
    this.props.selectEvent({ eventId: event.eventId });
    this.props.setModalShow(true);
  }

  onEventDropHandler = async (event) => {
    const tokenId = Cookie.get('tokenId');
    const accessToken = Cookie.get('accessToken');
    const eventObj = {
      startDateTime: event.start,
      endDateTime: event.end,
      eventId: event.event.eventId
    }
    this.props.updateEvent(eventObj)
    let { eventList } = { ...this.props };
    let eventObject = eventList.filter(event => event.eventId === eventObj.eventId)[0];
    console.log("onEventDrop eventObject", eventObject);
    await eventService
      .updateEvent(eventObject._id, tokenId, eventObject);
    const resp = await eventService
      .updateGoogleEvent(eventObject.eventId, accessToken, tokenId, eventObject)
    console.log("onEventDrop", resp);

  }

  render() {
    console.log("props", this.props);
    let { eventList } = { ...this.props };

    let eventsList = eventList.filter(event => event.start !== undefined)
      .map(event => {
        return {
          "eventId": event.eventId,
          "title": event.summary,
          "start": new Date(event.start.dateTime.toString()),
          "end": new Date(event.end.dateTime.toString()),
          "desc": event.description,
          "color": event.bgColor
        }
      })



    console.log("eventsList", eventsList);
    return (

      <div ref={this.myRef} {...this.props} style={{
        'height': '900px', 'margin-top': '100px'
      }
      }>
        <EventForm show={this.props.show}
          animation={false}
          backdrop={false}
          viewEvent={this.state.viewEvent}
        />
        <BigCalendar
          selectable
          events={eventsList}
          defaultView='week'
          onLeftMenu={() => { }}
          onClick={() => { }}
          popup={true}
          localizer={localizer}
          scrollToTime={new Date(1970, 1, 1, 6)}
          onEventResize={(event) => this.onEventDropHandler(event)}
          defaultDate={new Date()}
          onSelectEvent={event => {
            this.viewEventHandler(event);
          }}
          onEventDrop={(event) => { this.onEventDropHandler(event); }}
          onSelectSlot={(slotInfo) => {
            this.props.setModalShow(true);
            this.setState({ viewEvent: false })
            const dateRange = {
              start: {
                date: moment(slotInfo.start).format("YYYY-MM-DD"),
                time: moment(slotInfo.start.toLocaleString()).format("HH:mm"),
                timezone: ""
              },
              end: {
                date: moment(slotInfo.end).format("YYYY-MM-DD"),
                time: moment(slotInfo.end.toLocaleString()).format("HH:mm"),
                timezone: ""
              }
            }
            this.props.updateDateRange(dateRange);


            console.log(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}` +
              `\naction: ${slotInfo.action}`)
          }
          }
        />
      </div >
    );
  }

}

const mapStateToProps = (state) => ({
  show: state.eventFormReducer.modalShow,
  dateRange: state.eventFormReducer.dateRange,
  eventList: state.calendarReducer.eventList
});

const mapDispatchToProps = (dispatch) => ({
  setModalShow: (show) => showAndHideModal(dispatch, show),
  updateDateRange: (dateRange) => updateDateRange(dispatch, dateRange),
  getAllEvents: (eventList) => getAllEvents(dispatch, eventList),
  selectEvent: (event) => selectEvent(dispatch, event),
  updateEvent: (event) => updateEvent(dispatch, event)
})

export default connect(mapStateToProps, mapDispatchToProps)(Calender);