/**
 * Represents the injection method. This indicates to the component how to behave but does not necessarily correlate with the RETURN_ACTION
 * as some prop injection types may differ in functional implementation despite what is request.
 * 
 * e.g. the requested action of `onClick` may be `inject` but the functional implementation would likely be `override`
 */
export const INJECTOR_ACTIONS = {
  OVERRIDE: 'override',
  INJECT: 'inject',
  WRAP: 'wrap',
  CUSTOM: 'custom',
  FALLBACK: 'fallback'
} as const;

export type TInjectorAction = typeof INJECTOR_ACTIONS[keyof typeof INJECTOR_ACTIONS];

/**
 * Represents the action the child injector should take when injecting the props, this may not directly correlate with the INJECTOR_ACTION
 */
export const RETURN_ACTIONS = {
  /**
   * Override the existing prop with the new prop, this is typical for non-standard HTML attributes
   */
  OVERRIDE: 'override',

  /**
   * Inject the returned props into the child, the standard method for this is with cloneElement
   */
  INJECT: 'inject',

  /**
   * Wrap the child in a new element, if this is provided, a new element will be returned to put this into
   */
  WRAP: 'wrap',

  /**
   * The fallback function should be executed from the child injector
   */
  FALLBACK: 'fallback',

  /**
   * The custom function should be executed from the child injector
   */
  CUSTOM: 'custom'
} as const;

export type TReturnAction = typeof RETURN_ACTIONS[keyof typeof RETURN_ACTIONS];