import React, { useState } from 'react';
import { Grid, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/system';

const RootContainer = styled('div')({
  textAlign: 'center',
  maxWidth: '600px',
  margin: '0 auto',
  paddingTop: '16px',
});

const Emoji = styled('span')({
  fontSize: '2rem',
  marginRight: '8px',
});

const CopyMessage = styled('div')({
  margin: '16px 0',
  padding: '8px',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
  color: '#555555',
  fontWeight: 'bold',
});

const EmojiByType = ({ emojis }) => {
  const [copiedEmoji, setCopiedEmoji] = useState(null);

  const handleCopy = (emoji) => {
    navigator.clipboard.writeText(emoji.emoji);
    setCopiedEmoji(emoji);
  };

  return (
    <RootContainer>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#7289da' }}>
        Git Commit Emoji
      </Typography>
      {copiedEmoji && (
        <CopyMessage>
          Copied to clipboard: {copiedEmoji.name} {copiedEmoji.emoji}
        </CopyMessage>
      )}
      <Grid container spacing={2}>
        {emojis.map((emoji, index) => (
          <Grid item xs={6} sm={4} key={index}>
            <ListItem
              button
              onClick={() => handleCopy(emoji)}
              sx={{
                cursor: 'pointer',
                borderRadius: '8px',
                p: 1,
                backgroundColor: '#36393e',
                border: '1px solid #7289da',
              }}
            >
              <Emoji>{emoji.emoji}</Emoji>
              <Typography component="span" style={{ color: '#fff' }}>
                {emoji.name}
              </Typography>
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </RootContainer>
  );
};

export default EmojiByType;
