import {StyleSheet} from 'react-native';

import colors from '../../config/colors';

const width = 310;

export default StyleSheet.create({
  container: {
    display: 'flex',
    width,
    backgroundColor: colors.info.background,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 15,
  },
  header: {
    lineHeight: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: colors.info.border,
    color: colors.info.font,
    display: 'flex',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.info.font,
    lineHeight: 56,
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
