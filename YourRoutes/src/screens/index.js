import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

export default function LocationPicker({ navigation }) {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState('');
  const [coords, setCoords] = useState([]);
  const [loadingLoc, setLoadingLoc] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da sua localização');
        navigation.goBack();
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setOrigin(loc.coords);
      setLoadingLoc(false);
    })();
  }, []);

  const handleNavigate = async () => {
    if (!origin || !destination.trim()) {
      Alert.alert('Atenção', 'Origem ou destino faltando.');
      return;
    }

    try {
      // Geocoding do destino
      const geoResponse = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: destination, format: 'json', limit: 1 },
        headers: { 'User-Agent': 'atlasApp/1.0' },
      });

      if (!geoResponse.data.length) {
        Alert.alert('Erro', 'Destino não encontrado');
        return;
      }

      const dest = {
        latitude: parseFloat(geoResponse.data[0].lat),
        longitude: parseFloat(geoResponse.data[0].lon),
      };

      // Rota entre origem e destino
      const routeResponse = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car',
        {
          coordinates: [
            [origin.longitude, origin.latitude],
            [dest.longitude, dest.latitude],
          ]
        },
        {
          headers: {
            Authorization: '5b3ce3597851110001cf62481209e1a5f4674590a8a0e4b630c90c7b',
            'Content-Type': 'application/json',
          }
        }
      );

      const routeCoords = routeResponse.data.features[0].geometry.coordinates.map(([lon, lat]) => ({
        latitude: lat,
        longitude: lon,
      }));

      setCoords(routeCoords);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível traçar a rota');
    }
  };

  if (loadingLoc) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={origin} title="Você está aqui" />
        {coords.length > 0 && (
          <>
            <Marker coordinate={coords[coords.length - 1]} title="Destino" />
            <Polyline coordinates={coords} strokeWidth={4} strokeColor="blue" />
          </>
        )}
      </MapView>

      <TextInput
        style={styles.input}
        placeholder="Digite seu destino"
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Confirmar" onPress={handleNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map:       { flex: 1 },
  input:     {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  center:    {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});