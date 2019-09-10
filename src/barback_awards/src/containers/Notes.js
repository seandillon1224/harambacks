import React, { useState, useEffect } from 'react';
import getNotes from '../queries/getNotes';
import { gql } from 'apollo-boost';
import getNotesVoteBy from '../queries/getNoteVotesBy';
import NOTE_VOTE from '../mutations/noteToggle';
import { useQuery, useMutation } from '@apollo/react-hooks';
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
  const barback = JSON.parse(localStorage.getItem('user'));
  const { loading, error, data } = useQuery(getNotes);
  const [noteVote, { loading: mutationLoading }] = useMutation(NOTE_VOTE);
  const {
    loading: loadingTwo,
    error: errorTwo,
    data: notesVotesData,
  } = useQuery(getNotesVoteBy, {
    variables: { id: barback.id },
  });
  console.log(notesVotesData);
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

  // const tryVote = async id => {
  //   try {
  //     const vote = await noteVote({
  //       variables: { id, voter: barback.name },
  //       refetchQueries: ['getNotesVoteBy'],
  //     });
  //     return vote
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    if (data && data.notes && data.notes.length) {
      const filteredData = searchFilter(data.notes);
      getPageNumbers(filteredData.length);
      setCurrentPage(1);
    }
  }, [searchBarVal, data.notes]);

  if (loading || loadingTwo || !pageNumbers) return <p>Loading...</p>;
  if (error || errorTwo) return <p>Error...</p>;

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

  return (
    <NotesDiv>
      <div className="notesDiv">
        {/* <div>
          Vote for the best! You have {5 - notesVotesData.noteVoteses.length}{' '}
          votes remaining
        </div> */}
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
            {/* <div>
              <button onClick={() => tryVote(x.id)}>CAST VOTE</button>
            </div> */}
          </div>
        ))}
      </div>
    </NotesDiv>
  );
};

export default Notes;
