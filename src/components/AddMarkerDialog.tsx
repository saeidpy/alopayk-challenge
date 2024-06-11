import { MapContainer, TileLayer } from "react-leaflet";
import useAddMarker from "../hooks/useAddMarker";
import LocationMarker from "./LocationMarker";

const AddMarkerDialog = () => {
  const {
    markerData,
    setMarkerData,
    onChangeFileInput,
    onSaveMarker,
    error,
    dialogRef,
    fileInputRef,
    closeModal,
    isOpen,
  } = useAddMarker();

  if (isOpen === false) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-1000">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div
        ref={dialogRef}
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
      >
        <div className="p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Share location</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Location name*:</label>
            <input
              type="text"
              value={markerData.name}
              onChange={(e) => setMarkerData("name", e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location on map*:</label>
            <div className="w-full h-64 bg-gray-200 mt-1 flex items-center justify-center">
              <MapContainer
                className="w-full h-full"
                center={[35.7219, 51.3347]}
                zoom={12}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
              </MapContainer>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location type*:</label>
            <select
              value={markerData.type}
              onChange={(e) => setMarkerData("type", e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded cursor-pointer"
            >
              <option value=""></option>
              <option value="business">Business</option>
              <option value="residential">Residential</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Logo:</label>
            <div
              className="cursor-pointer h--16 w-full mt-1 p-4 border border-dashed border-gray-300 rounded flex items-center justify-center"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              {markerData.icon ? (
                <img
                  className="w-16 h-16 object-none"
                  alt="marker-icon"
                  src={markerData.icon}
                />
              ) : (
                <label className="cursor-pointer flex flex-col items-center">
                  <svg
                    className="w-8 h-8 mb-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v16h16V4H4zm2 2h12v12H6V6zm4 4h4v4h-4v-4z"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-500">Upload</span>
                </label>
              )}

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/png, image/svg"
                onChange={onChangeFileInput}
              />
            </div>
          </div>
          {error && (
            <div className="py-1 text-red-700">
              <p>{error}</p>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={onSaveMarker}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMarkerDialog;
