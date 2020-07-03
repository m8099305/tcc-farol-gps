import React, {memo, useState, useEffect} from 'react';
import {View, TouchableWithoutFeedback, BackHandler} from 'react-native';

import styles from './styles';
import InfoHour from '../InfoHour';
import InfoRoad from '../InfoRoad';
import InfoBluetooth from '../InfoBluetooth';
import InfoAbout from '../InfoAbout';

export default memo(function InfoSwitch({
  infoRef,
  settings,
  setSettings,
  bleStatus,
}) {
  const [show, setShow] = useState(null);

  function handlePress() {
    setShow(null);
  }

  useEffect(() => {
    function handleBackPress() {
      setShow(false);
      return show;
    }
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [show]);

  useEffect(() => {
    infoRef && (infoRef.current = {setShow});
  }, [infoRef]);

  function setInfoTime(time) {
    setSettings({...settings, time});
  }

  function setInfoRoad(road) {
    setSettings({...settings, road});
  }

  function setInfoBluetooth(bluetooth) {
    console.log('[InfoSwitch] bluetooth', bluetooth);
    setSettings({...settings, bluetooth});
  }

  console.log('[InfoSwitch] rendered');

  return (
    show && (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
        {show === 'time' && (
          <InfoHour state={settings.time} setState={setInfoTime} />
        )}
        {show === 'road' && (
          <InfoRoad state={settings.road} setState={setInfoRoad} />
        )}
        {show === 'bluetooth' && (
          <InfoBluetooth
            state={settings.bluetooth}
            setState={setInfoBluetooth}
            bleStatus={bleStatus}
          />
        )}
        {show === 'about' && <InfoAbout />}
      </View>
    )
  );
});
