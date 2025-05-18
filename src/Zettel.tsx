import { Backdrop, Box, IconButton, Link, TextField, Tooltip, Typography } from '@mui/material';
import { SaveAlt as SaveIcon, QrCodeScanner } from '@mui/icons-material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QRCodeSVG as QR } from 'qrcode.react';

import style from './Zettel.module.css';

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

export default function Zettel() {

  const [content, setContent] = React.useState<string>('');
  const [isQRVisible, setIsQRVisible] = React.useState<boolean>(false);

  const { hash } = useParams();
  const navigate = useNavigate();

  React.useEffect(function () {
    if (hash !== undefined) {
      const decoded = decode(hash);
      const decompressed = decompress(decoded);
      const newState: AppSchema = JSON.parse(decompressed);
      setContent(newState.content);
    }
  }, [hash]);

  const handleContentChange = React.useCallback(function (event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }, []);

  const handleSaveAction = React.useCallback(function (event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      const encoded = save({ content })
      navigate('/' + encoded);
    }
  }, [navigate, content]);

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
    <Box className={style.Box}>
      <Box className={style.Header}>
        <Tooltip sx={{position: 'absolute', left: 10 }} title='Just another zettelkasten'>
          <Typography className={style.Title}>[zk]</Typography>
        </Tooltip>
        <Tooltip title='Generate QR Code'>
          <IconButton
            className={style.Button}
            data-testid='qr'
            onClick={handleQRVisibleChange}
          >
            <QrCodeScanner fontSize='large' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Save'>
          <IconButton
            className={style.Button}
            data-testid='save'
            onClick={() => {
              const encoded = save({ content });
              navigate('/' + encoded);
            }}
          >
            <SaveIcon fontSize='large' />
          </IconButton>
        </Tooltip>
      </Box>
      <TextField
        multiline
        data-testid='content'
        onChange={handleContentChange}
        onKeyDown={handleSaveAction}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '0px',
              padding: '0px',
            },
          },
        }}
        placeholder='Start your knowledge base right here in your browser. Type something, press Ctrl+S (or the top right icon if you are on mobile), copy URL and share to someone.'
        value={content}

      />
      <Typography
        className={style.Footer}
        data-testid='footer'
      >
        <Link href="https://github.com/ayushmanchhabra/zk.asyncawake.studio" rel="noopener noreferrer" target="_blank">About</Link> |
        <Link href="https://github.com/ayushmanchhabra/zk.asyncawake.studio/blob/main/CHANGELOG.md" rel="noopener noreferrer" target="_blank">Changelog</Link> |
        <Link href="https://asyncawake.studio" rel="noopener noreferrer" target="_blank">(c) Async Awake Studio</Link>
      </Typography>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        className={style.Overlay}
        data-testid='overlay'
        open={isQRVisible}
        onClick={handleQRVisibleChange}
      >
        <QR
          bgColor='grey'
          fgColor='#000'
          marginSize={2}
          value={window.location.href}
        />
        <Typography>Scan now to share!</Typography>
      </Backdrop>
    </Box>
  )
}
