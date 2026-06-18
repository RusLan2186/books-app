import { useState, useEffect } from 'react';
import { DataGrid, type GridCellParams, type GridSortModel, type GridFilterModel } from '@mui/x-data-grid';
import type { Book } from '../../types';
import { bookColumns } from './columns';
import BookDetailsModal from '../BookDetailsModal/BookDetailsModal';
import ImagePreviewModal from '../ImagePreviewModal/ImagePreviewModal';

interface BooksTableProps {
  books: Book[];
  loading: boolean;
}

const STORAGE_KEY_SORT = 'books-table-sort';
const STORAGE_KEY_FILTER = 'books-table-filter';

function BooksTable({ books, loading }: BooksTableProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const [sortModel, setSortModel] = useState<GridSortModel>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SORT);
    return saved ? JSON.parse(saved) : [];
  });

  const [filterModel, setFilterModel] = useState<GridFilterModel>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_FILTER);
    return saved ? JSON.parse(saved) : { items: [] };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SORT, JSON.stringify(sortModel));
  }, [sortModel]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FILTER, JSON.stringify(filterModel));
  }, [filterModel]);

  const handleCellClick = (params: GridCellParams<Book>) => {
    if (params.field === 'coverUrlMedium' && params.row.coverUrlLarge) {
      setPreviewImageUrl(params.row.coverUrlLarge);
    } else {
      setSelectedBook(params.row);
    }
  };

  return (
    <>
      <DataGrid
        rows={books}
        columns={bookColumns}
        loading={loading}
        getRowHeight={() => 'auto'}
        onCellClick={handleCellClick}
        disableRowSelectionOnClick
        sortModel={sortModel}
        onSortModelChange={(newModel) => setSortModel(newModel)}
        filterModel={filterModel}
        onFilterModelChange={(newModel) => setFilterModel(newModel)}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        sx={{
          border: 'none',
          bgcolor: 'background.paper',
          boxShadow: 2,
          borderRadius: 2,
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
          },
          '& .MuiDataGrid-cell': {
            py: 1.5,
            borderColor: 'divider',
            '&:focus': {
              outline: 'none',
            },
          },
        }}
      />

      <BookDetailsModal
        isOpen={Boolean(selectedBook)}
        onClose={() => setSelectedBook(null)}
        book={selectedBook}
      />

      <ImagePreviewModal
        isOpen={Boolean(previewImageUrl)}
        onClose={() => setPreviewImageUrl(null)}
        imageUrl={previewImageUrl}
      />
    </>
  );
}

export default BooksTable;