import React, { useState } from 'react';
import CREATE_NOTE from '../mutations/createNote';
import getBarbacks from '../queries/getBarbacks';
import { useQuery, useMutation } from '@apollo/react-hooks';

const UploadNotes = () => {
  const barback = JSON.parse(localStorage.getItem('user'));
  const { loading, error, data } = useQuery(getBarbacks);
  const [errorState, setErrorState] = useState('');
  const [text, setText] = useState('');
  console.log(barback);
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
      const note = await create_note();
      console.log(note);
    } catch (err) {
      if (err) setErrorState('No go');
    }
  };
  return (
    <div>
      <div>hey</div>
      <div>
        <form onSubmit={e => makeNote(e)}>
          <input onChange={e => setText(e.target.value)} value={text} />

          {errorState && <div>{errorState}</div>}
          <button type="submit">SUBMIT{mutationLoading && 'TING'}</button>
        </form>
      </div>
    </div>
  );
};

export default UploadNotes;
