export enum BadgeTypes {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  MUTED = 'muted'
};

export enum BadgeLayouts {
  SOLID = 'solid',
  OUTLINE = 'outline'
};

export type BadgeProps = {
  type?: BadgeTypes,
  layout?: BadgeLayouts,
  className?: string,
  children: React.ReactNode
};

const Badge: React.FC<BadgeProps> = props => {
  const { 
    type = BadgeTypes.INFO, 
    layout = BadgeLayouts.SOLID, 
    className = '',
    children 
  } = props;

  const styles = ['px-2 py-1 text-xs font-bold inline-block'];

  if (layout === BadgeLayouts.SOLID) {
    switch(type) {
      case BadgeTypes.ERROR:
        styles.push('text-white bg-red-800 border border-solid border-red-700');
        break;
      case BadgeTypes.INFO:
        styles.push('text-white bg-blue-800 border border-solid border-blue-700');
        break;
      case BadgeTypes.SUCCESS:
        styles.push('text-white bg-green-800 border border-solid border-green-700');
        break;
      case BadgeTypes.MUTED:
        styles.push('text-white bg-gray-300 text-gray-700');
        break;
      case BadgeTypes.WARNING:
        styles.push('text-white bg-yellow-600 border border-solid border-yellow-500');
        break;
    }
  } else if (layout === BadgeLayouts.OUTLINE) {
    styles.push('border border-solid');
    switch(type) {
      case BadgeTypes.ERROR:
        styles.push('border border-solid border-red-700 text-red-700');
        break;
      case BadgeTypes.INFO:
        styles.push('border border-solid border-blue-700 text-blue-700');
        break;
      case BadgeTypes.MUTED:
        styles.push('border border-solid border-gray-400 text-gray-400');
        break;
      case BadgeTypes.SUCCESS:
        styles.push('border border-solid border-green-700 text-green-700');
        break;
      case BadgeTypes.WARNING:
        styles.push('border border-solid border-yellow-600 text-yellow-600');
        break;
    }
  }

  styles.push(className);

  return <span className={styles.join(' ')}>{children}</span>;
};

export default Badge;