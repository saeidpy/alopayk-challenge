import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 } from "uuid";

export type MarkerType = {
  id: string;
  name: string;
  loc: [number, number] | null;
  type: string;
  icon: string;
};

interface MarkersStoreType {
  markers: MarkerType[];
  addMarker: (params: Omit<MarkerType, "id">) => void;
  editMarker: (id: string, params: Omit<MarkerType, "id">) => void;
  getMarker: (id: string) => MarkerType;
}

interface ModalStoreType {
  isOpen: boolean | string;
  openModal: (id?: string) => void;
  closeModal: () => void;
}

interface MarkerStoreType {
  marker: Omit<MarkerType, "id">;
  setMarkerData: (
    key: keyof Omit<MarkerType, "id">,
    value: string | [number, number]
  ) => void;
  setAllMarkerData: (param: Omit<MarkerType, "id">) => void;
  clearAllMarkerData: () => void;
}

export const useMarkersStore = create(
  persist<MarkersStoreType>(
    (set, get) => ({
      markers: [],
      addMarker: (newMarker) => {
        set((state) => {
          const existingMarkers = state.markers;
          // Check for duplicate names
          if (
            existingMarkers.some((marker) => marker.name === newMarker.name)
          ) {
            throw new Error("Marker with this name already exists");
          }
          const markerWithId = { ...newMarker, id: v4() };
          return { markers: [...existingMarkers, markerWithId] };
        });
      },
      editMarker: (id, updatedMarker) => {
        set((state) => {
          const existingMarkers = state.markers;
          const markerIndex = existingMarkers.findIndex(
            (marker) => marker.id === id
          );
          if (markerIndex === -1) {
            throw new Error("Marker not found");
          }
          const updatedMarkers = [...existingMarkers];
          updatedMarkers[markerIndex] = {
            ...existingMarkers[markerIndex],
            ...updatedMarker,
          };
          return { markers: updatedMarkers };
        });
      },
      getMarker: (id) => {
        const existingMarkers = get().markers;
        const marker = existingMarkers.find((marker) => marker.id === id);
        if (!marker) {
          throw new Error("Marker not found");
        }
        return marker;
      },
    }),
    { name: "markers-store", storage: createJSONStorage(() => localStorage) }
  )
);

export const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: false,
  openModal: (id?: string) => set({ isOpen: id }),
  closeModal: () => set({ isOpen: false }),
}));

export const useMarkerStore = create<MarkerStoreType>((set) => ({
  marker: {
    id: "",
    name: "",
    loc: null,
    type: "",
    icon: "",
  },
  setMarkerData: (key, value) =>
    set((markerStore) => ({
      ...markerStore,
      marker: { ...markerStore.marker, [key]: value },
    })),
  setAllMarkerData: (value) =>
    set((markerStore) => ({
      ...markerStore,
      marker: value,
    })),
  clearAllMarkerData: () =>
    set((markerStore) => ({
      ...markerStore,
      marker: { name: "", loc: null, type: "", icon: "" },
    })),
}));
