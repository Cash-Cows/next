import React from 'react';
import { toast } from 'react-toastify';
import { toast as config } from 'project.config';

import type { ToastOptions } from 'react-toastify';

export default function notify(
  type: string, 
  message: string|React.ReactNode,
  autoClose?: number
) {
  if (!autoClose) {
    autoClose = config.autoClose || 5000;
  }
  const options = { ...config, autoClose } as ToastOptions;
  switch (type) {
    case 'info': toast.info(message, options); break;
    case 'warn': toast.warn(message, options); break;
    case 'error': toast.error(message, options); break;
    case 'success': toast.success(message, options); break;
  }
}