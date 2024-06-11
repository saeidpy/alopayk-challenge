import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import AddMarkerButton from "./components/AddMarkerButton";
import AddMarkerDialog from "./components/AddMarkerDialog";
import MarkersList from "./components/MarkersList";

function App() {
  return (
    <div className="relative">
      <MapContainer
        className="h-dvh w-full"
        center={[35.7219, 51.3347]}
        zoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkersList/>
        <AddMarkerButton />
      </MapContainer>
      <AddMarkerDialog />
    </div>
  );
}
export default App;
