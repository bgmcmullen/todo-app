import React, {useRef, useState, useEffect} from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  const isInitialRender = useRef(true);

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [hideCompletedItems, setHideCompletedItems] = useState(false);

  const [sortBy, setSortBy] = useState('index');

  useEffect(() => {
    const restoredSettings = JSON.parse(localStorage.getItem('Context-API-settings'));

    if(restoredSettings) {
      setItemsPerPage(restoredSettings.itemsPerPage);
      setHideCompletedItems(restoredSettings.hideCompletedItems);
      setSortBy(restoredSettings.sortBy);
    }


  }, [])

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    const stringifiedSettings = JSON.stringify({itemsPerPage, hideCompletedItems, sortBy});
    localStorage.setItem('Context-API-settings', stringifiedSettings);

  }, [itemsPerPage, hideCompletedItems, sortBy]);


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