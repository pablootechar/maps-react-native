import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  /* Container das informações da rota */
  container: {
    position: 'absolute',
    bottom: 5,
    zIndex: 99,
    
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    
    paddingLeft: 10,
    paddingRight: 10,
    width: 280,
    height: 210,
    transform: [{ translateX: -230 }],
    
    backgroundColor: '#1B2649',
    opacity: 0.98,

    borderWidth: 2,
    borderColor: '#fff',
  },

  /* Texto das informações da rota  */
  text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  /* Botão de mostrar as informações */
  toggleDisplayButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -40,
    width: 40,
    backgroundColor: '#1B2649',
    borderWidth: 2,
    borderColor: '#fff',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    opacity: 0.98
  },

  distanceContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 140,
    height: 60,
    bottom: -9,
    backgroundColor: '#1B2649',
    borderWidth: 2,
    borderColor: '#fff',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    opacity: 0.93
  },

  distanceText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '900'
  }
});

export default style;