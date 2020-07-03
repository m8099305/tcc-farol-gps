import React from 'react';
import {View, Text, TextInput} from 'react-native';

import styles from './styles';

export default function InfoBluetooth({state, setState, bleStatus}) {
  function handleNameChange(text) {
    setState({...state, device: text});
  }

  function handlePasswordChange(text) {
    setState({...state, password: text});
  }

  console.log('[InfoBluetooth] rendered');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bluetooth</Text>
      <View style={styles.inputsContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.text}>Dispositivo</Text>
          <Text style={styles.text}>Senha</Text>
        </View>
        <View style={styles.rightContainer}>
          <TextInput
            style={styles.textInput}
            value={state.device}
            onChangeText={handleNameChange}
          />
          <TextInput
            style={styles.textInput}
            value={state.password}
            textContentType="password"
            secureTextEntry
            onChangeText={handlePasswordChange}
          />
        </View>
      </View>
      <Text style={styles.status}>{bleStatus}</Text>
    </View>
  );
}
