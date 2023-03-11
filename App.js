import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import SongInput from './components/songInput';
import List from './components/List';

export default function App() {
  const [list, setList] = useState([])

  const inputSubmitHandler = (value) => {
    console.log("printing from app.js", value)
  }
  return (
    <View style={styles.container}>
      <SongInput onInputSubmit = {inputSubmitHandler}/>
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor: 'red',
    flexDirection: 'column'
  },
  text: {
   // fontSize: 100,
   //flex: 2,
   // backgroundColor: 'red'
  }
});
