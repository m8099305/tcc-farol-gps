import React, {useMemo, useState, useEffect, useRef, useCallback} from 'react';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import {View} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import base64 from 'react-native-base64';

import osm from './lib/osmAPI';
import styles from './styles.js';
import Location from './components/Location';
import Car from './components/Car';
import PowerButton from './components/PowerButton';
import Menu from './components/Menu';
import InfoSwitch from './components/InfoSwitch';

const defaultLocation = {
  road: '',
  city: '',
  isRoad: false,
};

const defaultSettings = {
  time: {
    start: makeTime(18),
    end: makeTime(6),
    auto: false,
  },
  road: {
    auto: true,
  },
  bluetooth: {
    device: 'FAROL-AUTO',
    password: 'm8099305',
  },
};

const bleStatusMessages = {
  Connected: 'Bluetooth conectado',
  Unkown: 'Obtendo informações...',
  Resetting: 'Conexão perdida. Reconectando...',
  Unauthorized: 'Sem permissões para acessar o Bluetooth',
  PoweredOff: 'Bluetooth desligado',
  PoweredOn: 'Bluetooth ligado e disponível',
  Unsupported: 'Bluetooth não suportado',
};

const SERVICE_UUID = 'ab0828b1-198e-4351-b779-901fa0e0371e';
const CHARACTERISTIC_UUID_RX = '4ac8a682-9736-4e5d-932b-e9b31405049c';
const CHARACTERISTIC_UUID_TX = '0972EF8C-7613-4075-AD52-756F33D4DA91';

export default function App(props) {
  const [settings, setSettings] = useState(defaultSettings);
  const [lightsOn, setLightsOn] = useState(false);
  const [location, setLocation] = useState(getDefaultLocation());
  const [bleState, setBleState] = useState('Unkown');
  const [bleDevice, setBleDevice] = useState(null);
  const bleManager = useMemo(() => new BleManager(), []);
  const infoRef = useRef(null);

  useEffect(askForLocationPermission, []);

  useEffect(() => {
    const subscription = bleManager.onStateChange(setBleState, true);
    return subscription.remove;
  }, [bleManager]);

  useEffect(() => {
    if (bleState !== 'PoweredOn' || bleState === 'Connected') {
      return;
    }

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        return setBleDevice(null);
      }

      if (device.name === settings.bluetooth.device) {
        bleManager.stopDeviceScan();
        device
          .connect()
          .then(dev => dev.discoverAllServicesAndCharacteristics())
          .then(dev => {
            setBleState('Connected');
            setBleDevice(dev);
          });
      }
    });
  }, [bleDevice, bleManager, bleState, settings.bluetooth.device]);

  useEffect(() => {
    if (bleDevice) {
      const msg = settings.bluetooth.password + (lightsOn ? 'L1' : 'L0');
      bleDevice
        .writeCharacteristicWithResponseForService(
          SERVICE_UUID,
          CHARACTERISTIC_UUID_RX,
          base64.encode(msg),
        )
        .then(console.log)
        .catch(console.warn);
    }
  }, [lightsOn, bleDevice, settings.bluetooth.password]);

  useEffect(() => {
    AsyncStorage.getItem('settings').then(setting => {
      console.log('[App] Retrieving setting...');
      if (setting) {
        setting = JSON.parse(setting);
        setting.time.start = new Date(setting.time.start);
        setting.time.end = new Date(setting.time.end);
        setSettings(setting);
        console.log('[App] Settting successfully retrived');
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('settings', JSON.stringify(settings));
    console.log('[App] Setting successfully updated');
  }, [settings]);

  const updateLocation = useCallback(loc => {
    if (!loc || !loc.coords) {
      console.warn('[App] sem sinal de GPS', loc);
      return setLocation(defaultLocation);
    }

    const {latitude, longitude} = loc.coords;

    osm
      .get(`/reverse?format=json&lat=${latitude}&lon=${longitude}`)
      .then(({data}) =>
        setLocation({
          road: data.address.road,
          city: data.address.city || data.address.town,
          hasGPS: true,
          isRoad: isRoad(data.address.road),
        }),
      )
      .catch(error => {
        console.warn({error});
        setLocation({...defaultLocation, hasGPS: true});
      });
  }, []);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true, // get position from GPS
      distanceFilter: 50, // minimum distance in meters for a new GPS request
    };
    const watchID = Geolocation.watchPosition(
      updateLocation,
      updateLocation,
      options,
    );
    return () => Geolocation.clearWatch(watchID);
  }, [updateLocation]);

  const menuHandlers = useMemo(() => {
    return {
      onTimePress: () => infoRef.current && infoRef.current.setShow('time'),
      onRoadPress: () => infoRef.current && infoRef.current.setShow('road'),
      onBluetoothPress: () =>
        infoRef.current && infoRef.current.setShow('bluetooth'),
      onInfoPress: () => infoRef.current && infoRef.current.setShow('about'),
    };
  }, []);

  useEffect(() => {
    if (settings.road.auto && location.isRoad) {
      console.log('[App] lights on by LOCATION');
      setLightsOn(true);
    }
  }, [location, settings]);

  useEffect(() => {
    if (!settings.time.auto) {
      return;
    }
    console.log('[App] check interval...');
    if (isNowBetweenTimeInterval(settings.time)) {
      return setLightsOn(true);
    }
    const timeDescriptor = setInterval(() => {
      console.log('[App] checking time...');
      if (isNowBetweenTimeInterval(settings.time)) {
        clearInterval(timeDescriptor);
        return setLightsOn(true);
      }
    }, 60000);
    return () => clearInterval(timeDescriptor);
  }, [settings.time]);

  const bleStatus = bleStatusMessages[bleState] || '';

  console.log('[App] rendered');

  return (
    <View style={styles.container}>
      <Location location={location} />
      <Car lightsOn={lightsOn} />
      <PowerButton lightsOn={lightsOn} setLightsOn={setLightsOn} />
      <Menu style={styles.menu} {...menuHandlers} />
      <InfoSwitch
        infoRef={infoRef}
        settings={settings}
        bleStatus={bleStatus}
        setSettings={setSettings}
      />
    </View>
  );
}

function makeTime(hours = 0, minutes = 0) {
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}

function isRoad(roadName) {
  if (!roadName || typeof roadName !== 'string') {
    return false;
  }

  const roadKeys = ['rodovia', 'estrada'];
  const name = roadName.toLowerCase();
  for (let i = 0; i < roadKeys.length; i += 1) {
    if (name.startsWith(roadKeys[i])) {
      return true;
    }
  }
  return false;
}

function getSecondsOfTheDay(time) {
  return time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
}

function isNowBetweenTimeInterval({start, end}) {
  const now = getSecondsOfTheDay(new Date());
  start = getSecondsOfTheDay(start);
  end = getSecondsOfTheDay(end);
  return start < end ? now >= start && now <= end : now <= end || now >= start;
}

function getDefaultLocation() {
  return {
    road: '',
    city: '',
    hasGPS: false,
    isRoad: false,
  };
}

function askForLocationPermission() {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(response => {
        const granted = response === PermissionsAndroid.RESULTS.GRANTED;
        console.log('[App] GPS permission', granted ? 'granted' : 'denied');
      })
      .catch(error => console.warn('[App] GPS permission:', error.message));
  }
}
