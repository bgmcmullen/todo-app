import React, { useContext } from 'react';

import { Menu, Button } from '@mantine/core';
import { NumberInput } from '@mantine/core';


import { SettingsContext } from './../../Context/Settings/index.jsx'

const SettingsPage = () => {

  const settings = useContext(SettingsContext);

  const handleNumberInputChange = value => {
    // Update the state with the new value
    settings.setItemsPerPage(value);
  };


  return (
    <Menu shadow="md" width={100}>




      <div className='settings-buttons'>

        <button onClick={settings.toggleCompletedItems}>{!settings.hideCompletedItems ? 'Hide Completed Items' : 'Show Completed Items'}</button>
        <label>
          <input name="sort-type" type="radio" onClick={() => settings.setSortBy('index')} checked={settings.sortBy === 'index'} />
          <span>Sort by Order Created</span>
        </label>

        <label>
          <input name="sort-type" type="radio" onClick={() => settings.setSortBy('difficulty')} checked={settings.sortBy === 'difficulty'} />
          <span>Sort by Difficulty</span>
        </label>

      </div>
      <NumberInput
        size="md"
        style={{ width: "300px" }}
        value={settings.itemsPerPage}
        onChange={handleNumberInputChange}
        label="Items Per Page : "
        min={1}
        max={10}
      />



    </Menu>


  );
}

export default SettingsPage;