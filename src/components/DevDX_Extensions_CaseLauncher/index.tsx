import { useEffect, useRef, useState } from 'react';
import {
  withConfiguration,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Text,
  Button
} from '@pega/cosmos-react-core';
import StyledCard from './styles';
import './create-nonce';

// PubSub event name shared with SideNavLayout
export const CASE_REQUEST_EVENT = 'G_EXTENSIONS_OPEN_CASE_IN_PANEL';

export type CaseLauncherProps = {
  /** Card heading */
  heading: string;
  /** Description shown on the card */
  description?: string;
  /** Class name of the case type to create (pyClassName from D_pyQuickCreate) */
  classFilter: string;
  /** Label for the create button */
  labelPrimaryButton: string;
  /** When true, the case is created automatically when the widget mounts */
  autoLaunch?: boolean | string;
  getPConnect: any;
};

export const DevDXExtensionsCaseLauncher = (props: CaseLauncherProps) => {
  const {
    heading,
    description = '',
    classFilter,
    labelPrimaryButton,
    getPConnect
  } = props;

  // Pega can pass booleans as strings, normalise once
  const autoLaunch = props.autoLaunch === true || props.autoLaunch === 'true';

  const pConn = getPConnect();

  // Guard against React Strict Mode double-invocation in development
  const hasAutoLaunched = useRef(false);
  const [autoLaunched, setAutoLaunched] = useState(false);

  /**
   * Publish a PubSub event so SideNavLayout can intercept and render the
   * case creation form in its right panel. Falls back to opening in the
   * primary container when running standalone (no SideNavLayout present).
   */
  const requestCase = (className: string) => {
    const PCore = (window as any).PCore;
    const published = PCore?.getPubSubUtils?.()?.publish(
      CASE_REQUEST_EVENT,
      { className, flowType: 'pyStartCase' }
    );
    // publish() returns undefined when no subscribers — fall back to primary
    if (!published) {
      pConn.getActionsApi().createWork(className, {
        flowType: 'pyStartCase',
        containerName: 'primary',
        openCaseViewAfterCreate: true
      });
    }
  };

  // Auto-launch on mount: always open in primary so the page navigates directly
  const createCaseInPrimary = (className: string) => {
    pConn.getActionsApi().createWork(className, {
      flowType: 'pyStartCase',
      containerName: 'primary',
      openCaseViewAfterCreate: true
    });
  };

  useEffect(() => {
    if (autoLaunch && !hasAutoLaunched.current) {
      hasAutoLaunched.current = true;
      createCaseInPrimary(classFilter);
      setAutoLaunched(true);
    }
    // classFilter intentionally excluded — fire only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card as={StyledCard}>
      <CardHeader>
        <Text variant='h2'>{heading}</Text>
      </CardHeader>

      <CardContent>
        {autoLaunch && autoLaunched ? (
          <>
            <Text>{description}</Text>
            <Text variant='secondary'>Case was created automatically on load.</Text>
          </>
        ) : (
          <Text>{description}</Text>
        )}
      </CardContent>

      <CardFooter justify='end'>
        <Button
          variant='primary'
          onClick={() => requestCase(classFilter)}
        >
          {autoLaunched ? 'Create another' : labelPrimaryButton}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default withConfiguration(DevDXExtensionsCaseLauncher);
