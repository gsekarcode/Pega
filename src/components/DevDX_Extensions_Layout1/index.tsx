import { withConfiguration } from '@pega/cosmos-react-core';
import type { PConnLayoutProps } from './PConnProps';
import StyledLayout from './styles';

// Interface for props
interface DevDXExtensionsLayout1Props extends PConnLayoutProps {
  layoutMode?: 'TWO_COLUMN' | 'THREE_COLUMN' | 'SINGLE_COLUMN';
  columnGap?: string;
  rowGap?: string;
  children?: any[];
}

/**
 * DevDX_Extensions_Layout1 - A flexible layout component for Pega Constellation
 * Supports multiple layout modes and configurable spacing
 */
function DevDXExtensionsLayout1(props: DevDXExtensionsLayout1Props) {
  const {
    children = [],
    getPConnect,
    layoutMode = 'TWO_COLUMN',
    columnGap = '16',
    rowGap = '16',
    displayMode
  } = props;

  // Get inherited props from the parent component
  const inherited = (getPConnect().getInheritedProps() || {}) as any;
  const mode = (layoutMode as string) || inherited.layoutMode || 'TWO_COLUMN';

  // Normalize spacing values
  const normalizeSpacing = (value: string): string => {
    const s = String(value ?? '').trim();
    if (/^\d+$/.test(s)) return `${s}px`;
    return s || '16px';
  };

  const gap = normalizeSpacing(columnGap);
  const rowGapValue = normalizeSpacing(rowGap);

  // Convert layout mode to class name
  const layoutClass = `layout-${mode.toLowerCase()}`;

  // Determine if in read-only or display-only mode
  const isReadOnly = displayMode === 'DISPLAY_ONLY';

  return (
    <StyledLayout
      className={layoutClass}
      style={{
        gap: `${gap} ${rowGapValue}`,
        opacity: isReadOnly ? 0.85 : 1
      }}
      data-testid={`layout-${mode}`}
    >
      {children.map((child: any, index: number) => {
        const regionKey = `region-${mode}-${index}`;
        return (
          <div
            key={regionKey}
            className="layout-region"
            data-testid={`layout-region-${index}`}
          >
            {child}
          </div>
        );
      })}
    </StyledLayout>
  );
}

export default withConfiguration(DevDXExtensionsLayout1);
