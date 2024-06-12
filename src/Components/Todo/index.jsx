import React, { useRef, useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import Header from '../Header';
import List from '../List';
import Footer from '../Footer';
import './styles.scss'
import Form from '../Form/index.jsx';
import SettingsPage from '../SettingsPage/index.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '@mantine/core/styles.css';
import Auth from '../../Context/Auth/auth.jsx';

import Login from '../Login/login.jsx';

import { v4 as uuid } from 'uuid';


const Todo = () => {

  const isInitialRender = useRef(true);


  const [defaultValues] = useState({
    difficulty: 4,
    numberInputValue: 10,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  useEffect(() => {
    const restoredData = JSON.parse(localStorage.getItem('Context-API-list'));
    if (Array.isArray(restoredData)) {
      setList(restoredData);
    }

  }, [])

  function addItem(item) {

    item.index = list.length;
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 

    // Skip the effect on the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    localStorage.setItem('Context-API-list', JSON.stringify(list));

  }, [list]);

  return (
    <>

      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </nav>

          <Header incomplete={incomplete} />

          <Routes>
            <Route exact path="/" element={
              <Auth capability="create">
                <Form handleSubmit={handleSubmit} handleChange={handleChange} defaultValues={defaultValues} />
              </Auth>

            }
            />

            <Route path="/settings" element={
              <SettingsPage />

            } />
          </Routes>
        </div>
      </Router>


      <List list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} />


      <Footer />

    </>
  );
};

export default Todo;
