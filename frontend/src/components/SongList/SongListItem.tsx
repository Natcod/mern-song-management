import styled from '@emotion/styled';
import { theme } from '../../theme';
import type { Song } from '../../types/Song';
import { capitalizeFirst } from '../../utils/formatters';

const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray[200]};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.gray[50]};
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: ${theme.colors.text.primary};
`;

const GenreBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.white};
  border-radius: ${theme.radii.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 0.5rem;
  background: ${props => props.variant === 'delete' ? theme.colors.danger : theme.colors.info};
  color: ${theme.colors.white};

  &:hover {
    opacity: 0.8;
  }

  &:last-child {
    margin-right: 0;
  }
`;

interface SongListItemProps {
  song: Song;
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
}

export const SongListItem = ({ song, onEdit, onDelete }: SongListItemProps) => {
  return (
    <TableRow>
      <TableCell>{song.title}</TableCell>
      <TableCell>{song.artist}</TableCell>
      <TableCell>{song.album}</TableCell>
      <TableCell>
        <GenreBadge>{capitalizeFirst(song.genre)}</GenreBadge>
      </TableCell>
      <TableCell>
        <ActionButton onClick={() => onEdit(song)}>Edit</ActionButton>
        <ActionButton variant="delete" onClick={() => onDelete(song._id)}>Delete</ActionButton>
      </TableCell>
    </TableRow>
  );
};
