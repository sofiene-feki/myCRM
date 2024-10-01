import axios from 'axios';
import React, { useState } from 'react';

const Kavkom = () => {
  const [src, setSrc] = useState('');
  const [destination, setDestination] = useState('');

  const handleCall = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/call', {
        src,
        destination,
      });
      console.log('Call response:', response.data);
    } catch (error) {
      console.error('Error initiating call:', error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Source Number"
        value={src}
        onChange={(e) => setSrc(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination Number"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleCall}>Initiate Call</button>
    </div>
  );
};

export default Kavkom;
