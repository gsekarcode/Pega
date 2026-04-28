import { useState } from 'react';
import { withConfiguration, Button } from '@pega/cosmos-react-core';
import type { PConnProps } from './PConnProps';
import { StyledWrapper, StyledFeedback } from './styles';

type Variant = 'primary' | 'secondary' | 'simple';
type Size    = 'default' | 'compact';

interface DataTransformButtonProps extends PConnProps {
  /** Button label */
  label?: string;
  /** Name of the Pega Data Transform to invoke on click */
  dataTransformName?: string;
  /** Visual style of the button */
  variant?: Variant;
  /** Button size */
  size?: Size;
  /** Label shown while the data transform is running */
  labelLoading?: string;
  /** Message shown on success (auto-clears after 4 s) */
  labelSuccess?: string;
  /** Whether to show inline success/error feedback */
  showFeedback?: boolean | string;
}

const coerceBool = (val: boolean | string | undefined, fallback: boolean): boolean => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === 'boolean') return val;
  return val === 'true';
};

function DevDXExtensionsDataTransformButton(props: DataTransformButtonProps) {
  const {
    getPConnect,
    label            = 'Run',
    dataTransformName = '',
    variant          = 'primary',
    size             = 'default',
    labelLoading     = 'Running…',
    labelSuccess     = 'Done'
  } = props;

  const showFeedback = coerceBool(props.showFeedback, true);

  const [loading,  setLoading]  = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleClick = async () => {
    if (!dataTransformName) {
      setFeedback({ type: 'error', message: 'No Data Transform name configured.' });
      return;
    }

    const pConn       = getPConnect();
    const contextName = pConn.getContextName();
    const PCore       = (window as any).PCore;

    if (!PCore) {
      setFeedback({ type: 'error', message: 'PCore not available.' });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      // Standard Constellation API to invoke a Data Transform on the active case
      await pConn.getActionsApi().runDataTransform(dataTransformName, contextName);
      if (showFeedback) {
        setFeedback({ type: 'success', message: labelSuccess });
        setTimeout(() => setFeedback(null), 4000);
      }
    } catch (err: any) {
      if (showFeedback) {
        setFeedback({
          type: 'error',
          message: err?.message ?? `Failed to run "${dataTransformName}".`
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper data-testid='dt-button-wrapper'>
      <Button
        variant={variant}
        compact={size === 'compact'}
        loading={loading}
        disabled={loading}
        onClick={handleClick}
        data-testid='dt-button'
      >
        {loading ? labelLoading : label}
      </Button>

      {showFeedback && feedback && (
        <StyledFeedback $type={feedback.type} role='status' data-testid='dt-feedback'>
          {feedback.message}
        </StyledFeedback>
      )}
    </StyledWrapper>
  );
}

export default withConfiguration(DevDXExtensionsDataTransformButton);
export { DevDXExtensionsDataTransformButton };
