//types
import type { PixelButtonProps } from '../types';
//enums
import { PixelButtonTypes, PixelButtonSizes } from '../enums';
//components
import Link from 'next/link';
//config
import { cdn } from 'project.config';

const PixelButton: React.FC<PixelButtonProps> = props => {
  const { 
    type = PixelButtonTypes.DEFAULT, 
    size = PixelButtonSizes.NORMAL, 
    font = 'pixel',
    className = '',
    children,
    ...otherProps
  } = props;

  const styles = [
    'bg-repeat bg-center bg-h-full', 
    `text-white inline-block font-${font}`, 
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
      styles.push(`bg-pixel-btn-secondary-center`);
      styles.push(`before:bg-pixel-btn-secondary-left`);
      styles.push(`after:bg-pixel-btn-secondary-right`);
      break;
    case PixelButtonTypes.WARNING:
      styles.push(`bg-pixel-btn-warning-center`);
      styles.push(`before:bg-pixel-btn-warning-left`);
      styles.push(`after:bg-pixel-btn-warning-right`);
      break;
    case PixelButtonTypes.SUCCESS:
      styles.push(`bg-pixel-btn-success-center`);
      styles.push(`before:bg-pixel-btn-success-left`);
      styles.push(`after:bg-pixel-btn-success-right`);
      break;
  }

  styles.push(className);

  if (otherProps.href) {
    if (otherProps.href.indexOf('/') === 0) {
      const { href, linkProps } = otherProps;
      return <Link className={styles.join(' ')} href={href} {...linkProps}>{children}</Link>;
    }

    return <a className={styles.join(' ')} {...otherProps}>{children}</a>;
  }

  return <button className={styles.join(' ')} {...otherProps}>{children}</button>;
};

export default PixelButton;