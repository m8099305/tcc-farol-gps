import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

import SwitchButton from '../SwitchButton';

export default function InfoRoad({state, setState}) {
  function handleAutoModeChange(value) {
    setState({...state, auto: value});
  }

  console.log('[InfoRoad] rendered');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rodovia</Text>
      <View style={styles.inputsContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.text}>Automático</Text>
        </View>
        <View style={styles.rightContainer}>
          <SwitchButton
            style={styles.inputs}
            state={state.auto}
            onSwitch={handleAutoModeChange}
          />
        </View>
      </View>
    </View>
  );
}
