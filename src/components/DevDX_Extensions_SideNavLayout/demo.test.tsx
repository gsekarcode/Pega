import { render, screen, fireEvent } from '@testing-library/react';
import { DevDXExtensionsSideNavLayout } from './index';

const makePConnect = () => () => ({
  getInheritedProps: () => ({}),
  getContextName: () => 'test_context',
  getActionsApi: () => ({ createWork: jest.fn() })
});

const slotA = <div data-testid='slot-a'>Create Case View</div>;
const slotB = <div data-testid='slot-b'>Search View</div>;
const slotC = <div data-testid='slot-c'>Reports View</div>;

describe('DevDXExtensionsSideNavLayout', () => {
  test('renders all configured nav labels', () => {
    render(
      <DevDXExtensionsSideNavLayout navLabel1='Create Case' navLabel2='Search' navLabel3='Reports' getPConnect={makePConnect()}>
        {[slotA, slotB, slotC]}
      </DevDXExtensionsSideNavLayout>
    );
    expect(screen.getByRole('button', { name: 'Create Case' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Search' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Reports' })).toBeVisible();
  });

  test('first nav item is selected and its content shown by default', () => {
    render(
      <DevDXExtensionsSideNavLayout navLabel1='Create Case' navLabel2='Search' getPConnect={makePConnect()}>
        {[slotA, slotB]}
      </DevDXExtensionsSideNavLayout>
    );
    expect(screen.getByRole('button', { name: 'Create Case' })).toHaveAttribute('data-active', 'true');
    expect(screen.getByTestId('slot-a')).toBeVisible();
    expect(screen.queryByTestId('slot-b')).toBeNull();
  });

  test('clicking a nav item switches content', () => {
    render(
      <DevDXExtensionsSideNavLayout navLabel1='Create Case' navLabel2='Search' navLabel3='Reports' getPConnect={makePConnect()}>
        {[slotA, slotB, slotC]}
      </DevDXExtensionsSideNavLayout>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByTestId('slot-b')).toBeVisible();
    expect(screen.queryByTestId('slot-a')).toBeNull();
    expect(screen.getByRole('button', { name: 'Search' })).toHaveAttribute('data-active', 'true');
  });

  test('nav items without a label are excluded', () => {
    render(
      <DevDXExtensionsSideNavLayout navLabel1='Create Case' navLabel3='Reports' getPConnect={makePConnect()}>
        {[slotA, slotB, slotC]}
      </DevDXExtensionsSideNavLayout>
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.queryByRole('button', { name: 'Search' })).toBeNull();
  });

  test('shows empty state when active slot has no content', () => {
    render(
      <DevDXExtensionsSideNavLayout navLabel1='Create Case' navLabel2='Search' getPConnect={makePConnect()}>
        {[slotA, undefined]}
      </DevDXExtensionsSideNavLayout>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText('No content configured for this navigation item.')).toBeVisible();
  });

  test('nav panel has navigation landmark', () => {
    render(
      <DevDXExtensionsSideNavLayout navLabel1='Create Case' getPConnect={makePConnect()}>
        {[slotA]}
      </DevDXExtensionsSideNavLayout>
    );
    expect(screen.getByRole('navigation', { name: 'Page navigation' })).toBeVisible();
  });
});
