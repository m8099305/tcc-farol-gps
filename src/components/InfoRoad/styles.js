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
  header: {
    lineHeight: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: colors.info.border,
    color: colors.info.font,
    display: 'flex',
    textAlign: 'center',
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: 10,
    paddingVertical: 24,
  },
  leftContainer: {
    paddingRight: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
  },
  rightContainer: {
    paddingLeft: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: colors.info.font,
    lineHeight: 56,
  },
  inputs: {
    height: 56,
  },
});
