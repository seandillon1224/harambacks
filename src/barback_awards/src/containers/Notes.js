import React, { useState, useEffect } from 'react';
import getNotes from '../queries/getNotes';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import TableNav from './TableNav';
import { TextField } from '@material-ui/core';
const NotesDiv = styled.div`
  width: 100%;
  height: 100%;
  .notesDiv {
    border-radius: 8px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23);
    -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
      0 0 6px rgba(0, 0, 0, 0.23);
    -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
      0 0 6px rgba(0, 0, 0, 0.23);
    background-color: white;
    margin: 30px 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
  }
  .note {
    font-family: 'Schoolbell', cursive;
    font-size: 16px;
    background-color: #ffffcc;
    color: black;
    border-radius: 5px;
    box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
    width: 45%;

    text-align: center;
    flex: 1 0 30%;
    margin: 20px 10%;
  }
`;

const Notes = () => {
  const { loading, error, data } = useQuery(getNotes);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [pageNumbers, setPageNumbers] = useState('');
  const [searchBarVal, setSearchBarVal] = useState('');
  const searchFilter = data => {
    console.log(data);
    const filteredData = data.filter(
      x =>
        x.creator.name.toLowerCase().indexOf(searchBarVal.toLowerCase()) !== -1
    );

    return filteredData;
  };
  const getPageNumbers = data => {
    let nums = [];
    for (let i = 1; i <= Math.ceil(data / rowsPerPage); i++) {
      nums.push(i);
    }
    setPageNumbers(nums);
  };
  // useEffect(() => {
  //   if (data.notes.length) {
  //     let length = data.notes.length;
  //     getPageNumbers(length);
  //   }
  // }, [data.notes]);
  useEffect(() => {
    if (data && data.notes && data.notes.length) {
      const filteredData = searchFilter(data.notes);
      getPageNumbers(filteredData.length);
      setCurrentPage(1);
    }
  }, [searchBarVal, data.notes]);
  if (loading || !pageNumbers) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const handlePageClick = event => setCurrentPage(Number(event.target.id));
  const paginate = direction => {
    direction === 'left' && currentPage === 1
      ? setCurrentPage(pageNumbers.length)
      : direction === 'left' && currentPage !== 1
      ? setCurrentPage(currentPage - 1)
      : direction === 'right' && currentPage === pageNumbers.length
      ? setCurrentPage(pageNumbers[0])
      : setCurrentPage(currentPage + 1);
  };

  const paginatedData = cancellationData => {
    let cancellationDataSearched = searchBarVal
      ? searchFilter(cancellationData)
      : cancellationData;
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return cancellationDataSearched.slice(indexOfFirstRow, indexOfLastRow);
  };
  console.log(pageNumbers);
  return (
    <NotesDiv>
      <div className="notesDiv">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="searchDiv">
            <TextField
              type="text"
              className="input"
              placeholder={`Search by Name`}
              value={searchBarVal}
              onChange={evt => setSearchBarVal(evt.target.value)}
            />
          </div>
          <TableNav
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
            handleArrowClick={paginate}
          />
        </div>
        {paginatedData(data.notes).map(x => (
          <div className="note" key={x.id}>
            <div>Creator: {x.creator.name}</div>
            <p>{x.text} </p>
          </div>
        ))}
      </div>
    </NotesDiv>
  );
};

export default Notes;
