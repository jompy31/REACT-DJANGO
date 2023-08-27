import React, { useState, useEffect } from 'react';
import TodoDataService from '../services/todos';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTodo = (props) => {
  let editing = false;
  let initialTodoTitle = '';
  let initialTodoMemo = '';

  if (props.location.state && props.location.state.currentTodo) {
    editing = true;
    initialTodoTitle = props.location.state.currentTodo.title;
    initialTodoMemo = props.location.state.currentTodo.memo;
  }

  const [title, setTitle] = useState(initialTodoTitle);
  const [memo, setMemo] = useState(initialTodoMemo);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [submitted, setSubmitted] = useState(false);

  // verify the currentUserdata
  const [currentUser, setCurrentUser] = useState({});
  const fetchCurrentUserData = () => {
    const currentUser = localStorage.getItem('currentUser');
    setCurrentUser(JSON.parse(currentUser));
  };
  
  useEffect(() => {
    fetchCurrentUserData();
  }, []);

// finish the current data
  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeMemo = (e) => {
    const memo = e.target.value;
    setMemo(memo);
  };

  const onChangeDate = (date) => {
    setSelectedDate(date);
  };

  const saveTodo = () => {
    const formattedSelectedDate = moment(selectedDate).format('YYYY-MM-DD HH:mm:ss');

    const data = {
      title: title,
      memo: memo,
      created: formattedSelectedDate,
    };

    console.log('Data:', data);

    if (editing) {
      const updatedData = {
        ...data,
        completed: moment().isAfter(selectedDate),
        created: formattedSelectedDate,
      };

      TodoDataService.updateTodo(props.location.state.currentTodo.id, updatedData, props.token)
        .then((response) => {
          setSubmitted(true);
          console.log('Data2:', response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      TodoDataService.createTodo(data, props.token)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Container>
      {submitted ? (
        <div>
          <h4>Todo submitted successfully</h4>
          <Link to={'/todos/'}>Back to Todos</Link>
        </div>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{editing ? 'Edit' : 'Create'} Todo</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="e.g. buy gift tomorrow"
              value={title}
              onChange={onChangeTitle}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={memo} onChange={onChangeMemo} />
          </Form.Group>
          <Form.Group className="mb-3">

            <Form.Label>Date and Time</Form.Label>
            <DatePicker selected={selectedDate} onChange={onChangeDate} showTimeSelect dateFormat="Pp" />
          </Form.Group>
          <Button variant="info" onClick={saveTodo}>
            {editing ? 'Edit' : 'Add'} To-do
          </Button>
          {/* {currentUser && currentUser.staff_status === 'administrator' && (
            <p>Hola</p>
          )} */}
        </Form>
      )}
      {/* {currentUser && (
        <div>
          <h4>Att to do:</h4>
          <p>First Name: {currentUser.first_name}</p>
          <p>Last Name: {currentUser.last_name}</p>
          <p>Email: {currentUser.email}</p>
          <p>User Type: {currentUser.staff_status}</p>
        </div>
      )} */}
    </Container>
  );
};

export default AddTodo;
