"use client"
import React, { useState, useEffect } from 'react';

interface Voice {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
}

const VoiceComponent = () => {
  const [text, setText] = useState<string>('');
  const [voices, setVoices] = useState<Voice[]>([]);
  console.log(voices)
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  useEffect(() => {
    const speechSynthesis = window.speechSynthesis;
    
    const handleVoicesChanged = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Add an event listener for voiceschanged
    speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    // Initialize voices
    handleVoicesChanged();

    // Cleanup by removing the event listener when the component unmounts
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  const handleConvert = () => {
    // Check if a voice is selected
    if (selectedVoice === '') {
      alert('Please select a voice.');
      return;
    }

    // Use the selected voice for text-to-speech conversion
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    
    if (voice) {
      utterance.voice = voice;
    }

    speechSynthesis.speak(utterance);
  };

  return (
    <div className='flex flex-col gap-2'>
      <p>Convert text to voice</p>
      <select
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
      >
        <option value='' disabled>
          Select a voice
        </option>
        {voices.map((voice, index) => (
          <option value={voice.name} key={index}>
            {`${voice.name} ${voice.lang}`}
          </option>
        ))}
      </select>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='w-[200px] border p-1'
        placeholder='Enter text'
      />
      <button onClick={handleConvert}>Convert to voice</button>
    </div>
  );
};

export default VoiceComponent;
