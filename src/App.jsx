import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, styled } from '@mui/system';
import EmojiByType from './components/EmojiByType';

const theme = createTheme();

const StyledContainer = styled(Container)({
  marginTop: '5%',
});

const App = () => {

  const emoji = [
    {name: 'UI', emoji: '🔮'},
    {name: 'Update', emoji: '🔥'},
    {name: 'Bug', emoji: '🐛'},
    {name: 'New', emoji: '🆕'},
    {name: 'Fix', emoji: '🐞'},
    {name: 'Docs', emoji: '📝'},
    {name: 'Test', emoji: '✅'},
    {name: 'Breaking', emoji: '💥'},
    {name: 'Build', emoji: '📦'},
    {name: 'Upgrade', emoji: '⬆️'},
    {name: 'Chore', emoji: '🧹'},
    {name: 'Revert', emoji: '⏪'},
    {name: 'WIP', emoji: '🚧'},
    {name: 'Release', emoji: '🏷️'},
    {name: 'Deprecate', emoji: '🗑️'},
    {name: 'Security', emoji: '🔒'},
    {name: 'Refactor', emoji: '♻️'},
    {name: 'Config', emoji: '🔧'}
  ]

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer maxWidth="sm">
        <EmojiByType emojis={emoji} />
      </StyledContainer>
    </ThemeProvider>
  );
};

export default App;
