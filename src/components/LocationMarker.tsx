import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useMarkerStore } from "../states";

function LocationMarker() {
  const setMarkerData = useMarkerStore((state) => state.setMarkerData);
  const position = useMarkerStore((state) => state.marker.loc);

  useMapEvents({
    click(e) {
      setMarkerData("loc", [e.latlng.lat, e.latlng.lng]);
    },
  });
  return position === null ? null : (
    <Marker position={position}>
      <Popup>{"clicked"}</Popup>
    </Marker>
  );
}

export default LocationMarker;
