import {StyleSheet} from 'react-native';

import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    height: 36,
    borderRadius: 4,
    borderColor: colors.info.borderTextInput,
    backgroundColor: colors.info.backgroundTextInput,
    textAlign: 'center',
    width: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.info.font,
    lineHeight: 56,
  },
});
