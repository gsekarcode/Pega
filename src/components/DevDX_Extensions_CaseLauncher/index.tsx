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
import StyledCard, { StyledLoadingBar, StyledLoadingWrapper } from './styles';
import './create-nonce';

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
  /** Container to open the case in: modal, primary, or workarea */
  containerName?: 'modal' | 'primary' | 'workarea';
  getPConnect: any;
};

export const DevDXExtensionsCaseLauncher = (props: CaseLauncherProps) => {
  const {
    heading,
    description = '',
    classFilter,
    labelPrimaryButton,
    containerName = 'modal',
    getPConnect
  } = props;

  // Pega can pass booleans as strings, normalise once
  const autoLaunch = props.autoLaunch === true || props.autoLaunch === 'true';

  const pConn = getPConnect();

  // Guard against React Strict Mode double-invocation in development
  const hasAutoLaunched = useRef(false);
  const [autoLaunched, setAutoLaunched] = useState(false);
  const [loading, setLoading] = useState(autoLaunch);

  const requestCase = (className: string) => {
    pConn.getActionsApi().createWork(className, {
      flowType: 'pyStartCase',
      containerName,
      openCaseViewAfterCreate: true
    });
  };

  useEffect(() => {
    if (autoLaunch && !hasAutoLaunched.current) {
      hasAutoLaunched.current = true;
      requestCase(classFilter);
      setAutoLaunched(true);
      setLoading(false);
    }
    // classFilter intentionally excluded — fire only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <StyledLoadingWrapper>
        <Text variant='secondary'>Opening case…</Text>
        <StyledLoadingBar role='progressbar' aria-label='Loading' />
      </StyledLoadingWrapper>
    );
  }

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
