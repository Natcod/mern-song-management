import { useEffect } from 'react';
import styled from '@emotion/styled';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { theme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchStatsRequest } from '../../store/slices/statsSlice';
import { capitalizeFirst } from '../../utils/formatters';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: ${theme.colors.white};
  padding: 1.5rem;
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.md};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  font-weight: 600;
  text-transform: uppercase;
`;

const StatValue = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary};
  font-weight: bold;
`;

const ChartCard = styled.div`
  background: ${theme.colors.white};
  padding: 1.5rem;
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.md};
`;

const ChartTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
`;

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
  border-radius: ${theme.radii.md};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const InfoCard = styled.div`
  background: ${theme.colors.white};
  padding: 1.5rem;
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.md};
`;

const InfoTitle = styled.h4`
  margin: 0 0 1rem 0;
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.primary};
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${theme.colors.gray[200]};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: ${theme.colors.text.secondary};
`;

const InfoValue = styled.span`
  color: ${theme.colors.text.primary};
  font-weight: 600;
`;

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444'];

export const StatsSection = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.stats);

  useEffect(() => {
    dispatch(fetchStatsRequest());
  }, [dispatch]);

  if (loading) {
    return <LoadingContainer>Loading statistics...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>Error: {error}</ErrorContainer>;
  }

  if (!data) {
    return <LoadingContainer>No statistics available</LoadingContainer>;
  }

  // Prepare data for charts
  const genreData = Object.entries(data.songsPerGenre).map(([name, value]) => ({
    name: capitalizeFirst(name),
    songs: value,
  }));

  const artistData = Object.entries(data.songsPerArtist)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, value]) => ({
      name,
      songs: value,
    }));

  const albumData = Object.entries(data.songsPerAlbum)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, value]) => ({
      name,
      songs: value,
    }));

  const genreDistributionData = Object.entries(data.genreDistribution).map(([name, value]) => ({
    name: capitalizeFirst(name),
    value: parseFloat(value),
  }));

  return (
    <Container>
      {/* Totals */}
      <StatsGrid>
        <StatCard>
          <StatLabel>Total Songs</StatLabel>
          <StatValue>{data.totals.songs}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Artists</StatLabel>
          <StatValue>{data.totals.artists}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Albums</StatLabel>
          <StatValue>{data.totals.albums}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Genres</StatLabel>
          <StatValue>{data.totals.genres}</StatValue>
        </StatCard>
      </StatsGrid>

      {/* Charts */}
      <ChartCard>
        <ChartTitle>Songs per Genre</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={genreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="songs" fill={theme.colors.primary} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard>
        <ChartTitle>Top 10 Artists by Song Count</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={artistData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="songs" fill={theme.colors.secondary} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard>
        <ChartTitle>Top 10 Albums by Song Count</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={albumData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="songs" fill={theme.colors.success} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard>
        <ChartTitle>Genre Distribution</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={genreDistributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {genreDistributionData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Additional Info */}
      <InfoGrid>
        <InfoCard>
          <InfoTitle>Top Insights</InfoTitle>
          <InfoItem>
            <InfoLabel>Most Common Genre:</InfoLabel>
            <InfoValue>{data.mostCommonGenre ? capitalizeFirst(data.mostCommonGenre) : 'N/A'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Least Common Genre:</InfoLabel>
            <InfoValue>{data.leastCommonGenre ? capitalizeFirst(data.leastCommonGenre) : 'N/A'}</InfoValue>
          </InfoItem>
          {data.topArtist && (
            <InfoItem>
              <InfoLabel>Top Artist:</InfoLabel>
              <InfoValue>{data.topArtist.name} ({data.topArtist.songs} songs)</InfoValue>
            </InfoItem>
          )}
        </InfoCard>

        <InfoCard>
          <InfoTitle>Albums per Artist (Top 5)</InfoTitle>
          {Object.entries(data.albumsPerArtist)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([artist, count]) => (
              <InfoItem key={artist}>
                <InfoLabel>{artist}:</InfoLabel>
                <InfoValue>{count} album{count !== 1 ? 's' : ''}</InfoValue>
              </InfoItem>
            ))}
        </InfoCard>
      </InfoGrid>
    </Container>
  );
};
