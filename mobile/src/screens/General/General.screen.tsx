import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

export let url = 'http://192.168.100.137:4000';

function GeneralScreen() {
  const [customUrl, setUrl] = useState('');

  return (
    <View style={{flex: 1, paddingTop: 50}}>
      <TextInput
        placeholder="Password"
        onChange={e => {
          setUrl(e.nativeEvent.text);
        }}
        style={{
          borderColor: '#333',
          borderWidth: 3,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          url = customUrl;
        }}>
        <Text style={{color: '#000'}}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}

export default GeneralScreen;
