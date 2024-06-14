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

import { LoginContext } from '../../Context/Auth/context.jsx';

import axios from 'axios';


import { v4 as uuid } from 'uuid';

const API = import.meta.env.VITE_API;

const Todo = () => {

  const isInitialRender = useRef(true);

  const context = useContext(LoginContext);

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  async function fetchData(){
    const restoredData = await axios.get(`${API}api/v2/todo/`, {
      headers: {
        'Authorization': `Bearer ${context.token}`
      }
  });
    if (Array.isArray(restoredData.data)) {
      setList(restoredData.data);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function addItem(item) {

    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
    try {
      await axios.post(`${API}api/v2/todo/`, item, {
        headers: {
          'Authorization': `Bearer ${context.token}`
        }
    });
    } catch(e){
      console.error(e);
    }
  }

  async function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
    try {
      await axios.delete(`${API}api/v2/todo/${id}`, {
        headers: {
          'Authorization': `Bearer ${context.token}`
        }
    });
    } catch(e){
      console.error(e);
    }
  }


  async function toggleComplete(id) {

    let newItem = null;

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
        newItem = item;
      }
      return item;
    });
    try {
      await axios.put(`${API}api/v2/todo/${id}`, newItem, {
        headers: {
          'Authorization': `Bearer ${context.token}`
        }
    });
    } catch(e){
      console.error(e);
    }
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
