import React, { useEffect, useState, useContext } from 'react';
import { Pagination, Card, Text, Button } from '@mantine/core'; // Import Card component from Mantine
import { SettingsContext } from './../../Context/Settings/index.jsx';

const List = (props) => {
  const settings = useContext(SettingsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = settings.itemsPerPage;

  let sortedList = props.list.sort((a, b) => a[settings.sortBy] - b[settings.sortBy]);

  // Filter sorted list based on settings
  sortedList = sortedList.filter((item) => (!(settings.hideCompletedItems && item.complete)));

  const totalItems = sortedList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedList = sortedList.slice(startIdx, endIdx);

  return (
    <>
      {paginatedList.map((item) => (
        <Card key={item.id} shadow="xs" padding="md" radius="md" style={{ margin: '20px' }}>
          <Text size="lg">{item.text}{!item.complete ? <span className='pending-text'>pending</span>: null}</Text>
          <Text size="sm">Assigned to: {item.assignee}</Text>
          <Text size="sm">Difficulty: {item.difficulty}</Text>
          <Button onClick={() => props.toggleComplete(item.id)}>{item.complete ? 'Mark Incomplete' : 'Mark Complete'}</Button>
        </Card>
      ))}
      <Pagination
        page={currentPage}
        onChange={handlePageChange}
        total={totalPages}
        siblings={1}
        boundaries={2}
      />
    </>
  );
};

export default List;
