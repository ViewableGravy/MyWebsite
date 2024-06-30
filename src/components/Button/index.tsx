/***** BASE IMPORTS *****/
import { createButton } from '@laystack/gui';
import { Link, type LinkProps } from '@tanstack/react-router';

/***** SHARED *****/
import { _Anchor } from 'components/Anchor/InternalComponents/anchor';

/***** CONSTS *****/
import './_Button.scss'

/***** COMPONENT START *****/
/**
 * Shared Anchor component for the application. Provides a consistent styling while offering functionality
 * as a button, anchor, link or submit button where necessary.
 */
export const Button = createButton({
  className: "Button",
  orient: ({ Anchor, Button, Link, Submit }) => Object.assign(Button, { 
    Anchor, 
    Link, 
    Submit 
  }),
  components: {
    link: (props: LinkProps) => <Link {...props} />,
    anchor: _Anchor
  }
});
