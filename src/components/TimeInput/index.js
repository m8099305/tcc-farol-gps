import React, {useState} from 'react';
import {TouchableWithoutFeedback, View, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';

function formatTime(time) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
}

export default function TimeInput({time, style, onTimeChange}) {
  const [show, setShow] = useState(false);

  function handleChange(event, selectedTime) {
    setShow(false);
    const newTime = selectedTime || time;
    if (newTime !== time) {
      onTimeChange && onTimeChange(newTime);
    }
  }

  function handlePress() {
    setShow(!show);
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.button}>
          <Text style={styles.text}>{formatTime(time)}</Text>
        </View>
      </TouchableWithoutFeedback>
      {show && (
        <DateTimePicker
          value={time}
          is24Hour
          mode="time"
          onChange={handleChange}
        />
      )}
    </View>
  );
}
