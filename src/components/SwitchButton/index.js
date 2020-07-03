import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';

import styles from './styles';

export default function SwitchButton({onSwitch, state, style}) {
  function handlePress() {
    onSwitch && onSwitch(!state);
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, style]}>
        <View style={styles.backgroundBar} />
        <View style={[styles.thumb, !state && styles.thumbOff]} />
      </View>
    </TouchableWithoutFeedback>
  );
}
