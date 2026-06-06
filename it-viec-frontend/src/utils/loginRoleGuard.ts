import { ROLE, type Role } from "@/types/common.types";
import { getLoginRouteByRole } from "@/utils/roleRedirect";

const roleLabels: Record<Role, string> = {
  [ROLE.ADMIN]: "admin",
  [ROLE.EMPLOYER]: "employer",
  [ROLE.SEEKER]: "job seeker",
};

const loginPortalLabels: Record<Role, string> = {
  [ROLE.ADMIN]: "admin login page",
  [ROLE.EMPLOYER]: "employer login page",
  [ROLE.SEEKER]: "job seeker login page",
};

export const isExpectedLoginRole = (expectedRole: Role, actualRole?: Role): actualRole is Role =>
  actualRole === expectedRole;

export const getLoginRoleMismatchFeedback = (expectedRole: Role, actualRole: Role) => {
  const redirectTo = getLoginRouteByRole(actualRole);

  return {
    redirectTo,
    title: "Wrong login portal",
    text: `This ${roleLabels[actualRole]} account cannot sign in on the ${loginPortalLabels[expectedRole]}. Please use ${redirectTo}.`,
  };
};
