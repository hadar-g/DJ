import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import SongInput from './components/songInput';
import List from './components/List';

export default function App() {
  const [songsList, setSongsList] = useState([])
  const[valueFromInput, setValueFromInput] = useState({})

  const inputSubmitHandler = (value) => {
  //  console.log(valueFromInput)
    setValueFromInput(value) 
  }
  return (
    <View style={styles.container}>
      <SongInput 
        style = {styles.songInput}
        onInputSubmit = {inputSubmitHandler}/>
      <List 
        style = {styles.listContainer}
        inputValue={valueFromInput}
        onAddSong = {() => valueFromInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     // flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor: 'red',
    flexDirection: 'column'
  },
  text: {
   // fontSize: 100,
   //flex: 2,
   // backgroundColor: 'red'
  },
  songInput: {
    height: 100,
    backgroundColor: 'green'
  },
  listContainer: {
    backgroundColor: 'blue'

  }
});
