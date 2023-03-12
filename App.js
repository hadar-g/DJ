import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import SongInput from './components/songInput';
import List from './components/List';

export default function App() {
  const [songsList, setSongsList] = useState([])
  const[valueFromInput, setValueFromInput] = useState("")

  const inputSubmitHandler = (value) => {
    console.log(valueFromInput)
    setValueFromInput(value)
    setSongsList(songsList => [...songsList, {title: value, votes: '5'} ])
    console.log(songsList)
    
  }
  return (
    <View style={styles.container}>
      <SongInput onInputSubmit = {inputSubmitHandler}/>
      <List inputValue={valueFromInput} songsList = {songsList}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     // flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  //  backgroundColor: 'red',
    flexDirection: 'column'
  },
  text: {
   // fontSize: 100,
   //flex: 2,
   // backgroundColor: 'red'
  }
});
