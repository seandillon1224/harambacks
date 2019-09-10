import React, { useState, useEffect } from 'react';
import { FormCard } from '../utils/styles';

const SecretSanta = () => {
  const [gifteeEmail, setThing] = useState('');
  const barback = JSON.parse(localStorage.getItem('user'));
  const { email } = barback;
  useEffect(() => {
    if (email === 'seandillon1224@gmail.com') {
      setThing('Gian');
    }
    if (email === 'bryan@harambacks.com') {
      setThing('Sean M');
    }
    if (email === 'logan@harambacks.com') {
      setThing('Coop');
    }
    if (email === 'giancarlo@harambacks.com') {
      setThing('Jake');
    }
    if (email === 'maguire@harambacks.com') {
      setThing('Sean D');
    }
    if (email === 'rob@harambacks.com') {
      setThing('Eric');
    }
    if (email === 'jake@harambacks.com') {
      setThing('Kevin');
    }
    if (email === 'coop@harambacks.com') {
      setThing('Robby Heart');
    }
    if (email === 'kevin@harambacks.com') {
      setThing('Ray');
    }
    if (email === 'john@harambacks.com') {
      setThing('Bryan');
    }
    if (email === 'ray@harambacks.com') {
      setThing('Cal');
    }
    if (email === 'eric@harambacks.com') {
      setThing('John');
    }
    if (email === 'cal@haramback') {
      setThing('Logan');
    }
  }, []);

  return (
    <FormCard>
      <div style={{ fontSize: '40px', textAlign: 'center' }}>
        You got {gifteeEmail}!
      </div>
    </FormCard>
  );
};

export default SecretSanta;
