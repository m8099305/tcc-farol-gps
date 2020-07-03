import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import SwitchButton from '../SwitchButton';
import TimeInput from '../TimeInput';

export default function InfoHour({state, setState}) {
  function handleStartTimeChange(date) {
    setState({...state, start: date});
  }

  function handleEndTimeChange(date) {
    setState({...state, end: date});
  }

  function handleAutoModeChange(value) {
    setState({...state, auto: value});
  }

  console.log('[InfoHour] rendered');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Horário</Text>
      <View style={styles.inputsContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.text}>Ligar às</Text>
          <Text style={styles.text}>Desligar às</Text>
          <Text style={styles.text}>Automático</Text>
        </View>
        <View style={styles.rightContainer}>
          <TimeInput
            style={styles.inputs}
            time={state.start}
            onTimeChange={handleStartTimeChange}
          />
          <TimeInput
            style={styles.inputs}
            time={state.end}
            onTimeChange={handleEndTimeChange}
          />
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
