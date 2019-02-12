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
      this.state = {items: [], inCircle: 'no'};
  }

  componentDidMount() {
      navigator.geolocation.watchPosition((e) => {
        const data = geolib.isPointInCircle(
          {latitude: e.coords.latitude, longitude: e.coords.longitude},
          {latitude: 54.971752,longitude: -1.623445},
          1000
        )
        if(data === true) {
          this.setState({inCircle: 'yes'})
        }else {
          this.setState({inCircle: 'no'})
        }
      })
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>Am I at work: {this.state.inCircle}</Text>
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
    zIndex: -1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: '#fff',
    zIndex: 10
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


{/* <key>NSExceptionDomains</key>
		<dict>
			<key>localhost</key>
			<dict>
				<key>NSExceptionAllowsInsecureHTTPLoads</key>
				<true/>
			</dict>
		</dict> */}