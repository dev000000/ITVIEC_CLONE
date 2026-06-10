import { create } from "zustand";
import { getMySavedJobIdsApi } from "@/services/savedJobApi";
import type { SavedJobItemResponse } from "@/types/response.types";

interface LastUnsavedJob {
  id: number;
  snapshot?: SavedJobItemResponse;
}

interface SavedJobsState {
  savedJobIds: Set<number>;
  count: number;
  hydrated: boolean;
  lastUnsavedJob: LastUnsavedJob | null;
}

interface SavedJobsActions {
  hydrate: () => Promise<void>;
  addOptimistic: (id: number) => void;
  removeOptimistic: (id: number, snapshot?: SavedJobItemResponse) => void;
  confirm: () => void;
  rollback: (id: number) => void;
  clear: () => void;
}

const initialState: SavedJobsState = {
  savedJobIds: new Set(),
  count: 0,
  hydrated: false,
  lastUnsavedJob: null,
};

export const useSavedJobsStore = create<SavedJobsState & SavedJobsActions>(
  (set, get) => ({
    ...initialState,

    hydrate: async () => {
      if (get().hydrated) return;
      try {
        const res = await getMySavedJobIdsApi();
        const ids: number[] = res.data.result ?? [];
        set({
          savedJobIds: new Set(ids),
          count: ids.length,
          hydrated: true,
        });
      } catch {
        // hydrate thất bại im lặng; sẽ thử lại lần sau
      }
    },

    addOptimistic: (id) => {
      set((state) => {
        const next = new Set(state.savedJobIds);
        next.add(id);
        return { savedJobIds: next, count: next.size };
      });
    },

    removeOptimistic: (id, snapshot) => {
      set((state) => {
        const next = new Set(state.savedJobIds);
        next.delete(id);
        return {
          savedJobIds: next,
          count: next.size,
          lastUnsavedJob: { id, snapshot },
        };
      });
    },

    confirm: () => {
      // id đã nằm trong set qua addOptimistic; không cần làm gì thêm
    },

    rollback: (id) => {
      set((state) => {
        const next = new Set(state.savedJobIds);
        next.delete(id);
        return { savedJobIds: next, count: next.size };
      });
    },

    clear: () => set({ ...initialState, savedJobIds: new Set() }),
  }),
);
