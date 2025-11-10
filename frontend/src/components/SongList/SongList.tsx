import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchSongsRequest, createSongRequest, updateSongRequest, deleteSongRequest, setPage } from '../../store/slices/songsSlice';
import { SongListItem } from './SongListItem';
import { SongForm } from '../SongForm/SongForm';
import type { Song } from '../../types/Song';

const Container = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.text.primary};
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: ${theme.colors.gray[50]};
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  border-bottom: 2px solid ${theme.colors.gray[200]};
`;

const TableBody = styled.tbody``;

const LoadingContainer = styled.div`
  padding: 3rem;
  text-align: center;
  color: ${theme.colors.text.secondary};
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${theme.colors.danger};
  background: ${theme.colors.danger}10;
  margin: 1rem;
  border-radius: ${theme.radii.md};
`;

const EmptyContainer = styled.div`
  padding: 3rem;
  text-align: center;
  color: ${theme.colors.text.secondary};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${theme.colors.gray[200]};
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
`;

export const SongList = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error, pagination } = useAppSelector(state => state.songs);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch, pagination.page]);

  const handleAddSong = () => {
    setEditingSong(null);
    setIsFormOpen(true);
  };

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
    setIsFormOpen(true);
  };

  const handleDeleteSong = (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSongRequest(id));
    }
  };

  const handleFormSubmit = (data: { title: string; artist: string; album: string; genre: string }) => {
    if (editingSong) {
      dispatch(updateSongRequest({ id: editingSong._id, data }));
    } else {
      dispatch(createSongRequest(data));
    }
    setIsFormOpen(false);
    setEditingSong(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingSong(null);
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      dispatch(setPage(pagination.page - 1));
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      dispatch(setPage(pagination.page + 1));
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Songs ({pagination.totalSongs})</Title>
          <AddButton onClick={handleAddSong}>+ Add Song</AddButton>
        </Header>

        {error && <ErrorContainer>Error: {error}</ErrorContainer>}

        {loading ? (
          <LoadingContainer>Loading songs...</LoadingContainer>
        ) : list.length === 0 ? (
          <EmptyContainer>
            No songs found. Add your first song to get started!
          </EmptyContainer>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <tr>
                    <TableHeader>Title</TableHeader>
                    <TableHeader>Artist</TableHeader>
                    <TableHeader>Album</TableHeader>
                    <TableHeader>Genre</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </tr>
                </TableHead>
                <TableBody>
                  {list.map((song) => (
                    <SongListItem
                      key={song._id}
                      song={song}
                      onEdit={handleEditSong}
                      onDelete={handleDeleteSong}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {pagination.totalPages > 1 && (
              <PaginationContainer>
                <PaginationButton
                  onClick={handlePreviousPage}
                  disabled={pagination.page === 1}
                >
                  Previous
                </PaginationButton>
                <PaginationInfo>
                  Page {pagination.page} of {pagination.totalPages}
                </PaginationInfo>
                <PaginationButton
                  onClick={handleNextPage}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                </PaginationButton>
              </PaginationContainer>
            )}
          </>
        )}
      </Container>

      <SongForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        song={editingSong}
        loading={loading}
      />
    </>
  );
};
