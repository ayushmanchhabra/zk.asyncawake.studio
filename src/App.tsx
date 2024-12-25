import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QRCodeSVG as QR } from 'qrcode.react';

import SaveIcon from './save.jpg';
import QRIcon from './qr.png';

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
  const [isQRVisible, setIsQRVisible] = React.useState<boolean>(true);

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
      const encoded = save({ title, content })
      navigate('/' + encoded);
    }
  }, [navigate, title, content]);

  const handleQRVisibleChange = React.useCallback(function () {
    setIsQRVisible(!isQRVisible);
  }, [isQRVisible]);

  function save(data: AppSchema): string {
    const stateString = JSON.stringify(data);
    const compressed = compress(stateString);
    const encoded = encode(compressed);
    return encoded;
  }

  return (
    <>
      <input
        className='w-full'
        data-testid='title'
        onChange={handleTitleChange}
        onKeyDown={handleSaveAction}
        placeholder='SHARE LIST'
        style={{ height: 50, fontSize: 24 }}
        value={title}
      />
      <textarea
        className='min-h-96 w-full'
        data-testid='content'
        onChange={handleContentChange}
        onKeyDown={handleSaveAction}
        placeholder='Share arbitrary information without an intermediatary such as database. Type something, press Ctrl+S, copy URL and share to someone.'
        value={content}
      />
      <span
        className='flex items-center justify-center'
        data-testid='footer'
      >
        <a href="https://github.com/ayushmanchhabra/sharelist.xyz" rel="noopener noreferrer" target="_blank">About</a> |
        <a href="https://ayushmanchhabra.com" rel="noopener noreferrer" target="_blank">(c) Ayushman Chhabra</a>
      </span>
      <button
        className='absolute h-12 w-12 top-5 right-5'
        data-testid='save'
        onClick={() => {
          const encoded = save({ title, content });
          navigate('/' + encoded);
        }}
      >
        <img
          alt="Save Icon"
          height={48}
          src={SaveIcon}
          width={48}
        />
      </button>
      <button
        data-testid='qr'
        onClick={handleQRVisibleChange}
      >
        <img
          alt="QR Icon"
          className='absolute h-12 w-12 top-20 right-5'
          height={48}
          src={QRIcon}
          width={48}
        />
      </button>
      <div
        className='h-full w-full flex flex-col items-center justify-center fixed top-0 left-0 z-2 bg-slate-100'
        data-testid='overlay'
        style={{ display: isQRVisible ? 'flex' : 'none' }}
      >
        <QR
          className='h-48 w-48'
          value={window.location.href}
        />
        <span className='p-2'>Scan now to share!</span>
        <button
          className='p-2 border-2 border-slate-300 cursor-pointer'
          onClick={handleQRVisibleChange}
        >Close</button>
      </div>
    </>
  )
}

export default App
