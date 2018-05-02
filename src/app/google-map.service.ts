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

  location: any;
  constructor() { }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
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

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Got you!'
    });

    marker.addListener('click', this.simpleMarkerHandler);

    marker.addListener('click', () => {
      this.markerHandler(marker);
    });
  }

  private simpleMarkerHandler() {
    alert('Simple Component\'s function...');
  }

  private markerHandler(marker: google.maps.Marker) {
    alert('Marker\'s Title: ' + marker.getTitle());
  }

  //geocoder part

  geocode(address, callback){
    this.geocoder = new google.maps.Geocoder();
    this.geocodeAddress(this.geocoder, this.map, address, function(location){
      callback(location);
    });
  }
  private geocodeAddress(geocoder, resultsMap, address, fn){
    geocoder.geocode({address}, function(results, status){
      if(status==='OK'){
        console.log(results[0]);
        var location = {
          'lat': results[0].geometry.location.lat(),
          'lng': results[0].geometry.location.lng()
        };
        fn(location);
        resultsMap.setCenter(results[0].geometry.location);
        var Marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          draggable: true
        });
        //console.log(locat);
      }else{
        alert('Geocode was not successful for this address');
      }
    });
  }


  // Find me and Track me


  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  private showPosition(position) {
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);
    console.log(location);
    
    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        draggable: false,
        title: 'Your location!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  private showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Your location !'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }
}
