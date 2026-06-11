import type { Role } from "@/types/common.types";

export const isLoginRoleMatch = (
  expectedRole: Role,
  actualRole?: Role,
): actualRole is Role => actualRole === expectedRole;
