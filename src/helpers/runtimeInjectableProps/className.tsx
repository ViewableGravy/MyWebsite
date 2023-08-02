import classNames from "classnames";
import React from "react";
import { INJECTOR_ACTIONS, RETURN_ACTIONS } from "./actions";

type ValueOf<T extends object> =  T[keyof T]

type TInject = ({
  children,
  injectableProps
}: {
  children: React.ReactElement;
  injectableProps: { [key: string]: unknown };
}) => [ValueOf<typeof RETURN_ACTIONS>, { [key in keyof typeof injectableProps]: unknown }];

type TWrap = ({
  injectableProps,
  children
}: {
  injectableProps: { [key: string]: unknown };
  children: React.ReactElement;
}) => [ValueOf<typeof RETURN_ACTIONS>, { [key in keyof typeof injectableProps]: unknown }];

type TOverride = ({
  injectableProps,
  children
}: {
  injectableProps: { [key: string]: unknown };
  children: React.ReactElement;
}) => [ValueOf<typeof RETURN_ACTIONS>, { [key in keyof typeof injectableProps]: unknown }];

type TCustom = ({
  injectableProps,
  children,
  onCustom
}: {
  injectableProps: { [key: string]: unknown };
  children: React.ReactElement;
  onCustom: (props: { injectableProps: typeof injectableProps; children: typeof children }) => { [key: string]: unknown };
}) => [ValueOf<typeof RETURN_ACTIONS>, { [key in keyof typeof injectableProps]: unknown }];

type TRuntimeInjectableProps = {
  [INJECTOR_ACTIONS.INJECT]?: TInject
  [INJECTOR_ACTIONS.WRAP]?: TWrap
  [INJECTOR_ACTIONS.OVERRIDE]?: TOverride
  [INJECTOR_ACTIONS.CUSTOM]?: TCustom
  [INJECTOR_ACTIONS.FALLBACK]?: boolean;
};

type TClassInject = ({
  children,
  injectableProps
}: {
  children: React.ReactElement<{ className?: string }>;
  injectableProps: { [key: string]: unknown } & { className?: string };
}) => [typeof RETURN_ACTIONS.INJECT, { className: string }];

type TClassWrap = ({
  injectableProps,
  children
}: {
  injectableProps: { [key: string]: unknown } & { className?: string };
  children: React.ReactElement<{ className?: string }>;
}) => [typeof RETURN_ACTIONS.WRAP, { className: string }];

type TClassOverride = ({
  injectableProps,
  children
}: {
  injectableProps: { [key: string]: unknown } & { className?: string };
  children: React.ReactElement<{ className?: string }>;
}) => [typeof RETURN_ACTIONS.OVERRIDE, { className: string }];

type TClassCustom = ({
  injectableProps,
  children,
  onCustom
}: {
  injectableProps: { [key: string]: unknown } & { className?: string };
  children: React.ReactElement<{ className?: string }>;
  onCustom: (props: { injectableProps: typeof injectableProps; children: typeof children }) => { className: string };
}) => [typeof RETURN_ACTIONS.CUSTOM, { className: string }];

type Override<T, U> = Omit<T, keyof U> & U;

type TClassName = Override<TRuntimeInjectableProps,{
  [INJECTOR_ACTIONS.INJECT]: TClassInject
  [INJECTOR_ACTIONS.WRAP]: TClassWrap
  [INJECTOR_ACTIONS.OVERRIDE]: TClassOverride
  [INJECTOR_ACTIONS.CUSTOM]: TClassCustom
  [INJECTOR_ACTIONS.FALLBACK]: boolean;
}>;

/**
 * Defines how the className prop is injected into a component. Accepts children and injectableProps and returns
 * an object that can be spread into the child;
 */
export const className: TClassName = {
  [INJECTOR_ACTIONS.INJECT]: ({ children, injectableProps }) => {
    const { className: OLD } = children.props;
    const { className: NEW } = injectableProps;

    return [RETURN_ACTIONS.INJECT, {
      className: classNames({
        [`${OLD}`]: !!OLD,
        [`${NEW}`]: !!NEW,
      })
    }];
  },
  [INJECTOR_ACTIONS.WRAP]: ({ injectableProps: { className: NEW } }) => [
    RETURN_ACTIONS.WRAP, 
    {
      className: classNames({
        [`${NEW}`]: !!NEW,
      })
    }
  ],
  [INJECTOR_ACTIONS.OVERRIDE]: ({ injectableProps: { className: NEW }}) => [
    RETURN_ACTIONS.OVERRIDE, 
    {
      className: classNames({
        [`${NEW}`]: !!NEW,
      })
    }
  ],
  [INJECTOR_ACTIONS.CUSTOM]: ({ onCustom, ...props }) => {
    return [
      RETURN_ACTIONS.CUSTOM,
      onCustom(props)
    ]
  },
  [INJECTOR_ACTIONS.FALLBACK]: true
};