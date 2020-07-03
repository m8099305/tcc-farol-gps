import React, {memo} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {Svg, Polygon, G, Path} from 'react-native-svg';

export default memo(function Info({size = 46, onPress}) {
  return (
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        <Svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          height={size}
          width={size}
          style="enable-background:new 0 0 512 512;">
          <Path
            fill="#0A4EAF"
            d="M256,512c-68.38,0-132.667-26.629-181.02-74.98C26.629,388.667,0,324.38,0,256
	S26.629,123.333,74.98,74.98C123.333,26.629,187.62,0,256,0s132.667,26.629,181.02,74.98C485.371,123.333,512,187.62,512,256
	s-26.629,132.667-74.98,181.02C388.667,485.371,324.38,512,256,512z"
          />
          <Path
            fill="#063E8B"
            d="M437.02,74.98C388.667,26.629,324.38,0,256,0v512c68.38,0,132.667-26.629,181.02-74.98 C485.371,388.667,512,324.38,512,256S485.371,123.333,437.02,74.98z"
          />
          <Path
            fill="#FFFFFF"
            d="M256,185c-30.327,0-55-24.673-55-55s24.673-55,55-55s55,24.673,55,55S286.327,185,256,185z M301,395 V215H191v30h30v150h-30v30h140v-30H301z"
          />
          <G>
            <Path
              fill="#CCEFFF"
              d="M256,185c30.327,0,55-24.673,55-55s-24.673-55-55-55V185z"
            />
            <Polygon
              fill="#CCEFFF"
              points="301,395 301,215 256,215 256,425 331,425 331,395"
            />
          </G>
        </Svg>
      </TouchableWithoutFeedback>
    </View>
  );
});
