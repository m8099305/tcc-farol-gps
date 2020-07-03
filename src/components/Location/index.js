import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import Map from './Map';

export default function Location({style, location}) {
  return (
    <View style={[styles.container, style]}>
      <Map size={36} style={styles.map} />
      <Text style={styles.text}>
        {location.road ||
          location.city ||
          (location.hasGPS
            ? 'Não foi possível obter o endereço. Verifique se há conexão com a internet.'
            : 'Sem sinal de GPS')}
      </Text>
    </View>
  );
}
