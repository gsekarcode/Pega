import { render, screen } from '@testing-library/react';
import DevDXExtensionsTwoColumnForm from './index';

const makePConnect = (inheritedProps = {}) => () => ({
  getInheritedProps: () => inheritedProps,
  getChildren: () => [],
  createComponent: (config: any) => config
});

const regionA = <div data-testid='region-a-content'>Region A Content</div>;
const regionB = <div data-testid='region-b-content'>Region B Content</div>;

describe('DevDXExtensionsTwoColumnForm', () => {
  test('renders both regions', () => {
    render(
      <DevDXExtensionsTwoColumnForm
        label='Test Form'
        showLabel
        leftColWidth='50'
        rightColWidth='50'
        getPConnect={makePConnect()}
      >
        {[regionA, regionB]}
      </DevDXExtensionsTwoColumnForm>
    );
    expect(screen.getByTestId('region-a-content')).toBeVisible();
    expect(screen.getByTestId('region-b-content')).toBeVisible();
  });

  test('renders form label when showLabel is true', () => {
    render(
      <DevDXExtensionsTwoColumnForm
        label='My Section'
        showLabel
        leftColWidth='50'
        rightColWidth='50'
        getPConnect={makePConnect()}
      >
        {[regionA, regionB]}
      </DevDXExtensionsTwoColumnForm>
    );
    expect(screen.getByText('My Section')).toBeVisible();
  });

  test('does not render label when showLabel is false', () => {
    render(
      <DevDXExtensionsTwoColumnForm
        label='Hidden Label'
        showLabel={false}
        leftColWidth='50'
        rightColWidth='50'
        getPConnect={makePConnect()}
      >
        {[regionA, regionB]}
      </DevDXExtensionsTwoColumnForm>
    );
    expect(screen.queryByText('Hidden Label')).toBeNull();
  });

  test('applies 25/75 column widths from props', () => {
    render(
      <DevDXExtensionsTwoColumnForm
        label='Narrow Left'
        showLabel
        leftColWidth='25'
        rightColWidth='75'
        getPConnect={makePConnect()}
      >
        {[regionA, regionB]}
      </DevDXExtensionsTwoColumnForm>
    );
    const grid = screen.getByTestId('two-column-grid');
    expect(grid).toBeVisible();
  });

  test('applies widths from inherited props when own props are absent', () => {
    render(
      <DevDXExtensionsTwoColumnForm
        label='Inherited'
        showLabel
        getPConnect={makePConnect({ leftColWidth: '30%', rightColWidth: '70%' })}
      >
        {[regionA, regionB]}
      </DevDXExtensionsTwoColumnForm>
    );
    expect(screen.getByTestId('region-a-content')).toBeVisible();
    expect(screen.getByTestId('region-b-content')).toBeVisible();
  });

  test('renders region-a and region-b containers', () => {
    render(
      <DevDXExtensionsTwoColumnForm
        label='Test'
        showLabel
        leftColWidth='50'
        rightColWidth='50'
        getPConnect={makePConnect()}
      >
        {[regionA, regionB]}
      </DevDXExtensionsTwoColumnForm>
    );
    expect(screen.getByTestId('region-a')).toBeVisible();
    expect(screen.getByTestId('region-b')).toBeVisible();
  });
});
