import { StyleSheet } from 'react-native';

export const home = StyleSheet.create({
  /* Container principal */
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },

  /* Mapa */
  map: {
    height: '100%'
  },

    /* Container botão de fixar/desfixar câmera no usuário */
  pinButtonContainer: {
    position: 'absolute',
    bottom: '88%',
    right: 15,
    width: 51,
    height: 50.2,
  },

  /* Botão de fixar/desfixar câmera no usuário */
  pinButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#1B2649',
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
  },

  /* Círculo da posição do usuário */
  blueCircle: {
    backgroundColor: '#0EBEDF',
    width: 18,
    height: 18,
    borderRadius: 18/2,
    borderWidth: 2,
    borderColor: '#fff',
  },

  /* Container da velocidade do usuário */
  speedContainer: {
    position: 'absolute',
    bottom: 27,
    right: 13,
    width: 130,
    height: 130,
    backgroundColor: '#1B2649',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.98
  },

  /* Texto da velocidade atual do usuário */
  speedText: {
    fontSize: 43,
    color: '#fff',
    fontWeight: 'bold'
  },

  /* Texto  da velocidade atual do usuário (km/h) */
  speedText2: {
    fontSize: 23,
    color: '#fff',
    fontWeight: 'bold'
  },
});