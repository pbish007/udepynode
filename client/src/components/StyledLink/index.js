// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledRouterLink: React.StatelessFunctionalComponent<any> = styled(Link)`
  &:hover {
    text-decoration: none;
    color: inherit;
    opacity: 0.9;
  }
`;
