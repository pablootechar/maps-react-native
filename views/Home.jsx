import React, { useState, useEffect, useRef, Fragment } from "react";
import { View, TouchableOpacity, Text, StatusBar } from "react-native";
import { home } from "../assets/css/home";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LocationAccuracy } from "expo-location";
import { MaterialIcons} from '@expo/vector-icons'
import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import TrackInfo from "../components/TrackInfo";

/*
  No "Location.watchPositionAsync", atualizar o origin com um setOrigin()
  pro componente refazer o trajeto com a nova distância restante.
*/

// Estilo do mapa (Mapview)
const mapStyle = require("../assets/json/mapStyle.json")

//Key da API Google maps
const googleApiKey = 'YOUR-API-KEY';

export default function Home() {

  const mapRef = useRef(null);
  const [trackInfo, setTrackInfo] = useState({ distance: 0, duration: 0 });
  const [isUserFixed, setIsUserFixed] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const togglePinUser = () => {
    // Inverte o isUserFixed de "false" pra "true" ou vice versa
    setIsUserFixed(!isUserFixed);
  }

  useEffect(() => {
    async function setOriginPosition() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      // Se a permissão de uso da localização não for permitido
      if (status !== 'granted') {
        // Lança um erro e o código não avança depois deste if
        throw new Error('Location permission not granted');
      }

      // Pega a localização atual do usuário
      const location = await Location.getCurrentPositionAsync(
        { enableHighAccuracy: true }
      );

      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      });
    }

    // Chama a função criada acima
    setOriginPosition();
  }, []);

  useEffect(() => {
    // Observa se o usuário mudou de posição, se sim, chama o callback
    const location = Location.watchPositionAsync({ accuracy: LocationAccuracy.BestForNavigation }, (location) => {
      // Pega a velocidade atual do usuário
      const { latitude, longitude } = location.coords;
      const speedKmPerHour = location.coords.speed.toFixed(0);

      // Se o usuário estiver fixado, anima a câmera para acompanha-lo
      if (isUserFixed) {
        mapRef.current.animateCamera({ center: { latitude, longitude,}});
      }

      setUserInformation({ latitude, longitude, speedKmPerHour });
    });

    // Quando o componente desmonta, limpa o listener
    return async () => {
      (await location).remove();
    }
  // Quando "isUserFixed" for alterado, este useEffect será chamado novamente
  }, [isUserFixed]);

  // useEffect que roda toda vez que a posição do usuário muda
  useEffect(() => {
    if (userInformation) {
      setOrigin({
        latitude: userInformation.latitude,
        longitude: userInformation.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      });
    }
  }, [userInformation]);


  return (
    <View style={home.container}>

          {/* estilização da barra de status do celular  */} 
          <StatusBar 
          translucent 
          barStyle={"light-content"}
          backgroundColor="#1B2649"
          />
          
          {/* API do google - busca de endereços */}
          <GooglePlacesAutocomplete
          placeholder='Escolha o seu destino'
          textInputProps={{
            placeholderTextColor: '#fff',}}
          onPress={(data, details) => {
            setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421
            });
          }}

          query={{
            key: googleApiKey,
            components: 'country:br',
            language: 'pt-br'
          }}

          fetchDetails={true}

          styles={{
              poweredContainer: { display: 'none' },
              container: { 
              width: '75%', 
              flex: 1, 
              flexDirection: 'column-reverse', 
              position: 'absolute', 
              zIndex: 99, 
              bottom: '88.4%',
              left: '5%',
               
            },
            listView: {width: '120%', position: 'absolute', top: '140%', backgroundColor: '#1B2649', zIndex: 99, borderRadius: 9 },
            textInput: {color: "#fff", height: '110%',fontSize: 16, fontStyle:"italic",  borderRadius: 8 , backgroundColor: '#1B2649', opacity: 0.95, borderWidth: 2, borderColor: '#eee'}, 
          }}
        />

      {/* View do mapa */}
      <MapView
        style={home.map}
        provider = { MapView.PROVIDER_GOOGLE }
        customMapStyle = { mapStyle }
        initialRegion={origin}
        showUserLocation={true}
        showsCompass={false}
        showsMyLocationButton={true}
        loadindEnabled={true}
        ref={mapRef}
      >
        {userInformation &&
          /* Marca a localização atual do usuário */
          <Marker coordinate={{ latitude: userInformation.latitude, longitude: userInformation.longitude }}>
            <View style={home.blueCircle} />
          </Marker>
        }
          
        {destination &&
          /* Traça a rota */
          <Fragment>
            <MapViewDirections
              language="pt-br"
              origin={origin}
              destination={destination}
              mode={"DRIVING"}
              precision={"high"}
              apikey={googleApiKey}
              strokeWidth={6}
              strokeColor="#fff"
              onReady={
                result => {
                  mapRef.current.fitToCoordinates(
                    result.latitude,
                    result.longitude,
                    { edgePadding: { top: 50, bottom: 50, left: 50, right: 50 } }
                  );

                  setTrackInfo({ distance: result.distance, duration: result.duration, finalAddress: result.legs[0].end_address })
                }
              }
            />

            {/* Marca o ponto de chegada no mapa */}
            <Marker
              coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
              title="Ponto de chegada"
              pinColor = "#0EBEDF" />
          </Fragment>
        }
      </MapView>

      {/* Botão que fixa/desfixa a câmera no usuário */}
      <View style={home.pinButtonContainer}>
        <TouchableOpacity onPress={togglePinUser} style={home.pinButton}>
          <MaterialIcons 
          name={isUserFixed ? 'gps-fixed' : 'gps-not-fixed'}
          size={25}
          color="#eee"
          />
        </TouchableOpacity>
      </View> 

      {/* View velocidade do usuário */}
      <View style={home.speedContainer}>
        <Text style={home.speedText}>{userInformation?.speedKmPerHour ?? 0}</Text>
        <Text style={home.speedText2}>Km/h</Text>
      </View>

      {/* View informações da rota */}
      <TrackInfo distance={trackInfo.distance} duration={trackInfo.duration} finalAddress={trackInfo.finalAddress} />
    </View>
  );
}