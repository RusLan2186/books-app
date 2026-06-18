import { Box, Typography, Container, IconButton } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface HeaderProps {
  mode: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const Header = ({ mode, onThemeToggle }: HeaderProps) => {
  return (
    <Box 
      component="header" 
      sx={{ 
        py: 4, 
        backgroundColor: 'background.paper', 
        borderBottom: '1px solid',
        borderColor: 'divider',
        mb: 3,
        transition: 'all 0.3s ease'
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 800, 
                color: 'primary.main',
                fontFamily: 'Georgia, serif',
                letterSpacing: '-0.5px'
              }}
            >
            Books Catalog
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Discover millions of books, authors, and editions
            </Typography>
          </Box>
          
          <IconButton 
            onClick={onThemeToggle} 
            color="primary"
            sx={{ 
              bgcolor: 'action.hover',
              '&:hover': { bgcolor: 'action.selected' }
            }}
          >
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};
