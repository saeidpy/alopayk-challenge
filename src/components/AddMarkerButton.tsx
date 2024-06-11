import { useModalStore } from "../states";

const AddMarkerButton = () => {
  const openModal = useModalStore((state) => state.openModal);

  const handleClick = () => {
    openModal();
  };

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control">
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white p-2 rounded shadow-md m-2 hover:bg-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddMarkerButton;
