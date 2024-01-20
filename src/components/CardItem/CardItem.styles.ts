import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {SHADOWS} from '../../constants/Shadows';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    alignSelf: 'center',
    height: 80,
    backgroundColor: COLORS.white,
    ...SHADOWS.card,
  },
  imageContainer: {
    width: '20%',
  },
  contentContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  dataContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default styles;
