import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator, Button, TextInput } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import * as Location from 'expo-location';

export default function RouteScreen() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState('');
  const [coords, setCoords] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Precisamos da sua localização para traçar a rota.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível obter a localização atual.');
      }
    };

    getCurrentLocation();
  }, []);

  const handleRoute = async () => {
    if (!origin || !destination) {
      Alert.alert('Erro', 'Por favor, defina um destino.');
      return;
    }

    try {
      setLoading(true);

      // Geocoding destino
      const geo = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: destination, format: 'json', limit: 1 },
        headers: { 'User-Agent': 'atlasApp/1.0' },
      });

      if (!geo.data.length) {
        Alert.alert('Erro', 'Destino não encontrado');
        setLoading(false);
        return;
      }

      const loc = geo.data[0];
      const destCoords = {
        latitude: parseFloat(loc.lat),
        longitude: parseFloat(loc.lon),
      };

      // Directions usando OpenRouteService
      const ors = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car',
        {
          coordinates: [
            [origin.longitude, origin.latitude],
            [destCoords.longitude, destCoords.latitude],
          ],
        },
        {
          headers: {
            Authorization: '5b3ce3597851110001cf62481209e1a5f4674590a8a0e4b630c90c7b',
            'Content-Type': 'application/json',
          },
        }
      );

      const geom = ors.data.routes[0].geometry;
      const decoded = polyline.decode(geom).map(([lat, lon]) => ({ latitude: lat, longitude: lon }));
      setCoords(decoded);
      setInfo(ors.data.routes[0].summary);
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível traçar a rota');
    } finally {
      setLoading(false);
    }
  };

  if (!origin) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Obtendo localização...</Text>
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
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o destino"
          value={destination}
          onChangeText={setDestination}
        />
        <Button title="Traçar Rota" onPress={handleRoute} disabled={loading} />
      </View>

      {info && (
        <View style={styles.infoBox}>
          <Text>Duração: {(info.duration / 60).toFixed(1)} min</Text>
          <Text>Distância: {(info.distance / 1000).toFixed(2)} km</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  infoBox: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
});