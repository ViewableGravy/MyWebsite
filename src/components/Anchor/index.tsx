/***** BASE IMPORTS *****/
import { createButton } from '@laystack/gui';
import { Link, type LinkProps } from '@tanstack/react-router';

/***** SHARED *****/
import { _Anchor } from './InternalComponents/anchor';

/***** CONSTS *****/
import './_Anchor.scss'

/***** COMPONENT START *****/
/**
 * Shared Anchor component for the application. Provides a consistent styling while offering functionality
 * as a button, anchor, link or submit button where necessary.
 */
export const Anchor = createButton({
  className: "Anchor",
  orient: ({ Anchor, Button, Link, Submit }) => Object.assign(Anchor, { 
    Button, 
    Link, 
    Submit 
  }),
  components: {
    link: (props: LinkProps) => <Link {...props} />,
    anchor: _Anchor
  }
});
