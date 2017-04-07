function MapController ($http, $state, SERVER, $location){

let vm = this;

vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
}

export default MapController;
