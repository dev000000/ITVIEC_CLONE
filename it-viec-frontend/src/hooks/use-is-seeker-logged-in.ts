import { useUserStore } from "@/store/userStore";
import { ROLE } from "@/types/common.types";

/** Chỉ coi là đã đăng nhập seeker khi authenticated và role === SEEKER. */
export const useIsSeekerLoggedIn = () => {
  const authenticated = useUserStore((state) => state.authenticated);
  const role = useUserStore((state) => state.role);
  return authenticated && role === ROLE.SEEKER;
};
