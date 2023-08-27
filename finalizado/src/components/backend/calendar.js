import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TodoDataService from '../../services/todos';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { saveAs } from 'file-saver';
import axios from 'axios';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditDeleteModal, setShowEditDeleteModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    memo: '',
    created: new Date(),
    complete: false,
  });
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const token = useSelector(state => state.authentication.token);
  const user = useSelector(state => state.authentication.user);
  const [currentUser, setCurrentUser] = useState(null);
  const [eventIcsFile, setEventIcsFile] = useState(null);

  useEffect(() => {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      try {
        const parsedData = JSON.parse(currentUserData);
        setCurrentUser(parsedData);
      } catch (error) {
        console.error('Error parsing currentUser data:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Verificar si el usuario está logueado
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      TodoDataService.getAll(token)
        .then(response => {
          setEventos(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  const localizer = momentLocalizer(moment);

  const handleMouseOver = index => {
    setHoveredEvent(index);
  };

  const handleMouseOut = () => {
    setHoveredEvent(null);
  };

  const handleEventClick = event => {
    setSelectedEventId(event.id);
    setSelectedEvent(event);
    setShowEditDeleteModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEventId(null);
    setSelectedEvent(null);
    setShowAddModal(false);
    setShowEditDeleteModal(false);
  };

  const handleAddEvent = () => {
    setShowAddModal(true);
    setNewEvent({
      title: '',
      memo: '',
      created: new Date(),
      complete: false,
    });
  };

  const handleDeleteEvent = () => {
    const token = localStorage.getItem('token');
    TodoDataService.deleteTodo(selectedEvent.id, token)
      .then(() => {
        setSelectedEventId(null);
        setSelectedEvent(null);
        setShowEditDeleteModal(false);
        setEventos(prevEventos => prevEventos.filter(event => event.id !== selectedEvent.id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSaveEvent = () => {
    const token = localStorage.getItem('token');
    const isNewEvent = !editedEvent;
    const serviceMethod = isNewEvent ? TodoDataService.createTodo : TodoDataService.updateTodo;
    const updatedEvent = isNewEvent
      ? { ...newEvent, created: moment(newEvent.created).format('YYYY-MM-DD HH:mm:ss') }
      : { ...newEvent, id: editedEvent.id, created: moment(newEvent.created).format('YYYY-MM-DD HH:mm:ss') };

    serviceMethod(updatedEvent, token)
      .then(response => {
        if (isNewEvent) {
          setEventos(prevEventos => [...prevEventos, response.data]);
        } else {
          setEventos(prevEventos => prevEventos.map(e => (e.id === response.data.id ? response.data : e)));
        }
        setShowAddModal(false);
        setEditedEvent(null);
        setNewEvent({
          title: '',
          memo: '',
          created: new Date(),
          complete: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSendEmail = () => {
    if (!selectedEvent) return;
  
    // Create the .ics file content
    const icsContent = `BEGIN:VCALENDAR
  VERSION:2.0
  PRODID:-//My Calendar Event//EN
  BEGIN:VEVENT
  UID:${selectedEvent.id}
  SUMMARY:${selectedEvent.title}
  DESCRIPTION:${selectedEvent.memo}
  DTSTART:${moment(selectedEvent.created).format('YYYYMMDDTHHmmss')}
  DTEND:${moment(selectedEvent.created).add(1, 'hours').format('YYYYMMDDTHHmmss')}
  END:VEVENT
  END:VCALENDAR`;
  
    // Convert the .ics content to a Blob object
    const icsBlob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  
    // Create the FormData object to hold the email data and attachments
    const formData = new FormData();
  
    // Append the event details to the FormData
    formData.append('subject', 'TDM Event Details');
    formData.append('message', `Event Title: ${selectedEvent.title}\n` +
      `Description: ${selectedEvent.memo}\n` +
      `Date: ${moment(selectedEvent.created).format('YYYY-MM-DD HH:mm')}\n` +
      `Message: ${emailMessage}`);
    formData.append('from_email', 'consultas@iriquiqui.com');
    formData.append('recipient_list', email.split(',').map(recipient => recipient.trim()));
  
    // Append the .ics file to the FormData as an attachment
    formData.append('attachments', icsBlob, 'event.ics');
  
  
    // Send the email with attachments using the sendEmail function
    sendEmail(formData);
  };
  
  
  const sendEmail = (formData) => {
    axios.post('https://jompy31.pythonanywhere.com/send-email/', formData)
      .then((response) => {
        console.log(response.data);
        // Aquí puedes realizar cualquier acción que desees después de enviar el correo
        console.log('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
  };
  
  

  const handleDownloadEvent = () => {
    if (!selectedEvent) return;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//My Calendar Event//EN
BEGIN:VEVENT
UID:${selectedEvent.id}
SUMMARY:${selectedEvent.title}
DESCRIPTION:${selectedEvent.memo}
DTSTART:${moment(selectedEvent.created).format('YYYYMMDDTHHmmss')}
DTEND:${moment(selectedEvent.created).add(1, 'hours').format('YYYYMMDDTHHmmss')}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    saveAs(blob, 'event.ics');
  };
  
  return (
    <div style={{ display: 'flex', width: '90vw', height: '100vh', marginTop: '10%' }}>
      <div style={{ width: '50%' }}>
        <h1>Events</h1>
        {isLoggedIn ? (
          <>
           {currentUser && currentUser.staff_status === 'administrator' && (
            <Button variant="primary" onClick={handleAddEvent} style={{ marginBottom: '1rem' }}>
              Add Event
            </Button>
              )}
            {eventos.map((evento, index) => (
              <div
                key={evento.id}
                style={{
                  backgroundColor: 'white',
                  color: 'blue',
                  marginBottom: '1rem',
                  padding: '1rem',
                  transition: 'transform 0.3s ease',
                  transform: hoveredEvent === index ? 'scale(1.2)' : 'scale(1)',
                }}
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={handleMouseOut}
                onClick={() => handleEventClick(evento)}
              >
                <h2>{evento.title}</h2>
                <p>{evento.memo}</p>
                <p>Created: {moment(evento.created).format('YYYY-MM-DD HH:mm')}</p>
                <p>Completed: {evento.complete ? 'Sí' : 'No'}</p>
              </div>
            ))}
          </>
        ) : (
          <Alert variant="warning">
            You are not logged in. Please <Link to={'/login'}>login</Link> to see our webinar schedule.
          </Alert>
        )}
      </div>
      <div style={{ width: '100%',  overflowX: 'auto'  }}>
        <BigCalendar
          localizer={localizer}
          events={eventos.map(evento => ({
            title: evento.title,
            start: moment(evento.created).toDate(),
            end: moment(evento.created).add(1, 'hours').toDate(),
            memo: evento.memo,
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleEventClick}
          onSelectSlot={() => {
            setSelectedEventId(null);
            setSelectedEvent(null);
          }}
          popup={true}
          tooltipAccessor="memo"
        />
      </div>
      <Modal show={showAddModal || showEditDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{showAddModal ? 'Add Event' : 'Event Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAddModal && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the title"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={newEvent.memo}
                  onChange={e => setNewEvent({ ...newEvent, memo: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date & Time</Form.Label>
                <DatePicker
                  selected={moment(newEvent.created).toDate()}
                  onChange={date => setNewEvent({ ...newEvent, created: date })}
                  showTimeSelect
                  dateFormat="Pp"
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSaveEvent}>
                Save
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Form>
          )}
          {showEditDeleteModal && selectedEvent && (
            <div>
              <h4>{selectedEvent.title}</h4>
              <p>{selectedEvent.memo}</p>
              {selectedEvent.start ? (
                <p>Date Calendar: {moment(selectedEvent.start).format('YYYY-MM-DD HH:mm')}</p>
              ) : (
                <p>Date: {moment(selectedEvent.created).format('YYYY-MM-DD HH:mm')}</p>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <FormControl
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <FormControl
                  as="textarea"
                  rows={3}
                  placeholder="Enter message"
                  value={emailMessage}
                  onChange={e => setEmailMessage(e.target.value)}
                />
              </Form.Group>
             
              <Button variant="primary" onClick={handleSendEmail}>
                Send Email
              </Button>
              {currentUser && currentUser.staff_status === 'administrator' && (
              <Button variant="danger" onClick={handleDeleteEvent}>
                Delete
              </Button>
              )}
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="success" onClick={handleDownloadEvent}>
                Download Event
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Eventos;
