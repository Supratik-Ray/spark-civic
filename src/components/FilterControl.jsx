import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import ReactDOM from "react-dom/client";

const FilterControl = ({ children }) => {
  const map = useMap();

  useEffect(() => {
    const controlDiv = L.DomUtil.create("div", "leaflet-bar");
    controlDiv.style.background = "white";
    controlDiv.style.padding = "10px";
    controlDiv.style.borderRadius = "8px";
    controlDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

    const customControl = L.Control.extend({
      options: { position: "topright" },
      onAdd: () => controlDiv,
    });

    const ctrl = new customControl();
    map.addControl(ctrl);

    // Render React children into the div
    const root = ReactDOM.createRoot(controlDiv);
    root.render(children);

    return () => {
      map.removeControl(ctrl);
      root.unmount();
    };
  }, [map, children]);

  return null;
};

export default FilterControl;
