import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookie from "js-cookie";
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'
import { connect } from "react-redux";
import { EVENTFORM_INIT_STATE } from '../constants'
import { showAndHideModal, updateDateRange } from '../../actions/eventFormModalActions'
import { addNewEvent, getAllEvents } from '../../actions/calendarActions'
import ErrorList from '../ErrorList/ErrorList';
import eventService from '../../services/events.service'
import userService from '../../services/users.service'
import List from './List'
import Cookies from 'js-cookie';

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: { ...EVENTFORM_INIT_STATE },
            errorList: [],
            userList: []
        }
    }

    componentDidMount() {
        this.getUsers();

    }

    getUsers = async () => {

        const tokenId = Cookies.get('tokenId');
        const googleId = Cookies.get('googleId');
        const response = await userService.getUsersByGoogleId(tokenId, { googleId });
        console.log("response", response);
        const userList = response
            .filter(user => user.googleID !== googleId)
            .map(object => { return { value: object.email, label: object.email } });
        //    console.log("response", response)
        this.setState({ userList: userList });

    }

    save = async (event) => {

        if (this.validateForm()) {
            // save data and clear state
            let dateRange = { ...this.props.dateRange }
            let attendees = this.state.formData.attendees.map(object => {
                return { email: object.value }
            })
            let formData = {
                ...this.state.formData,
                start: {
                    dateTime: new Date(dateRange.start.date + ' ' + dateRange.start.time).toJSON(),
                    timeZone: "America/New_York"
                },
                end: {
                    dateTime: new Date(dateRange.end.date + ' ' + dateRange.end.time).toJSON(),
                    timeZone: "America/New_York"
                }
            }
            // formData.status = "confirm";
            // formData.attendees = attendees;
            let tokenId = Cookie.get('tokenId');
            let accessToken = Cookie.get("accessToken")
            let eventObject = {
                ...formData
                , attendees: attendees
            }

            console.log("eventObject -->", eventObject);
            const confData = {
                conferenceData: {
                    createRequest: {
                        requestId: uuidv4(),
                        conferenceSolutionKey: {
                            type: "hangoutsMeet"
                        }
                    }
                }
            }

            const outEvent = await eventService
                .addNewGoogleCalendarEvent(tokenId
                    , accessToken
                    , eventObject.addGoogleHangoutMeeting ? {
                        ...eventObject, ...confData
                    } : eventObject);
            this.props.addNewEvent({ ...outEvent, eventId: outEvent.id, bgColor: eventObject.bgColor });
            eventService
                .addEvent(tokenId, { ...outEvent, eventId: outEvent.id, bgColor: eventObject.bgColor })
                .then(response => console.log('inserted new event to db', response));
            this.clearState();
            return;
        }
    }

    deleteEvent = async (eventId) => {
        let tokenId = Cookie.get('tokenId');
        let accessToken = Cookie.get("accessToken")
        await eventService.deleteGoogleEvent(eventId, accessToken, tokenId);
        await eventService.deleteEvent(eventId, tokenId);
        let eventList = await eventService.getAllEvents(tokenId);
        this.props.getAllEvents(eventList);
        this.clearState();
        return;
    }

    validateForm = () => {
        let errorList = [];
        let localFormData = { ...this.state.formData };
        let { dateRange } = { ...this.props };
        console.log('localFormData', localFormData)
        if (localFormData.summary === "") {
            errorList.push("Title is required")
        }
        if (dateRange.start.date === ""
            || dateRange.start.time === "") {
            errorList.push("Start date/time is required")
        }
        if (dateRange.end.date === ""
            || dateRange.end.time === "") {
            errorList.push("End date/time is required")
        }
        if (dateRange.start.date !== ""
            && dateRange.start.time !== ""
            && dateRange.end.date !== ""
            && dateRange.end.time !== ""
        ) {
            if (dateRange.start.date > dateRange.end.date) {
                errorList.push("Start date should be greater than end date")
            }
            if (dateRange.start.time > dateRange.end.time) {
                errorList.push("Start time should be greater than end time")
            }

        }
        this.setState({ errorList });
        return errorList.length === 0;

    }

    clearState = () => {
        this.setState({
            formData: { ...EVENTFORM_INIT_STATE },
            errorList: []
        });
        this.props.setModalShow(false);
    }

    // onColorChange = (event) => {
    //     this.setState({
    //         formData:
    //             { ...this.state.formData, bgColor: event.hex }
    //     });
    // }

    onSelectChange = (event) => {
        console.log("select change", event);
        this.setState({
            formData:
                { ...this.state.formData, attendees: event }
        });
    }

    onChangeEvent = (event) => {
        console.log("Event", event);
        let dateRange = {}
        switch (event.target.id) {
            case 'title':
                this.setState({
                    formData:
                        { ...this.state.formData, summary: event.target.value }
                });
                break;
            case 'description':
                this.setState({
                    formData:
                    {
                        ...this.state.formData
                        , description: event.target.value
                    }
                });
                break;
            case 'startDate':
                dateRange = { ...this.props.dateRange }
                dateRange.start.date = moment(event.target.value).format("YYYY-MM-DD");
                this.props.updateDateRange(dateRange);
                break;
            case 'startTime':
                dateRange = { ...this.props.dateRange }
                dateRange.start.time = event.target.value;
                this.props.updateDateRange(dateRange);
                break;
            case 'endDate':
                dateRange = { ...this.props.dateRange }
                dateRange.end.date = moment(event.target.value).format("YYYY-MM-DD");
                this.props.updateDateRange(dateRange);
                break;
            case 'endTime':
                dateRange = { ...this.props.dateRange }
                dateRange.end.time = event.target.value;
                this.props.updateDateRange(dateRange);
                break;
            case 'location':
                this.setState({
                    formData:
                        { ...this.state.formData, location: event.target.value }
                });
                break;
            case 'chbGoogleHangout':
                this.setState({
                    formData:
                        { ...this.state.formData, addGoogleHangoutMeeting: event.target.checked }
                });
                break;
            default:
                return
        }


    }


    render() {
        console.log("this.state", this.state);
        let { errorList } = { ...this.state };
        let { dateRange } = { ...this.props };
        let localFormData = { ...this.state.formData }
        let viewFormData = { ...this.props.selectedEvent }
        let viewEvent = this.props.viewEvent;
        let insertModel = () => {
            return (<Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ErrorList errorList={errorList} />
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Event
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group as={Row} style={{ width: 'auto' }}>
                            <Col sm={2}>  <Form.Label>Title</Form.Label></Col>
                            <Col sm={10}>
                                <Form.Control id="title"
                                    required={true}
                                    type="text"
                                    value={localFormData.summary}
                                    placeholder="Add Title / Summary"
                                    onChange={(event) => { this.onChangeEvent(event) }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ width: 'auto' }}>
                            <Col sm={2}>  <Form.Label>Description</Form.Label></Col>
                            <Col sm={10}>  <Form.Control
                                id="description"
                                as="textarea"
                                value={localFormData.description}
                                placeholder="Description"
                                onChange={(event) => { this.onChangeEvent(event) }}
                            /></Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ width: 'auto' }}>
                            <Col sm={2}>  <Form.Label>Location</Form.Label></Col>
                            <Col sm={10}>  <Form.Control
                                id="location"
                                type="text"
                                value={localFormData.location}
                                placeholder="Location"
                                onChange={(event) => { this.onChangeEvent(event) }}
                            /></Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ width: 'auto' }}>
                            <Col sm={2}>
                                <Form.Label>Start Date and Time</Form.Label>
                            </Col>
                            <Col sm={5}>
                                <Form.Control
                                    id="startDate"
                                    value={dateRange.start.date}
                                    onChange={(event) => {
                                        this.onChangeEvent(event);
                                    }} type="date" /></Col>
                            <Col sm={5}><Form.Control
                                id="startTime"
                                type="time"
                                value={dateRange.start.time}
                                onChange={(event) => {
                                    this.onChangeEvent(event);
                                }}
                            /></Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ width: 'auto' }}>
                            <Col sm={2}>
                                <Form.Label>End Date and Time</Form.Label>
                            </Col>
                            <Col sm={5}><Form.Control
                                id="endDate"
                                type="date"
                                value={dateRange.end.date}
                                onChange={(event) => {
                                    this.onChangeEvent(event);
                                }} /></Col>
                            <Col sm={5}><Form.Control
                                id="endTime"
                                value={dateRange.end.time}
                                type="time"
                                onChange={(event) => {
                                    this.onChangeEvent(event);
                                }}
                            /></Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ width: 'auto' }}>
                            <Col sm={2}>  <Form.Label>Attendees</Form.Label></Col>
                            <Col sm={10}>
                                <Select
                                    value={localFormData.attendees}
                                    id="attendees"
                                    options={this.state.userList}
                                    isMulti={true}
                                    onChange={(event) => {
                                        this.onSelectChange(event);
                                    }}
                                    placeholder="Add Email Address"
                                >

                                </Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ width: 'auto' }}>
                            <Col sm={2}>
                                <Form.Label>Add Google Hangout</Form.Label></Col>
                            <Col sm={10}>
                                <Form.Check id="chbGoogleHangout" type="checkbox"
                                    onChange={event => { this.onChangeEvent(event) }} checked={localFormData.addGoogleHangoutMeeting} />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Row}>
                            <Col sm={2}><Form.Label>Pick Color</Form.Label> </Col>
                            <Col sm={10}><CirclePicker
                                colors={COLOR_LIST}
                                onChange={(event) => { this.onColorChange(event) }}
                            >
                            </CirclePicker></Col>
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.clearState()}>Close</Button>
                    <Button type="submit" onClick={(event) => this.save(event)}>Save</Button>
                </Modal.Footer>
            </Modal >);
        }
        let viewEventData = () => {
            const googleMeet = () => {

                if (viewFormData.hangoutLink !== "")
                    return (<Form.Group as={Row} >
                        < Col sm={2}> <Form.Label>Meeting </Form.Label></Col>
                        <Col sm={10}> <a rel="noreferrer" target="_blank" href={viewFormData.hangoutLink}> Join Hangout Meeting</a> </Col>
                    </Form.Group >)

            }
            return (
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            View Event : <b>{viewFormData.summary}</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} >
                                <Col sm={2}>  <Form.Label>Description :</Form.Label></Col>
                                <Col sm={10}>
                                    <Form.Label>{viewFormData.description}</Form.Label>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Col sm={2}>  <Form.Label>Location :</Form.Label></Col>
                                <Col sm={10}> <Form.Label>{viewFormData.location}</Form.Label> </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Col sm={2}>
                                    <Form.Label>Start DateTime</Form.Label>
                                </Col>
                                <Col sm={10}>
                                    <Form.Label>{new Date(viewFormData.start.dateTime.toString()).toString()}</Form.Label>
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={2}>
                                    <Form.Label>End DateTime</Form.Label>
                                </Col>
                                <Col sm={10}> <Form.Label>{new Date(viewFormData.end.dateTime.toString()).toString()}</Form.Label></Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={2}>  <Form.Label>Attendees</Form.Label></Col>
                                <Col sm={10}>
                                    <List attendees={viewFormData.attendees}></List>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={2}>
                                    <Form.Label>Meeting Status</Form.Label></Col>
                                <Col sm={10}>
                                    <Form.Label>{viewFormData.status}</Form.Label>
                                </Col>
                            </Form.Group>
                            {googleMeet()}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.clearState()}>Close</Button>
                        <Button variant="danger" type="button" onClick={() => this.deleteEvent(viewFormData.eventId)}>Delete Event</Button>
                    </Modal.Footer>
                </Modal >);
        }

        if (viewEvent) {
            return (viewEventData());
        } else {
            return (insertModel());
        }

    }
}

const mapStateToProps = (state) => ({
    show: state.eventFormReducer.modalShow,
    dateRange: state.eventFormReducer.dateRange,
    selectedEvent: state.calendarReducer.selectedEvent,
    userList: state.globalStateReducer.userList
});

const mapDispatchToProps = (dispatch) => ({
    setModalShow: (show) => showAndHideModal(dispatch, show),
    updateDateRange: (dateRange) => updateDateRange(dispatch, dateRange),
    addNewEvent: (event) => addNewEvent(dispatch, event),
    getAllEvents: (eventList) => getAllEvents(dispatch, eventList)

})

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);