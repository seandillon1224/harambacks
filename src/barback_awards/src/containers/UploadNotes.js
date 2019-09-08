import React, { useState } from 'react';
import CREATE_NOTE from '../mutations/createNote';
import getBarbacks from '../queries/getBarbacks';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { StyledButton, FormCard } from '../utils/styles';

const StyledUpload = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1px solid grey;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0 auto;
`;

const UploadNotes = () => {
  const barback = JSON.parse(localStorage.getItem('user'));
  const { loading, error, data } = useQuery(getBarbacks);
  const [errorState, setErrorState] = useState('');
  const [successState, setSuccessState] = useState('');
  const [text, setText] = useState('');

  const [create_note, { loading: mutationLoading }] = useMutation(CREATE_NOTE, {
    variables: { text, name: barback.name },
  });

  // if (!localStorage.getItem('user')) {
  //   history.push('/');
  // }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const makeNote = async e => {
    e.preventDefault();
    try {
      await create_note();
      setSuccessState("Successfully added! Hope it's a good one!");
      setText('');
      setTimeout(() => setSuccessState(''), 3000);
    } catch (err) {
      if (err) setErrorState('No go');
    }
  };
  return (
    <FormCard>
      <h1>Submit Note</h1>
      <div>
        <form onSubmit={e => makeNote(e)}>
          <TextField
            variant="outlined"
            multiline
            name="note"
            label="Add Note"
            onChange={e => setText(e.target.value)}
            value={text}
          />

          {errorState && <div className="errorDiv">{errorState}</div>}
          {successState && <div className="successDiv">{successState}</div>}
          <StyledButton
            disabled={mutationLoading}
            margin="15px auto"
            type="submit"
          >
            SUBMIT{mutationLoading && 'TING'}
          </StyledButton>
        </form>
      </div>
    </FormCard>
  );
};

export default UploadNotes;
