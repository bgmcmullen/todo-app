import React, {useState} from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [hideCompletedItems, setHideCompletedItems] = useState(true);

  const [sortBy, setSortBy] = useState('difficulty');

  function toggleCompletedItems() {
    hideCompletedItems ? setHideCompletedItems(false) : setHideCompletedItems(true);
  }

  return(
    <SettingsContext.Provider value={{itemsPerPage, setItemsPerPage, hideCompletedItems, toggleCompletedItems, sortBy, setSortBy}}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;