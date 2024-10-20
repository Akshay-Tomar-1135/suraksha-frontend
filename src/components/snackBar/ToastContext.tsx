import React, { ReactNode } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { HorizontalDirection, Severity, VerticalDirection } from 'src/_mock';

// Define the types for the toast options
interface ToastOptions {
  severity?: VariantType;
  autoHideDuration?: number;
  anchorOrigin?: {
    vertical: VerticalDirection;
    horizontal: HorizontalDirection;
  };
  autoHideEnabled?: boolean;
}

// Define the context type
interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void;
}

// Create context
const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

// Custom hook to use the Toast context
export const useToast = (): ToastContextType => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Provider component that wraps the app and provides the toast functionality
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Function to show a new toast
  const showToast = React.useCallback(
    (message: string, options?: ToastOptions) => {
      enqueueSnackbar(message, {
        action:
          options?.autoHideEnabled === false ? (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => closeSnackbar()}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ) : null,
        variant: options?.severity || Severity.success,
        autoHideDuration:
          options?.autoHideEnabled === false ? null : options?.autoHideDuration || 3000, // Default 3s if not disabled
        anchorOrigin: options?.anchorOrigin || {
          vertical: VerticalDirection.top,
          horizontal: HorizontalDirection.center,
        }, // Default anchor position
      });
    },
    [closeSnackbar, enqueueSnackbar]
  );
  const providerValue = React.useMemo(() => ({ showToast }), [showToast]);
  return <ToastContext.Provider value={providerValue}>{children}</ToastContext.Provider>;
};
