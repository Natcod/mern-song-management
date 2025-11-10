import styled from '@emotion/styled';
import { space } from 'styled-system';
import type { SpaceProps } from 'styled-system';

interface ContainerProps extends SpaceProps {
  maxWidth?: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${props => props.maxWidth || '1280px'};
  margin: 0 auto;
  padding: 0 1rem;
  ${space}
`;
