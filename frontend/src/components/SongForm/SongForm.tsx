import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { theme } from '../../theme';
import type { Song } from '../../types/Song';

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: ${theme.colors.white};
  padding: 2rem;
  border-radius: ${theme.radii.xl};
  box-shadow: ${theme.shadows.xl};
  width: 90%;
  max-width: 500px;
`;

const Title = styled.h2`
  margin: 0 0 1.5rem 0;
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes['2xl']};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const ErrorText = styled.span`
  color: ${theme.colors.danger};
  font-size: ${theme.fontSizes.sm};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface SongFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; artist: string; album: string; genre: string }) => void;
  song?: Song | null;
  loading?: boolean;
}

export const SongForm = ({ isOpen, onClose, onSubmit, song, loading }: SongFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title,
        artist: song.artist,
        album: song.album,
        genre: song.genre,
      });
    } else {
      setFormData({ title: '', artist: '', album: '', genre: '' });
    }
    setErrors({});
  }, [song, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.artist.trim()) newErrors.artist = 'Artist is required';
    if (!formData.album.trim()) newErrors.album = 'Album is required';
    if (!formData.genre.trim()) newErrors.genre = 'Genre is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <Modal>
        <Title>{song ? 'Edit Song' : 'Add New Song'}</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Title *</Label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter song title"
            />
            {errors.title && <ErrorText>{errors.title}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Artist *</Label>
            <Input
              type="text"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              placeholder="Enter artist name"
            />
            {errors.artist && <ErrorText>{errors.artist}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Album *</Label>
            <Input
              type="text"
              value={formData.album}
              onChange={(e) => setFormData({ ...formData, album: e.target.value })}
              placeholder="Enter album name"
            />
            {errors.album && <ErrorText>{errors.album}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Genre *</Label>
            <Input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              placeholder="Enter genre (e.g., rock, pop, jazz)"
            />
            {errors.genre && <ErrorText>{errors.genre}</ErrorText>}
          </InputGroup>

          <ButtonGroup>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : song ? 'Update' : 'Create'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  );
};
