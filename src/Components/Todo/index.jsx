import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import Header from '../Header';
import List from '../List';
import Footer from '../Footer';
import './styles.scss';

import '@mantine/core/styles.css'; // Import Mantine CSS

import { Menu, Button} from '@mantine/core';


import { v4 as uuid } from 'uuid';

import { SettingsContext } from './../../Context/Settings/index.jsx'

const Todo = () => {

  const settings = useContext(SettingsContext);

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.index = list.length;
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
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
  }, [list]);  

  const handleMenuItemClick = (event) => {
    const itemText = event.currentTarget.textContent;
    settings.setItemsPerPage(itemText);
  };


console.log(list);

  return (
    <>

      <Header incomplete={incomplete}/>
      <h2>Add To Do Item</h2>

        <button onClick={settings.toggleCompletedItems}>{!settings.hideCompletedItems ? 'Hide Completed Items' : 'Show Completed Items'}</button>
        <button onClick={() => settings.setSortBy('index')}>Sort by Order Created</button>
        <button onClick={() => settings.setSortBy('difficulty')}>Sort by Difficulty</button>
        <Menu shadow="md" width={100}>
      <Menu.Target>
        <Button>Items Per Page : {settings.itemsPerPage}</Button>
      </Menu.Target>

      <Menu.Dropdown >
        <Menu.Item onClick={handleMenuItemClick}>1</Menu.Item>
        <Menu.Item onClick={handleMenuItemClick}>2</Menu.Item>
        <Menu.Item onClick={handleMenuItemClick}>3</Menu.Item>
        <Menu.Item onClick={handleMenuItemClick}>4</Menu.Item>
        <Menu.Item onClick={handleMenuItemClick}>5</Menu.Item>
        <Menu.Item onClick={handleMenuItemClick}>6</Menu.Item>
        <Menu.Item onClick={handleMenuItemClick}>7</Menu.Item>
        <Menu.Item onClick={handleMenuItemClick}>8</Menu.Item>
        <Menu.Item onClick={handleMenuItemClick}>9</Menu.Item>
        <Menu.Item onClick={handleMenuItemClick}>10</Menu.Item>
      </Menu.Dropdown>
    </Menu>


      <form onSubmit={handleSubmit}>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>

      <List list={list} toggleComplete={toggleComplete} />

      <Footer />

    </>
  );
};

export default Todo;
