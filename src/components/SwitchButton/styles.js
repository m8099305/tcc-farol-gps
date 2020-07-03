import {StyleSheet} from 'react-native';

import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundBar: {
    width: 48,
    height: 18,
    backgroundColor: colors.switchButton.background,
    borderRadius: 9,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.switchButton.thumb,
    position: 'absolute',
    right: 0,
  },
  thumbOff: {
    backgroundColor: colors.switchButton.thumbOff,
    right: 'auto',
    left: 0,
  },
});
