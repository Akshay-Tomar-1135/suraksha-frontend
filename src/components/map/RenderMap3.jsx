import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';

function RenderMap3() {
  const position = {lat: 53.54992, lng: 10.00678};

  return (
    <APIProvider apiKey='AIzaSyAbAOxjpIBjb-mcOudJ7_6A6-Rxm2s5TDI'>
      <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID">
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}

export default RenderMap3;