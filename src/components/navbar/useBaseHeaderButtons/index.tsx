import { useNavigate } from "@tanstack/react-router";
import { _HeaderButton as HeaderButton, TButton, TButtonProps } from "../Button";
import React from "react";

type TPartialButton = React.FC<Partial<TButtonProps>>

type TUsePreconfiguredButtonsRT<T extends boolean | undefined> = T extends true ? [
  React.FC<{}>,
  TPartialButton[]
] : {
  Dashboard: TPartialButton,
  About: TPartialButton,
  Blog: TPartialButton,
  Contact: TPartialButton,
  Login: TPartialButton
}

type TUsePreconfiguredButtons = <T extends boolean | undefined = undefined>(args?: { asArray?: T }) => TUsePreconfiguredButtonsRT<T>

export const usePreconfiguredButtons: TUsePreconfiguredButtons = ({ asArray } = {}) => {
  const navigate = useNavigate();

  const Dashboard: React.FC<Partial<TButtonProps>> = (props) => (
    <HeaderButton activeRoute="/dashboard" onClick={() => navigate({ to: "/dashboard" })} {...props}>
      Dashboard
    </HeaderButton>
  )

  const About: React.FC<Partial<TButtonProps>> = (props) => (
    <HeaderButton activeRoute="/about" onClick={() => navigate({ to: "/about" })} markNew {...props} >
      About
    </HeaderButton>
  )

  const Blog: React.FC<Partial<TButtonProps>> = (props) => (
    <HeaderButton activeRoute="/blog" onClick={() => navigate({ to: "/blog" })} {...props}>
      Blog
    </HeaderButton>
  )

  const Contact: React.FC<Partial<TButtonProps>> = (props) => (
    <HeaderButton activeRoute="/contact" onClick={() => navigate({ to: "/contact" })} {...props}>
      Contact
    </HeaderButton>
  )

  const Login: React.FC<Partial<TButtonProps>> = (props) => (
    <HeaderButton activeRoute="/login" onClick={() => navigate({ to: "/login" })} {...props}>
      Login
    </HeaderButton>
  )

  const buttons = {
    Dashboard,
    About,
    Blog,
    Contact,
    Login
  } as const;

  if (asArray)
    return [
      () => Object.values(buttons).map((Button, i) => <Button key={i} />), 
      Object.values(buttons)
    ] as any;
    
  return buttons as any;
}