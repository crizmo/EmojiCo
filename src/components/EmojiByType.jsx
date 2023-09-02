import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
  const [copyCounts, setCopyCounts] = useState({});

  useEffect(() => {
    // Fetch copy counts from Supabase when the component mounts
    const fetchCopyCounts = async () => {
      try {
        const { data, error } = await supabase.from('emojis').select('name, copy_count');
        if (error) {
          throw error;
        }
        const counts = {};
        data.forEach((emoji) => {
          counts[emoji.name] = emoji.copy_count;
        });
        setCopyCounts(counts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCopyCounts();
  }, []);

  const handleCopy = async (emoji) => {
    try {
      navigator.clipboard.writeText(emoji.emoji);
      setCopiedEmoji(emoji);
  
      // Update the copy count in Supabase
      const updatedCopyCount = (copyCounts[emoji.name] || 0) + 1;
  
      // Send an upsert request to Supabase and wait for the response
      const { data, error } = await supabase.from('emojis').upsert([
        {
          name: emoji.name,
          copy_count: updatedCopyCount,
        },
      ]);
  
      if (error) {
        throw error;
      }
  
      // Update the local copy count
      setCopyCounts((prevCounts) => ({
        ...prevCounts,
        [emoji.name]: updatedCopyCount,
      }));
    } catch (error) {
      console.error(error);
    }
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
            <Typography
              variant="caption"
              component="span"
              sx={{ color: '#fff', display: 'block', textAlign: 'right' }}
            >
              {copyCounts[emoji.name] || 0} copied
            </Typography>
          </Grid>
        ))}
      </Grid>
    </RootContainer>
  );
};

export default EmojiByType;
