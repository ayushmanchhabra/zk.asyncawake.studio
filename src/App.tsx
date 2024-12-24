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
  title: string;
  content: string;
};

function App() {

  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');

  const { hash } = useParams();
  const navigate = useNavigate();

  React.useEffect(function () {
    if (hash !== undefined) {
      const decoded = decode(hash);
      const decompressed = decompress(decoded);
      const newState: AppSchema = JSON.parse(decompressed);
      setTitle(newState.title);
      setContent(newState.content);
    }
  }, [hash]);

  const handleTitleChange = React.useCallback(function (event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }, []);

  const handleContentChange = React.useCallback(function (event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }, []);

  const handleSaveAction = React.useCallback(function (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      const stateString = JSON.stringify({ title, content });
      const compressed = compress(stateString);
      const encoded = encode(compressed);
      navigate('/' + encoded);
    }
  }, [navigate, title, content]);

  return (window.innerHeight >= 500 && window.innerWidth >= 800 ? (
    <>
      <input
        className='w-full'
        onChange={handleTitleChange}
        onKeyDown={handleSaveAction}
        placeholder='Untitled'
        value={title}
      />
      <textarea
        className='h-full w-full'
        data-testid='textarea'
        onChange={handleContentChange}
        onKeyDown={handleSaveAction}
        placeholder='Type something, press Ctrl+S, copy URL and share to someone.'
        value={content}
      />
    </>
  ) : (
    <>Tablets and mobile screens are not yet supported. Please use a laptop or desktop.</>
  )
  )
}

export default App
