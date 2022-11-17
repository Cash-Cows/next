export enum NotificationTypes {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning'
};

export type NotificationProps = {
  type?: NotificationTypes,
  className?: string,
  children: React.ReactNode
};

const Notification: React.FC<NotificationProps> = props => {
  const { 
    type = NotificationTypes.INFO,  
    className = '',
    children 
  } = props;

  const styles = [
    'border border-solid max-w-sm py-5 px-8 m-auto',
    'before:font-awesome before:inline-block before:font-extrabold before:pr-3'
  ];

  switch(type) {
    case NotificationTypes.ERROR:
      styles.push('before:content[\'\\f057\']');
      styles.push('text-white bg-red-800 border-red-700');
      break;
    case NotificationTypes.INFO:
      styles.push('before:content[\'\\f05a\']');
      styles.push('text-white bg-blue-800 border-blue-700');
      break;
    case NotificationTypes.SUCCESS:
      styles.push('before:content[\'\\f058\']');
      styles.push('text-white bg-green-800 border-green-700');
      break;
    case NotificationTypes.WARNING:
      styles.push('before:content[\'\\f071\']');
      styles.push('text-white bg-yellow-600 border-yellow-500');
      break;
  }

  styles.push(className);

  return (
    <div className="fixed text-white left-5 right-5 z-50">
      <div className={styles.join(' ')}>{children}</div>
    </div>
  );
};

export default Notification;