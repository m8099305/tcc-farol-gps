import React, {memo} from 'react';
import {View} from 'react-native';

import styles from './styles';
import Time from './Time';
import Road from './Road';
import Bluetooth from './Bluetooth';
import Info from './Info';

export default memo(function Menu({
  style,
  onTimePress,
  onRoadPress,
  onBluetoothPress,
  onInfoPress,
}) {
  console.log('[Menu] Rendered');

  return (
    <View style={[styles.container, style]}>
      <Time size={46} onPress={onTimePress} />
      <Road size={46} onPress={onRoadPress} />
      <Bluetooth size={46} onPress={onBluetoothPress} />
      <Info size={46} onPress={onInfoPress} />
    </View>
  );
});
