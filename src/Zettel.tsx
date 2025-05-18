import { Backdrop, Box, IconButton, Link, TextField, Tooltip, Typography } from '@mui/material';
import { ModeEdit as EditModeIcon, Preview as PreviewModeIcon, SaveAlt as SaveIcon, QrCodeScanner } from '@mui/icons-material';
import React from 'react';
import Markdown from 'react-markdown';
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
  const [mode, setMode] = React.useState<'Edit' | 'Preview'>('Preview');

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

  const handleModeChange = React.useCallback(function () {
    setMode(mode === 'Edit' ? 'Preview' : 'Edit');
  }, [mode]);

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
        <Tooltip sx={{ position: 'absolute', left: 10 }} title='Just another zettelkasten'>
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
        <Tooltip title={mode === 'Edit' ? 'Preview' : 'Edit'}>
          <IconButton
            className={style.Button}
            data-testid='mode'
            onClick={handleModeChange}
          >
            {mode === 'Edit' ? <PreviewModeIcon fontSize='large' /> : <EditModeIcon fontSize='large' />}
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
      {mode === 'Edit' ? (
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
          placeholder='Start your knowledge base right here in your browser. Press the Edit icon (or middle icon on top right) type something, press Ctrl+S (right icon on top right if on mobile), copy URL and share to someone.'
          value={content}
        />
      ) : (
        <Markdown>{content === "" ? 'Start your knowledge base right here in your browser. Press the Edit icon (or middle icon on top right) type something, press Ctrl+S (right icon on top right if on mobile), copy URL and share to someone.' : content}</Markdown>
      )}

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
