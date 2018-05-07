import { Injectable } from '@angular/core';
import { } from '@types/googlemaps';

@Injectable()
export class GoogleMapService {
  map: google.maps.Map;

  latitude: any;
  longitude: any;

  geocoder : google.maps.Geocoder;
  address: any;

  isTracking: Boolean;

  marker: google.maps.Marker;
  infowin:  google.maps.InfoWindow;
  location: any;
  constructor() { }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }


  putMarker(location) {
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: false,
      title: 'You are here'
    });
    this.infowin = new google.maps.InfoWindow;
    this.infowin.setContent('You are here');
    this.infowin.open(this.map, this.marker);
  }

  init(gmapElement){
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(gmapElement.nativeElement, mapProp);
  }

  setCenter(latitude, longitude) {
    this.map.setCenter(new google.maps.LatLng(latitude, longitude));
    console.log(latitude, longitude);
    let location = new google.maps.LatLng(latitude, longitude);

    this.putMarker(location);

    /*marker.addListener('click', this.simpleMarkerHandler);

    marker.addListener('click', () => {
      this.markerHandler(marker);
    });*/
  }
  
  /*private simpleMarkerHandler() {
    alert('Simple Component\'s function...');
  }

  private markerHandler(marker: google.maps.Marker) {
    alert('Marker\'s Title: ' + marker.getTitle());
  }*/
  mark(lat, lng){
    let location = new google.maps.LatLng(lat, lng);
    this.map.panTo(location);
    this.putMarker(location);
  }
  //geocoder part
  async geocode(address){
    this.geocoder = new google.maps.Geocoder();
    var res = await this.geocodeAddress(this.geocoder, this.map, address);
    this.putMarker(res['location']);
    return res['latlng'];
  }

  private geocodeAddress(geocoder, resultsMap, address) {
    return new Promise(function(res, rej){
      geocoder.geocode({ address }, function (results, status) {
        if (status === 'OK') {
          console.log(results[0]);
          
          var latlng = {
            'lat': results[0].geometry.location.lat(),
            'lng': results[0].geometry.location.lng()
          };
          resultsMap.setCenter(results[0].geometry.location);
          res({ latlng, 'location': results[0].geometry.location });
        } else {
          rej('Geocode was not successful for this address');
        }
      });
    })
  }
  // Find me
  async findMe() {
    if (navigator.geolocation) {
      let position = await new Promise((res, rej)=>{
        navigator.geolocation.getCurrentPosition((position) => {
          try {
            res(position)
          }catch(e){
            rej(e)
          }
        });
      });
     return this.showPosition(position);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  private showPosition(position) {
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);
    console.log(location);
    this.putMarker(location);
    return position;
  }
}
