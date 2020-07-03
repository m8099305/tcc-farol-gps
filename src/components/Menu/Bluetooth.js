import React, {memo} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {Svg, Circle, Path} from 'react-native-svg';

export default memo(function Bluetooth({size = 46, onPress}) {
  return (
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        <Svg
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          height={size}
          width={size}
          viewBox="0 0 512 512"
          style="enable-background:new 0 0 512 512;">
          <Circle fill="#25B6D2" cx="256" cy="256" r="256" />
          <Path
            fill="#FFFFFF"
            d="M253.496,448V273.976l-80,80l-11.312-11.312l86.336-86.336l-89.32-89.344l11.312-11.312 l82.984,83.008V64L358.48,169l-87.328,87.328l87,87L253.496,448z M269.496,277.328v132.024l66.024-66.024L269.496,277.328z M269.496,102.664v132.688L335.848,169L269.496,102.664z"
          />
        </Svg>
      </TouchableWithoutFeedback>
    </View>
  );
});
