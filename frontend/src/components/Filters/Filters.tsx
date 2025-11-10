import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFilters, clearFilters, fetchSongsRequest } from '../../store/slices/songsSlice';

const FiltersContainer = styled.div`
  background: ${theme.colors.white};
  padding: 1.5rem;
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.md};
  margin-bottom: 2rem;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.md};
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.variant === 'secondary' ? theme.colors.gray[200] : theme.colors.primary};
  color: ${props => props.variant === 'secondary' ? theme.colors.text.primary : theme.colors.white};

  &:hover {
    background: ${props => props.variant === 'secondary' ? theme.colors.gray[300] : theme.colors.primaryDark};
  }
`;

export const Filters = () => {
  const dispatch = useAppDispatch();
  const currentFilters = useAppSelector(state => state.songs.filters);

  const [localFilters, setLocalFilters] = useState({
    genre: currentFilters.genre || '',
    artist: currentFilters.artist || '',
    album: currentFilters.album || '',
    search: currentFilters.search || '',
  });

  useEffect(() => {
    setLocalFilters({
      genre: currentFilters.genre || '',
      artist: currentFilters.artist || '',
      album: currentFilters.album || '',
      search: currentFilters.search || '',
    });
  }, [currentFilters]);

  const handleApplyFilters = () => {
    const filters: any = {};
    if (localFilters.genre) filters.genre = localFilters.genre.toLowerCase();
    if (localFilters.artist) filters.artist = localFilters.artist;
    if (localFilters.album) filters.album = localFilters.album;
    if (localFilters.search) filters.search = localFilters.search;

    dispatch(setFilters(filters));
    dispatch(fetchSongsRequest());
  };

  const handleClearFilters = () => {
    setLocalFilters({ genre: '', artist: '', album: '', search: '' });
    dispatch(clearFilters());
    dispatch(fetchSongsRequest());
  };

  return (
    <FiltersContainer>
      <FiltersGrid>
        <InputGroup>
          <Label>Search</Label>
          <Input
            type="text"
            placeholder="Search by title, artist, album..."
            value={localFilters.search}
            onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
          />
        </InputGroup>
        <InputGroup>
          <Label>Genre</Label>
          <Input
            type="text"
            placeholder="Filter by genre"
            value={localFilters.genre}
            onChange={(e) => setLocalFilters({ ...localFilters, genre: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
          />
        </InputGroup>
        <InputGroup>
          <Label>Artist</Label>
          <Input
            type="text"
            placeholder="Filter by artist"
            value={localFilters.artist}
            onChange={(e) => setLocalFilters({ ...localFilters, artist: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
          />
        </InputGroup>
        <InputGroup>
          <Label>Album</Label>
          <Input
            type="text"
            placeholder="Filter by album"
            value={localFilters.album}
            onChange={(e) => setLocalFilters({ ...localFilters, album: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
          />
        </InputGroup>
      </FiltersGrid>
      <ButtonGroup>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
        <Button variant="secondary" onClick={handleClearFilters}>Clear Filters</Button>
      </ButtonGroup>
    </FiltersContainer>
  );
};
