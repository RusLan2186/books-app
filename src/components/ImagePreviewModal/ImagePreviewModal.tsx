import React, { useState } from 'react';
import { Box, IconButton, Modal, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ isOpen, onClose, imageUrl }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!isOpen || !imageUrl) return null;

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleClose = () => {
    setIsImageLoading(true);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '90vh',
          minWidth: { xs: '80vw', md: 400 }, 
          minHeight: { xs: '50vh', md: 500 }, 
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 1,
          borderRadius: 2,
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {isImageLoading && (
          <CircularProgress color="primary" />
        )}
        {!isImageLoading && (
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 10,
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.6)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <Box
          component="img"
          src={imageUrl}
          alt="Book cover preview"
          onLoad={handleImageLoad}
          sx={{
            maxWidth: '100%',
            maxHeight: 'calc(90vh - 20px)',
            display: 'block',
            objectFit: 'contain',
            opacity: isImageLoading ? 0 : 1,
            transform: isImageLoading ? 'scale(0.95)' : 'scale(1)',
            transition: 'opacity 0.5s ease-in-out, transform 0.3s ease-out',
          }}
        />
      </Box>
    </Modal>
  );
};

export default ImagePreviewModal;
