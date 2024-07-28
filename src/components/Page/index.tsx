/***** CONSTS *****/
import './_Page.scss';

/***** TYPE DEFINITIONS *****/
type Page = React.FC<{
  children: React.ReactNode
}>

/***** COMPONENT START *****/
/**
 * Page - Provides default styling / padding for a page
 */
export const Page: Page = ({ children }) => {
  return (
    <div className="Page">
      {children}
    </div>
  );
};
