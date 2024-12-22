import React from 'react';

import './App.css';
import { useNavigate, useParams } from 'react-router-dom';

function encode(data: string) {
  return window.btoa(data);
}

function decode(data: string) {
  return window.atob(data);
}

function compress(data: string) {
  return data;
}

function decompress(data: string) {
  return data;
}
type AppSchema = {
  content: string;
};

function App() {

  const [state, setState] = React.useState<AppSchema>({ content: '' });

  const { hash } = useParams();
  const navigate = useNavigate();

  React.useEffect(function () {
    if (hash !== undefined) {
      const decoded = decode(hash);
      const decompressed = decompress(decoded);
      const newState = JSON.parse(decompressed);
      setState(newState);
    }
  }, [hash]);

  const handleStateChange = React.useCallback(function (event: React.ChangeEvent<HTMLTextAreaElement>) {
    setState({ content: event.target.value });
  }, []);

  const handleSaveAction = React.useCallback(function (event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      const stateString = JSON.stringify(state);
      const compressed = compress(stateString);
      const encoded = encode(compressed);
      navigate('/' + encoded);
    }
  }, [navigate, state]);

  return (window.innerHeight >= 500 && window.innerWidth >= 800 ? (
    <textarea
      className='h-full w-full'
      data-testid='textarea'
      onChange={handleStateChange}
      onKeyDown={handleSaveAction}
      placeholder='Type something, Ctrl+S, copy URL and share to someone.'
      value={state.content}
    />
  ) : (
    <>Tablets and mobile screens are not yet supported. Please use a laptop or desktop.</>
  )
  )
}

export default App
