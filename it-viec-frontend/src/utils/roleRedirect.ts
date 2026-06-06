import { ROLE, type Role } from "@/types/common.types";

export const getDefaultRouteByRole = (role?: Role): string => {
  switch (role) {
    case ROLE.ADMIN:
      return "/admin/dashboard";
    case ROLE.EMPLOYER:
      return "/customer/dashboard";
    case ROLE.SEEKER:
      return "/";
    default:
      return "/";
  }
};

export const getLoginRouteByRole = (role?: Role): string => {
  switch (role) {
    case ROLE.ADMIN:
      return "/admin/login";
    case ROLE.EMPLOYER:
      return "/customer/login";
    case ROLE.SEEKER:
    default:
      return "/login";
  }
};
