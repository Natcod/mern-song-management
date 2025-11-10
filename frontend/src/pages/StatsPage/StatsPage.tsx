import styled from '@emotion/styled';
import { Container } from '../../components/Layout/Container';
import { StatsSection } from '../../components/StatsSection/StatsSection';
import { theme } from '../../theme';

const PageContainer = styled.div`
  min-height: calc(100vh - 80px);
  background: ${theme.colors.background.secondary};
  padding: 2rem 0;
`;

const Title = styled.h1`
  margin: 0 0 2rem 0;
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.text.primary};
`;

export const StatsPage = () => {
  return (
    <PageContainer>
      <Container>
        <Title>Statistics Dashboard</Title>
        <StatsSection />
      </Container>
    </PageContainer>
  );
};
