import {
  ChangeEventHandler,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMarkerStore, useMarkersStore, useModalStore } from "../states";
import useClickOutside from "./useClickOutside";

const useAddMarker = () => {
  const markerData = useMarkerStore((state) => state.marker);
  const setMarkerData = useMarkerStore((state) => state.setMarkerData);
  const setAllMarkerData = useMarkerStore((state) => state.setAllMarkerData);
  const clearAllMarkerData = useMarkerStore(
    (state) => state.clearAllMarkerData
  );
  const [error, setError] = useState<string>();
  const dialogRef = useRef<HTMLDivElement>(null);
  const fileInputRef = createRef<HTMLInputElement>();
  const addMarker = useMarkersStore((state) => state.addMarker);
  const editMarker = useMarkersStore((state) => state.editMarker);
  const getMarker = useMarkersStore((state) => state.getMarker);
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  useClickOutside(dialogRef, closeModal);

  useEffect(() => {
    if (typeof isOpen === "string") {
      try {
        const marker = getMarker(isOpen);
        setAllMarkerData(marker);
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      clearAllMarkerData();
    }
  }, [clearAllMarkerData, getMarker, isOpen, setAllMarkerData]);

  const onSaveMarker = () => {
    if (!markerData.name) {
      setError("Please enter a location name.");
      return;
    }
    if (!markerData.loc) {
      setError("Please select a location on the map.");
      return;
    }
    if (!markerData.type) {
      setError("Please select a location type.");
      return;
    }
    try {
      if (typeof isOpen === "string") {
        editMarker(isOpen, markerData);
      } else {
        addMarker(markerData);
      }
      setError("");
      closeModal();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const onChangeFileInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file!);
      reader.onload = function () {
        setMarkerData("icon", reader.result!.toString());
      };
      reader.onerror = function (error) {
        setError(error.type);
      };
    }
  };

  return {
    markerData,
    setMarkerData,
    onChangeFileInput,
    onSaveMarker,
    error,
    dialogRef,
    fileInputRef,
    addMarker,
    editMarker,
    getMarker,
    closeModal,
    isOpen,
  };
};

export default useAddMarker;
