import { render, screen, fireEvent } from '@testing-library/react';
import { DevDXExtensionsCaseLauncher, CASE_REQUEST_EVENT } from './index';

const makeCreateWork = () => jest.fn();
const makePublish = () => jest.fn();

// Helper: build a PCore mock with a controllable publish return value.
// publish() returning undefined simulates "no subscribers" → falls back to createWork.
const setPCore = (opts: { publishReturnVal?: any } = {}) => {
  (window as any).PCore = {
    getPubSubUtils: () => ({
      publish: jest.fn().mockReturnValue(opts.publishReturnVal ?? undefined)
    }),
    getEnvironmentInfo: () => ({})
  };
};

const makePConnect = (createWork = makeCreateWork()) => () => ({
  getActionsApi: () => ({ createWork })
});

const baseProps = {
  heading: 'Start a Case',
  description: 'Click below to begin.',
  classFilter: 'Work-MyApp-Work-Request',
  labelPrimaryButton: 'Create case'
};

beforeEach(() => {
  // Reset PCore to a neutral state before each test
  (window as any).PCore = undefined;
});

describe('DevDXExtensionsCaseLauncher', () => {
  test('renders heading, description and button', () => {
    render(<DevDXExtensionsCaseLauncher {...baseProps} getPConnect={makePConnect()} />);
    expect(screen.getByRole('heading', { name: 'Start a Case' })).toBeVisible();
    expect(screen.getByText('Click below to begin.')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Create case' })).toBeVisible();
  });

  test('button click publishes PubSub event when PCore is available', () => {
    setPCore({ publishReturnVal: true });
    const createWork = makeCreateWork();
    render(<DevDXExtensionsCaseLauncher {...baseProps} getPConnect={makePConnect(createWork)} />);

    fireEvent.click(screen.getByRole('button', { name: 'Create case' }));

    const publish = (window as any).PCore.getPubSubUtils().publish;
    expect(publish).toHaveBeenCalledWith(
      CASE_REQUEST_EVENT,
      expect.objectContaining({ className: 'Work-MyApp-Work-Request', flowType: 'pyStartCase' })
    );
    // createWork should NOT have been called — PubSub handled it
    expect(createWork).not.toHaveBeenCalled();
  });

  test('falls back to createWork when PubSub returns undefined (no subscribers)', () => {
    setPCore({ publishReturnVal: undefined });
    const createWork = makeCreateWork();
    render(<DevDXExtensionsCaseLauncher {...baseProps} getPConnect={makePConnect(createWork)} />);

    fireEvent.click(screen.getByRole('button', { name: 'Create case' }));

    expect(createWork).toHaveBeenCalledTimes(1);
    expect(createWork).toHaveBeenCalledWith(
      'Work-MyApp-Work-Request',
      expect.objectContaining({ flowType: 'pyStartCase', containerName: 'primary' })
    );
  });

  test('falls back to createWork when PCore is not present', () => {
    // PCore is undefined (no mock set)
    const createWork = makeCreateWork();
    render(<DevDXExtensionsCaseLauncher {...baseProps} getPConnect={makePConnect(createWork)} />);

    fireEvent.click(screen.getByRole('button', { name: 'Create case' }));

    expect(createWork).toHaveBeenCalledTimes(1);
    expect(createWork).toHaveBeenCalledWith(
      'Work-MyApp-Work-Request',
      expect.objectContaining({ flowType: 'pyStartCase', containerName: 'primary' })
    );
  });

  test('does NOT call createWork or publish on mount when autoLaunch is false', () => {
    setPCore({ publishReturnVal: true });
    const createWork = makeCreateWork();
    render(
      <DevDXExtensionsCaseLauncher
        {...baseProps}
        autoLaunch={false}
        getPConnect={makePConnect(createWork)}
      />
    );
    expect(createWork).not.toHaveBeenCalled();
    const publish = (window as any).PCore.getPubSubUtils().publish;
    expect(publish).not.toHaveBeenCalled();
  });

  test('autoLaunch calls createWork in primary on mount (bypasses PubSub)', () => {
    setPCore({ publishReturnVal: true });
    const createWork = makeCreateWork();
    render(
      <DevDXExtensionsCaseLauncher
        {...baseProps}
        autoLaunch
        getPConnect={makePConnect(createWork)}
      />
    );
    expect(createWork).toHaveBeenCalledTimes(1);
    expect(createWork).toHaveBeenCalledWith(
      'Work-MyApp-Work-Request',
      expect.objectContaining({ containerName: 'primary' })
    );
  });

  test('autoLaunch works with string "true"', () => {
    const createWork = makeCreateWork();
    render(
      <DevDXExtensionsCaseLauncher
        {...baseProps}
        autoLaunch='true'
        getPConnect={makePConnect(createWork)}
      />
    );
    expect(createWork).toHaveBeenCalledTimes(1);
  });

  test('shows auto-launched status message after auto launch', () => {
    render(
      <DevDXExtensionsCaseLauncher {...baseProps} autoLaunch getPConnect={makePConnect()} />
    );
    expect(screen.getByText('Case was created automatically on load.')).toBeVisible();
  });

  test('button label changes to "Create another" after auto launch', () => {
    render(
      <DevDXExtensionsCaseLauncher {...baseProps} autoLaunch getPConnect={makePConnect()} />
    );
    expect(screen.getByRole('button', { name: 'Create another' })).toBeVisible();
  });
});
