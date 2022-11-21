//types
import type { PixelButtonProps } from '../types';
//enums
import { PixelButtonTypes, PixelButtonSizes } from '../enums';

const PixelButton: React.FC<PixelButtonProps> = props => {
  const { 
    type = PixelButtonTypes.DEFAULT, 
    size = PixelButtonSizes.NORMAL, 
    className = '',
    children 
  } = props;

  const styles = [
    'bg-repeat bg-center bg-h-full', 
    'text-white inline-block font-pixel', 
    'm-2 relative text-center',
    'before:bg-no-repeat before:bg-center-left before:block before:w-4',
    'before:content-[\' \'] before:bg-h-full before:h-full before:absolute',
    'after:bg-no-repeat after:bg-center-left after:block after:w-4',
    'after:content-[\' \'] after:bg-h-full after:h-full after:absolute'
  ];

  if (size === PixelButtonSizes.NORMAL) {
    styles.push('text-sm p-2')
    styles.push('before:left-[-7px] before:top-0')
    styles.push('after:right-[-13px] after:top-0')
  } else if (size === PixelButtonSizes.LARGE) {
    styles.push('text-md p-4')
    styles.push('before:left-[-12px] before:top-0')
    styles.push('after:right-[-13px] after:top-0')
  }

  switch(type) {
    case PixelButtonTypes.DEFAULT:
      styles.push('bg-[url(/images/button/btn-secondary-center.png)]');
      styles.push('before:bg-[url(/images/button/btn-secondary-left.png)]');
      styles.push('after:bg-[url(/images/button/btn-secondary-right.png)]');
      break;
    case PixelButtonTypes.WARNING:
      styles.push('bg-[url(/images/button/btn-warning-center.png)]');
      styles.push('before:bg-[url(/images/button/btn-warning-left.png)]');
      styles.push('after:bg-[url(/images/button/btn-warning-right.png)]');
      break;
    case PixelButtonTypes.SUCCESS:
      styles.push('bg-[url(/images/button/btn-success-center.png)]');
      styles.push('before:bg-[url(/images/button/btn-success-left.png)]');
      styles.push('after:bg-[url(/images/button/btn-success-right.png)]');
      break;
  }

  styles.push(className);
  const buttonProps = Object.assign({}, props) as Record<string, any>
  delete buttonProps.type
  delete buttonProps.size
  delete buttonProps.className
  delete buttonProps.children

  return <button className={styles.join(' ')} {...buttonProps}>{children}</button>;
};

export default PixelButton;