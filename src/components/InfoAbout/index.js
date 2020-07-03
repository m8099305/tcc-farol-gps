import React from 'react';
import {View, Text, Image} from 'react-native';

import styles from './styles';

import avatar from '../../assets/img/avatar.png';

export default function InfoAbout() {
  console.log('[InfoAbout] rendered');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Informações</Text>
      <View style={styles.description}>
        <Text style={styles.text}>Desenvolvido por</Text>
        <Image source={avatar} style={styles.avatar} />
        <Text style={[styles.text, styles.textBold]}>
          Murilo Martins Marques
        </Text>
        <Text style={styles.text}>Tecnologia em Eletrônica Automotiva</Text>
        <Text style={styles.text}>Faculdade de Tecnologia de Sorocaba</Text>
        <Text style={styles.text}>Junho de 2020</Text>
      </View>
    </View>
  );
}
