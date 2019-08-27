import React from 'react';
import getNotes from '../queries/getNotes';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

const NotesDiv = styled.div`
  width: 100%;
  height: 100%;
  .notesDiv {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
  }
  .note {
    font-family: 'Schoolbell', cursive;
    font-size: 32px;
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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  console.log(data);
  return (
    <NotesDiv>
      <div className="notesDiv">
        {data.notes.map(x => (
          <div className="note" key={x.id}>
            <h1>Creator: {x.creator.name}</h1>
            <p>{x.text} </p>
          </div>
        ))}
      </div>
    </NotesDiv>
  );
};

export default Notes;
