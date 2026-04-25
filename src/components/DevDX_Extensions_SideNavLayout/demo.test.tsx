import { render, screen, fireEvent, act } from '@testing-library/react';
import { DevDXExtensionsSideNavLayout } from './index';
import { CASE_REQUEST_EVENT } from '../DevDX_Extensions_CaseLauncher/index';

// ── PCore mock factory ────────────────────────────────────────────────────────

type Subscriber = (payload: any) => void;
const subscribers: Record<string, Subscriber> = {};

const setPCore = (caseComponent: any = <div data-testid='case-view'>Case View</div>) => {
  (window as any).PCore = {
    getPubSubUtils: () => ({
      subscribe: (event: string, cb: Subscriber) => {
        subscribers[event] = cb;
      },
      unsubscribe: (event: string) => {
        delete subscribers[event];
      }
    }),
    getViewResources: () => ({
      fetchViewResources: () => ({ type: 'MockCaseView' })
    }),
    createPConnect: () => ({
      getPConnect: () => ({
        getComponent: () => caseComponent
      })
    })
  };
};

// Trigger the subscribed event programmatically
const publishCaseRequest = (className = 'Work-MyApp-Work-Request') => {
  subscribers[CASE_REQUEST_EVENT]?.({ className, flowType: 'pyStartCase' });
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const makePConnect = () => () => ({
  getInheritedProps: () => ({}),
  getContextName: () => 'test_context',
  getActionsApi: () => ({ createWork: jest.fn() })
});

const slotA = <div data-testid='slot-a'>Create Case View</div>;
const slotB = <div data-testid='slot-b'>Search View</div>;
const slotC = <div data-testid='slot-c'>Reports View</div>;

beforeEach(() => {
  (window as any).PCore = undefined;
  Object.keys(subscribers).forEach(k => delete subscribers[k]);
});

// ── Tests ─────────────────────────────────────────────────────────────────────

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

  // ── PubSub / right-panel case view ─────────────────────────────────────────

  test('renders inline case view in right panel when PubSub event fires', async () => {
    setPCore();
    render(
      <DevDXExtensionsSideNavLayout navLabel1='Create Case' navLabel2='Search' getPConnect={makePConnect()}>
        {[slotA, slotB]}
      </DevDXExtensionsSideNavLayout>
    );

    await act(async () => { publishCaseRequest(); });

    expect(screen.getByTestId('case-view')).toBeVisible();
    // slot content is replaced
    expect(screen.queryByTestId('slot-a')).toBeNull();
  });

  test('Back button is shown when a case view is active', async () => {
    setPCore();
    render(
      <DevDXExtensionsSideNavLayout navLabel1='Create Case' getPConnect={makePConnect()}>
        {[slotA]}
      </DevDXExtensionsSideNavLayout>
    );

    await act(async () => { publishCaseRequest(); });

    expect(screen.getByRole('button', { name: 'Close case and return to previous view' })).toBeVisible();
  });

  test('clicking Back clears the case view and restores slot content', async () => {
    setPCore();
    render(
      <DevDXExtensionsSideNavLayout navLabel1='Create Case' getPConnect={makePConnect()}>
        {[slotA]}
      </DevDXExtensionsSideNavLayout>
    );

    await act(async () => { publishCaseRequest(); });
    expect(screen.getByTestId('case-view')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Close case and return to previous view' }));
    expect(screen.queryByTestId('case-view')).toBeNull();
    expect(screen.getByTestId('slot-a')).toBeVisible();
  });

  test('clicking a nav item while case view is open clears the case view', async () => {
    setPCore();
    render(
      <DevDXExtensionsSideNavLayout navLabel1='Create Case' navLabel2='Search' getPConnect={makePConnect()}>
        {[slotA, slotB]}
      </DevDXExtensionsSideNavLayout>
    );

    await act(async () => { publishCaseRequest(); });
    expect(screen.getByTestId('case-view')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.queryByTestId('case-view')).toBeNull();
    expect(screen.getByTestId('slot-b')).toBeVisible();
  });

  test('left panel nav items are NOT disturbed when case view opens', async () => {
    setPCore();
    render(
      <DevDXExtensionsSideNavLayout navLabel1='Create Case' navLabel2='Search' navLabel3='Reports' getPConnect={makePConnect()}>
        {[slotA, slotB, slotC]}
      </DevDXExtensionsSideNavLayout>
    );

    await act(async () => { publishCaseRequest(); });

    // All three nav buttons still visible
    expect(screen.getByRole('button', { name: 'Create Case' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Search' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Reports' })).toBeVisible();
  });
});
