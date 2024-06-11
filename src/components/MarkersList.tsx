import { Marker, Popup } from "react-leaflet";
import { useMarkersStore, useModalStore } from "../states";
import L from "leaflet";

const createIcon = (iconSvg: string) =>
  L.icon({
    iconUrl: iconSvg,
    iconRetinaUrl: iconSvg,
    iconSize: [25, 36],
    className: "leaflet-venue-icon",
  });

function MarkersList() {
  const markers = useMarkersStore((state) => state.markers);
  const onOpen = useModalStore((state) => state.openModal);

  return markers.length ? (
    <>
      {markers.map((marker) => (
        <Marker
          position={marker.loc!}
          {...(marker.icon ? { icon: createIcon(marker.icon) } : {})}
        >
          <Popup>
            <h2 className="text-lg font-bold mb-3">Share location</h2>
            <div className="mb-2">
              <label className="block text-gray-700">
                Location name:{" "}
                <span className="font-extrabold">{marker.name}</span>
              </label>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">
                Location type:{" "}
                <span className="font-extrabold">{marker.type}</span>
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded"
                onClick={() => onOpen(marker.id)}
              >
                Edit
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  ) : (
    <></>
  );
}

export default MarkersList;
