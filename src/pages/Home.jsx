import { supabase } from "../config/supabase-config";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { TileLayer, MapContainer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import "leaflet/dist/leaflet.css";

// const customIcon = new Icon({
//   iconUrl: require("../images/placeholder.png"),
//   iconSize: [38, 38],
// });

// const createClusterCustomIcon = function (cluster) {
//   return new divIcon({
//     html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
//     className: "custom-marker-cluster",
//     iconSize: point(33, 33, true),
//   });
// };

export default function App() {
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    async function fetchDataFromSupabase() {
      try {
        const { data, error } = await supabase.from("coordinates_table").select("*");
        let arr = [];
        for (let n = 0; n < data.length; n++) {
          arr.push([data[n].lat, data[n].lon])
        }
        if (error) {
          console.error("Error fetching data from Supabase:", error);
        } else {
          setMarkers(arr)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataFromSupabase();
  }, []);

  const heatmapOptions = {
    radius: 20,
    blur: 20,
    maxZoom: 18,
    minOpacity: 0.5,
    maxOpacity: 1
  };


  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="w-[80%]  flex flex-col mt-16">
          <div className="px-16">
            <h1 className="outfit-600 text-[28px] mb-2">Dashboard</h1>
            <p className="outfit-300">The Main Hotspot Weed locations are shown below..</p>
          </div>

          <div className="mt-8">
            <MapContainer
              center={[18.54181410564795, 73.79118672935255]}
              zoom={12}
              key={Math.random()}
            >
              <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={markers}
                longitudeExtractor={(point) => point[1]}
                latitudeExtractor={(point) => point[0]}
                key={Math.random() + Math.random()}
                intensityExtractor={(point) => parseFloat(1)}
                {...heatmapOptions}
              />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}
