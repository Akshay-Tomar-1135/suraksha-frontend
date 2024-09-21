import { useState, useEffect, useRef } from "react";
import { OlaMaps } from "../../../OlaMapsWebSDK/olamaps-js-sdk.es";
import "../../../OlaMapsWebSDK/style.css"; 

function RenderMap() {
  const mapContainerRef = useRef(null); 
  const [mapReady, setMapReady] = useState(false); 

  useEffect(() => {
    if (!mapReady) return; 
    console.log("af");
    const api_key = 'SPFxc71FNc3LIdEcqyfDsg01EhUM41Nkq43BiRQf';
    const olaMaps = new OlaMaps({
      apiKey: api_key
    });

    const myMap = olaMaps.init({
      style: "https://api.olamaps.io/tiles/vector/v1/styles/default-standard/style.json",
      container: mapContainerRef.current, 
      center: [77.61648476788898, 12.931423492103944], 
      zoom: 13,
    });

  }, [mapReady]); 
  useEffect(() => {
    setMapReady(true); 
  }, []);

  return (
    <>
      <div
        style={{ width: "50vw", height: "50vh", border:"2px solid black" }} 
        ref={mapContainerRef} 
        id="central-map" 
      />
    </>
  );
}

export default RenderMap;
