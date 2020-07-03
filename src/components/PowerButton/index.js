import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {Svg, G, Circle, Line, Path} from 'react-native-svg';

import styles from './styles';

import colors from '../../config/colors';

export default function PowerButton({size = 70, lightsOn, setLightsOn}) {
  function handlePress() {
    setLightsOn(!lightsOn);
  }

  const buttonFillColor = lightsOn
    ? colors.powerButton.fillEnabled
    : colors.powerButton.fillDisabled;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Svg
          enable-background="new 0 0 64 64"
          height={size}
          id="Layer_1"
          version="1.1"
          viewBox="0 0 64 64"
          width={size}>
          <Circle cx="32" cy="32" fill={buttonFillColor} r="32" />
          <G opacity="0.2">
            <Path
              d="M32,52c-9.925,0-18-8.075-18-18c0-6.359,3.411-12.312,8.902-15.535c0.952-0.56,2.178-0.24,2.737,0.713   c0.559,0.953,0.24,2.178-0.713,2.737C20.654,24.423,18,29.053,18,34c0,7.72,6.28,14,14,14c7.72,0,14-6.28,14-14   c0-5.065-2.749-9.749-7.173-12.226c-0.964-0.539-1.308-1.758-0.768-2.722c0.539-0.963,1.757-1.308,2.722-0.768   C46.468,21.467,50,27.489,50,34C50,43.925,41.925,52,32,52z"
              fill="#231F20"
            />
          </G>
          <G opacity="0.2">
            <Path
              d="M32,36c-1.105,0-2-0.896-2-2V14c0-1.104,0.895-2,2-2c1.104,0,2,0.896,2,2v20C34,35.104,33.104,36,32,36z"
              fill="#231F20"
            />
          </G>
          <Path
            d="M39.804,18.029  C44.694,20.767,48,25.997,48,32c0,8.837-7.163,16-16,16c-8.837,0-16-7.163-16-16c0-5.887,3.179-11.031,7.914-13.809"
            fill="none"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="4"
          />
          <Line
            fill="none"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="4"
            x1="32"
            x2="32"
            y1="32"
            y2="12"
          />
        </Svg>
      </TouchableWithoutFeedback>
    </View>
  );
}
