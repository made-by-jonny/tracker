/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Circle} from 'react-native-maps';
import geolib from 'geolib'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(){
    super()
      this.state = {items: []};
  }

  componentDidMount() {
    const active = false
      navigator.geolocation.watchPosition((e) => {
        const data = geolib.isPointInCircle(
          {latitude: 54.971938, longitude: -1.623452},
          {latitude: 54.978252,longitude: -1.617780},
          5000
        )
        if(data === true && active === true) {
          console.log('heya')
        }else {
          console.log('bye')
        }
      })
  }

  render() {
    return (
      <View style={styles.container}>
          <MapView
          style={styles.map}
          annotations={this.state.items}
          initialRegion={{
            latitude: 54.978252,
            longitude: -1.617780,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          >
          {this.state.items.map(item => {
            console.log(item.coords.longitude)
            return (
              <Circle
                fillColor="rgba(255,0,0,0.5)"
                radius={200} 
                center={item.coords}
              />
            )
          })}
          </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
