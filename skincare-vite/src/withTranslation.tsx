import React, { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * A higher-order component that injects translation capabilities
 * into any component, making it easier to implement i18n
 * 
 * @param Component - The component to enhance with translation
 * @returns A new component with translation props
 */
export function withTranslation<P extends object>(
  Component: ComponentType<P & { t: (key: string) => string; i18n: any }>
) {
  return function WrappedWithTranslation(props: P) {
    const { t, i18n } = useTranslation();
    
    // Pass the translation function to the wrapped component
    return <Component {...props} t={t} i18n={i18n} />;
  };
}

/**
 * Example usage:
 * 
 * ```tsx
 * import { withTranslation } from './withTranslation';
 * 
 * interface MyComponentProps {
 *   name: string;
 *   t?: (key: string) => string;
 *   i18n?: any;
 * }
 * 
 * function MyComponent({ name, t = k => k }: MyComponentProps) {
 *   return (
 *     <div>
 *       <h1>{t('greeting')}, {name}!</h1>
 *       <p>{t('description')}</p>
 *     </div>
 *   );
 * }
 * 
 * export default withTranslation(MyComponent);
 * ```
 */ 