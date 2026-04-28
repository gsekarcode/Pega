import { useState } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
import type { PConnLayoutProps } from './PConnProps';
import {
  StyledWrapper,
  StyledHeader,
  StyledTitle,
  StyledChevron,
  StyledBody,
  StyledRegion
} from './styles';

interface CollapsibleLayoutProps extends PConnLayoutProps {
  heading?: string;
  headerBackground?: string;
  /** Whether the section can be collapsed by the user */
  collapsible?: boolean | string;
  /** Default visual state when collapsible is enabled: "expanded" | "collapsed" */
  defaultBehaviour?: 'expanded' | 'collapsed';
  children?: any[];
}

const coerceBool = (val: boolean | string | undefined, fallback: boolean): boolean => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === 'boolean') return val;
  return val === 'true';
};

const ChevronIcon = () => (
  <svg viewBox='0 0 16 16' aria-hidden='true'>
    <polyline points='4 6 8 10 12 6' />
  </svg>
);

function DevDXExtensionsCollapsibleLayout(props: CollapsibleLayoutProps) {
  const {
    children = [],
    heading = 'Section',
    headerBackground = '#f8f9fa',
    defaultBehaviour = 'expanded'
  } = props;

  const isCollapsible = coerceBool(props.collapsible, false);

  const [expanded, setExpanded] = useState(defaultBehaviour !== 'collapsed');

  const handleHeaderClick = () => {
    if (isCollapsible) setExpanded(prev => !prev);
  };

  const showBody = !isCollapsible || expanded;

  return (
    <StyledWrapper data-testid='collapsible-layout'>
      <StyledHeader
        $collapsible={isCollapsible}
        $expanded={expanded}
        $background={headerBackground}
        onClick={handleHeaderClick}
        aria-expanded={isCollapsible ? expanded : undefined}
        role={isCollapsible ? 'button' : undefined}
        tabIndex={isCollapsible ? 0 : undefined}
        onKeyDown={e => {
          if (isCollapsible && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setExpanded(prev => !prev);
          }
        }}
      >
        <StyledTitle>{heading}</StyledTitle>

        {isCollapsible && (
          <StyledChevron $expanded={expanded} aria-hidden='true'>
            <ChevronIcon />
          </StyledChevron>
        )}
      </StyledHeader>

      {showBody && (
        <StyledBody data-testid='collapsible-body'>
          {children.map((child: any, index: number) => (
            <StyledRegion key={`region-${index}`} data-testid={`region-${index}`}>
              {child}
            </StyledRegion>
          ))}
        </StyledBody>
      )}
    </StyledWrapper>
  );
}

export default withConfiguration(DevDXExtensionsCollapsibleLayout);
