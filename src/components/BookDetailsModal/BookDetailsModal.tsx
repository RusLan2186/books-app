import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Divider,
  Paper,
  Stack,
  Chip,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Book } from '../../types';

interface BookDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ isOpen, onClose, book }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!isOpen || !book) return null;

  const handleClose = () => {
    setIsImageLoading(true);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: { sx: { borderRadius: 2 } }
      }}
    >
      <DialogTitle sx={{ pr: 6 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 700, fontFamily: 'Georgia, serif' }}>
          {book.title}
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Paper
            elevation={3}
            sx={{
              width: { xs: '100%', md: 240 },
              minHeight: 300,
              height: 'fit-content',
              flexShrink: 0,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {isImageLoading && (
              <CircularProgress size={40} sx={{ position: 'absolute' }} />
            )}
            <Box
              component="img"
              src={book.coverUrlLarge || book.coverUrlMedium || ''}
              alt={book.title}
              onLoad={() => setIsImageLoading(false)}
              sx={{ 
                width: '100%', 
                display: 'block',
                visibility: isImageLoading ? 'hidden' : 'visible'
              }}
            />
          </Paper>

          <Stack spacing={2} sx={{ flex: 1 }}>
            <Box>
              <Typography variant="overline" color="text.secondary">Author</Typography>
              <Typography variant="h6">{book.author}</Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="overline" color="text.secondary">Publication</Typography>
              <Typography variant="body1">
                First published in {book.firstPublishYear || 'Unknown'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total editions: {book.editionCount}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="overline" color="text.secondary">Subjects</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                {book.description.split(', ').map((subject) => (
                  <Chip
                    key={subject}
                    label={subject}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                ))}
              </Box>
            </Box>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailsModal;
