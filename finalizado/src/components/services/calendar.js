import React, { useState, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import Footer from '../../components/navigation/Footer';
import Navbar from '../../components/navigation/Navbar';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // Nueva variable de estado para almacenar la hora seleccionada
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const calendarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = ({ start }) => {
    setSelectedDate(start);
    setIsModalOpen(true);
  };

  const handleEventClick = ({ event }) => {
    if (event && event.title) {
      if (window.confirm(`Are you sure you want to delete the event '${event.title}'`)) {
        setCurrentEvents(currentEvents.filter((ev) => ev !== event));
      }
    }
  };


  const handleAddEvent = () => {
    if (selectedDate && eventTitle && eventName && /^\S+@\S+\.\S+$/.test(eventEmail)) {
      const start = moment(selectedDate).hour(selectedTime).toDate();
      const end = moment(start).add(1, "hour").toDate();
      const newEvent = {
        start,
        end,
        title: eventTitle,
        description: eventDescription,
        name: eventName,
        email: eventEmail,
      };
      setCurrentEvents([...currentEvents, newEvent]);
      setSelectedDate(null);
      setEventTitle("");
      setEventDescription("");
      setEventName("");
      setEventEmail("");
      setIsModalOpen(false);
    } else {
      alert("Please enter a valid email address");
    }
  };


  const navigateToPreviousMonths = () => {
    setCurrentDate(moment(currentDate).subtract(2, "months").toDate());
  };

  const navigateToNextMonths = () => {
    setCurrentDate(moment(currentDate).add(2, "months").toDate());
  };

  const handleDateListClick = (date) => {
    calendarRef.current?.getApi().gotoDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const defaultEvents = [
    {
      id: 1,
      title: "All-day event",
      start: moment("2023-05-18").hour(8).toDate(), // Establecer la hora de inicio a las 8am
      end: moment("2023-05-18").hour(17).toDate(), // Establecer la hora de finalización a las 5pm
      description: "Description of all-day event",
      name: "John Doe",
      email: "johndoe@example.com",
    },
    {
      id: 2,
      title: "Timed event",
      start: moment("2023-05-23").hour(15).toDate(), // Establecer la hora de inicio a las 3pm
      end: moment("2023-05-23").hour(17).toDate(), // Establecer la hora de finalización a las 5pm
      description: "Description of timed event",
      name: "Jane Smith",
      email: "janesmith@example.com",
    },
  ];
  
  return (
    <div>
    <Navbar />
    <div style={{ display: "flex", height: "500px" }}>
      <div style={{ flex: 1, padding: "10px" }}>
      <br/><br/><br/>
      <Link to="/services" className="btn sm" style={{marginLeft:"-3%"}}>
          Services 
      </Link>
        <h2>Agenda</h2>
        <ul>
          {currentEvents.map((event) => (
            <li key={event.id} onClick={() => handleDateListClick(event.start)}>
              <div>
                <strong>Date:</strong> {moment(event.start).format("YYYY-MM-DD")}
              </div>
              <div>
                <strong>Title:</strong> {event.title}
              </div>
              <div>
                <strong>Description:</strong> {event.description}
              </div>
            </li>
          ))}
        </ul>

      </div>
      <div style={{ flex: 3 }}>
        {/* <div>
          <button onClick={navigateToPreviousMonths}>Previous Months</button>
          <button onClick={navigateToNextMonths}>Next Months</button>
        </div> */}
        <br/><br/><br/><br/>
        <Calendar
          ref={calendarRef}
          localizer={localizer}
          events={[...defaultEvents, ...currentEvents]}
          selectable
          onSelectSlot={handleDateClick}
          onSelectEvent={handleEventClick}
          defaultView="month"
          views={["month", "agenda"]}
          step={15}
          timeslots={2}
          defaultDate={currentDate}
          hideMonthNavigation={true} 
        />
        
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Add Event"
            style={{
              overlay: {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                zIndex: 9999, 
              },
              content: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "400px",
                width: "100%",
                padding: "20px",
                background: "#FFFFFF",
                borderRadius: "8px",
              },
            }}
          >
          <h2>Add Event</h2>
          {selectedDate && (
            <div>
              <strong>Date:</strong> {moment(selectedDate).format("YYYY-MM-DD")}
            </div>
          )}
          <div>
            <label htmlFor="event-title">Title:</label>
            <input
              id="event-title"
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              style={{ border: "1px solid black" , borderRadius: "5px", margin: "1%"}}
            />
          </div>
          <div>
            <label htmlFor="event-description">Description:</label>
            <textarea
              id="event-description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              style={{ border: "1px solid black" , borderRadius: "5px", margin: "1%"}}
            ></textarea>
          </div>
          <div>
            <label htmlFor="event-name">Name:</label>
            <input
              id="event-name"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              style={{ border: "1px solid black" , borderRadius: "5px", margin: "1%"}}
            />
          </div>
          <div>
            <label htmlFor="event-email">Email:</label>
            <input
              id="event-email"
              type="email"
              value={eventEmail}
              onChange={(e) => setEventEmail(e.target.value)}
              style={{ border: "1px solid black" , borderRadius: "5px", margin: "1%"}}
            />
          </div>
          <div>
            <label htmlFor="event-time">Time:</label>
            <select
              id="event-time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(parseInt(e.target.value))}
              style={{ border: "1px solid black" , borderRadius: "5px", margin: "1%"}}
            >
              <option value={1}>1pm</option>
              <option value={3}>3pm</option>
              <option value={5}>5pm</option>
            </select>
          </div>
          <button onClick={handleAddEvent} style={{ backgroundColor: "blue", borderRadius: "5px", color: "white" , width: "30%" }}>Add Event</button>
        </Modal>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default CalendarComponent;
