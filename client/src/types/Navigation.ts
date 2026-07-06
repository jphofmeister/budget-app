import { ReactNode } from "react";

export type NavigationItem = {
  name: string;
  componentName?: string;
  type?: string;
  isPresent?: boolean;
  classes?: string;
  onClick?: () => void;
  dropdownItems?: {
    name: string;
    componentName?: string;
    isPresent?: boolean;
    onClick?: () => void;
  }[];
  children?: ReactNode;
};

export type ReturnActiveClassFunction = (
  componentName: string | null,
  classList?: string
) => string;
