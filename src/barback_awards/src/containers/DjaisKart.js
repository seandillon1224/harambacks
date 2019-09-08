import React, { useState } from 'react';
import { FormCard } from '../utils/styles';
import Waluigi from '../assets/waluigi.jpg';
const choices = [
  'Why would you ever choose Waluigi?',
  'Bang Bang On The Bottle Bottle',
  'Tap Tap On The Glass Glass',
];

const DjaisKart = () => {
  const [text, setText] = useState('');
  const setTextRandom = () => {
    setText(choices[Math.floor(Math.random() * Math.floor(3))]);
  };
  return (
    <FormCard>
      <h1>Djais Kart</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>
          Choose Your Character
        </div>
        <img
          width="200"
          height="200"
          onClick={() => setTextRandom()}
          src={Waluigi}
          alt="morgans face"
        />
        <div style={{ marginTop: '10px', fontWeight: 'bold' }}>Waluigi</div>
      </div>
      {text && <div style={{ margin: '0 auto', color: 'red' }}>{text}</div>}
    </FormCard>
  );
};

export default DjaisKart;
