import { Box, Chip, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import type { Book } from '../../types';

export const bookColumns: GridColDef<Book>[] = [
  {
    field: 'coverUrlMedium',
    headerName: 'Cover',
    width: 160,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      if (!params.value) {
        return <span>No cover</span>;
      }
      return (
        <Box
          component="img"
          src={params.value}
          alt="cover"
          sx={{
            maxHeight: 280,
            maxWidth: '100%',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      );
    },
  },
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    minWidth: 200,
    renderCell: (params) => (
      <Box
        sx={{
          maxHeight: 280,
          overflow: 'auto',
          py: 1,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'primary.dark',
          }}
        >
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'author',
    headerName: 'Author',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Box
        sx={{
          maxHeight: 280,
          overflow: 'auto',
          py: 1,
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        }}
      >
        <Typography
          sx={{
            fontStyle: 'italic',
            color: 'text.secondary',
            fontSize: '0.9rem',
          }}
        >
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'description',
    headerName: 'Subjects',
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => (
      <Box
        sx={{
          maxHeight: 280,
          overflow: 'auto',
          py: 1,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.5,
          alignContent: 'flex-start',
        }}
      >
        {params.value
          .split(', ')
          .map((subject: string) => (
            <Chip
              key={subject}
              label={subject}
              size="small"
              variant="outlined"
              color="secondary"
              sx={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
             
            
            }}
            />
          ))}
      </Box>
    ),
  },
  {
    field: 'firstPublishYear',
    headerName: 'First Published',
    type: 'number',
    width: 140,
  },
  {
    field: 'editionCount',
    headerName: 'Editions',
    type: 'number',
    width: 110,
  },
];