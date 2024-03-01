import { useNavigate } from "@tanstack/react-router";
import { _HeaderButton as HeaderButton, TButton, TButtonProps } from "../Button";
import React from "react";

export const usePreconfiguredButtons = () => {
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

  return {
    Dashboard,
    About,
    Blog,
    Contact,
    Login
  } as const;
}