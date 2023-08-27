import React, { useState, useEffect } from 'react';
import TodoDataService from '../../services/todos';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-bootstrap/Modal';

const CalendarComponent = (props) => {
  const [todos, setTodos] = useState([]);
  const localizer = momentLocalizer(moment);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    retrieveTodos();
  }, [props.token]);

  useEffect(() => {
    retrieveTodos();
  }, []);

  const retrieveTodos = () => {
    if (props.token) {
      TodoDataService.getAll(props.token)
        .then((response) => {
          const updatedTodos = response.data.map((todo) => {
            const eventTime = todo.eventTime || todo.created; // Utiliza todo.eventTime si está definido, de lo contrario usa todo.created
            if (moment(eventTime).isBefore(moment(), 'day')) {
              todo.completed = true; // Marcar automáticamente como completo si la fecha es anterior a hoy
            }
            todo.eventTime = eventTime; // Asigna la hora del evento correctamente
            return todo;
          });
          setTodos(updatedTodos); // Actualiza el estado `todos` con los eventos modificados
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  
  

  const deleteTodo = (todoId) => {
    TodoDataService.deleteTodo(todoId, props.token)
      .then((response) => {
        retrieveTodos();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const completeTodo = (todoId) => {
    TodoDataService.completeTodo(todoId, props.token)
      .then((response) => {
        retrieveTodos();
        console.log("completeTodo", todoId);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const openModal = (todo) => {
    const filteredTodos = todos.filter((event) => {
      const eventMonth = moment(event.created).month();
      const selectedMonth = moment(selectedDate).month();
      return eventMonth === selectedMonth;
    });
    setSelectedTodo(filteredTodos);
    setShowModal(true);
  };
  

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <Container>
      {props.token == null || props.token === "" ? (
        <Alert variant='warning'>
          You are not logged in. Please <Link to={"/login"}>login</Link> to see your todos.
        </Alert>
      ) : (
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '30%' }}>
              <h2>Todos List</h2>
              <Link to={"/todos/create"}>
                <Button variant="outline-info" className="mb-3">
                  Add To-do
                </Button>
              </Link>
              {todos.map((todo) => {
                return (
                  <Card key={todo.id} className="mb-3">
                    <Card.Body>
                      <div className={`${todo.completed ? "text-decoration-line-through" : ""}`}>
                        <Card.Title>{todo.title}</Card.Title>
                        <Card.Text><b>Memo:</b> {todo.memo}</Card.Text>
                        <Card.Text>
                          Date: {moment(todo.created).format("Do MMMM YYYY, HH:mm")}
                        </Card.Text>
                      </div>
                      {!todo.completed &&
                        <Link to={{
                          pathname: "/todos/" + todo.id,
                          state: {
                            currentTodo: todo
                          }
                        }}>
                          <Button variant="outline-info" className="me-2">
                            Edit
                          </Button>
                        </Link>
                      }
                      <Button variant="outline-danger" onClick={() => deleteTodo(todo.id)}>
                        Delete
                      </Button>
                      {!todo.completed && (
                        <Button variant="outline-success" onClick={() => completeTodo(todo.id)}>
                          Complete
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                )
              })}
            </div>
            <div style={{ flex: '70%', marginLeft: '20px' }}>
              <h2>Calendar</h2>
              <div style={{ height: '500px' }}>
                <BigCalendar
                  localizer={localizer}
                  events={todos.map(todo => ({
                    start: new Date(todo.created),
                    end: new Date(todo.created),
                    title: todo.title,
                    memo: todo.memo 
                  }))}
                  startAccessor="start"
                  endAccessor="end"
                  formats={{
                    timeGutterFormat: 'HH:mm',
                    eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
                      `${localizer.format(start, 'Do MMMM YYYY, HH:mm', culture)} - ${localizer.format(end, 'Do MMMM YYYY, HH:mm', culture)}`,
                  }}
                  onSelectEvent={openModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* todos los eventos */}
    {/* <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Todo Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {todos.map((todo) => (
          <div key={todo.id}>
            <h4>{todo.title}</h4>
            <p><b>Memo:</b> {todo.memo}</p> 
            <p>Date of: {moment(todo.created).format("Do MMMM YYYY, HH:mm")}</p>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal> */}
    {/* Solo eventos del mes */}
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Todo Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedTodo && selectedTodo.map((todo) => (
          <div key={todo.id}>
            <h4>{todo.title}</h4>
            <p><b>Memo:</b> {todo.memo}</p>
            <p>Date of: {moment(todo.created).format("Do MMMM YYYY, HH:mm")}</p>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </Container>
  );
}

export default CalendarComponent;
