import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import style from "./style";
import { MaterialIcons } from '@expo/vector-icons' ;

export default function TrackInfo({ distance, duration, finalAddress }) {
  const [isInformationsDisplayed, setIsInformationsDisplayed] = useState(false);

  // Distância formatada do trajeto
  const formattedDistance = distance.toFixed(2);

  // Duração formatada do trajeto (horas e minutos)
  const hours = (duration / 60).toFixed(0);
  const minutes = (duration % 60).toFixed(0);

  //Endereço final
  const address = finalAddress

  // Função chamada ao pressionar o botão de toggle da TrackInfo
  const onPressTouchable = () => {
    setIsInformationsDisplayed(!isInformationsDisplayed);
  }

  return (
    <View>
    <View style={[style.container, { transform: [{ translateX: isInformationsDisplayed ? 0 : -280 }] }, {display: formattedDistance > 0.0001 ? 'flex' : 'none'}]}>
      <Text style={style.text}>
        Informações da rota:
        {'\n'}
      </Text>
      
      <Text style={style.text}>
        {hours > 0
          ? `Duração: ${hours} h ${minutes} min`
          : `Duração: ${minutes} min`
        }
      </Text>

      <Text style={style.text}>
        Endereço:{'\n'} {address}
      </Text>
      
      <TouchableOpacity onPress={onPressTouchable} style={[style.toggleDisplayButton, {height: isInformationsDisplayed ? 210 : 70}]}>
        <MaterialIcons 
        name={ isInformationsDisplayed ? "chevron-left" : "chevron-right" } 
        size={34} 
        color="#eee"
        >
        </MaterialIcons>
      </TouchableOpacity>
    </View>
    <View style={[style.distanceContainer, {display: formattedDistance > 0.0001 ? 'flex' : 'none'}]}>
      <Text style={style.distanceText}>
        {formattedDistance}km
      </Text>
    </View>
    </View>
  );
}