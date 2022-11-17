export enum AlertTypes {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning'
};

export enum AlertLayouts {
  SOLID = 'solid',
  OUTLINE = 'outline'
};

export type AlertProps = {
  type?: AlertTypes,
  layout?: AlertLayouts,
  className?: string,
  children: React.ReactNode
};

const Alert: React.FC<AlertProps> = props => {
  const { 
    type = AlertTypes.INFO, 
    layout = AlertLayouts.SOLID, 
    className = '',
    children 
  } = props;

  const styles = [
    'px-5 py-4',
    'before:font-awesome before:inline-block before:font-extrabold before:pr-3'
  ];

  switch(type) {
    case AlertTypes.ERROR:
      styles.push('before:content[\'\\f057\']');
      break;
    case AlertTypes.INFO:
      styles.push('before:content[\'\\f05a\']');
      break;
    case AlertTypes.SUCCESS:
      styles.push('before:content[\'\\f058\']');
      break;
    case AlertTypes.WARNING:
      styles.push('before:content[\'\\f071\']');
      break;
  }

  if (layout === AlertLayouts.SOLID) {
    styles.push('text-white');
    switch(type) {
      case AlertTypes.ERROR:
        styles.push('bg-red-700');
        break;
      case AlertTypes.INFO:
        styles.push('bg-blue-700');
        break;
      case AlertTypes.SUCCESS:
        styles.push('bg-green-700');
        break;
      case AlertTypes.WARNING:
        styles.push('bg-orange-700');
        break;
    }
  } else if (layout === AlertLayouts.OUTLINE) {
    styles.push('border border-solid');
    switch(type) {
      case AlertTypes.ERROR:
        styles.push('border border-solid border-red-700 text-red-700');
        break;
      case AlertTypes.INFO:
        styles.push('border border-solid border-blue-700 text-blue-700');
        break;
      case AlertTypes.SUCCESS:
        styles.push('border border-solid border-green-700 text-green-700');
        break;
      case AlertTypes.WARNING:
        styles.push('border border-solid border-orange-700 text-orange-700');
        break;
    }
  }

  styles.push(className);

  return <div className={styles.join(' ')}>{children}</div>;
};

export default Alert;