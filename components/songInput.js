import { StyleSheet, Text, View, Button, ScrollView, Pressable, Image, TextInput} from 'react-native';
import { useState} from 'react';


const SongInput = (props) => {

    const songSubmitHandler = () => {
        props.onInputSubmit(inputValue)
        setInputValue('')
    }

    const [inputValue, setInputValue] = useState('')
    return(
        <View style = {styles.input}>
        <TextInput
        onChangeText={setInputValue}
        style={styles.inputText}
        value={inputValue}
        placeholder="Enter Song Name"
      />

        <Button title ="submit" onPress={songSubmitHandler}/>
        </View>

    )
}


const styles = StyleSheet.create({
    input: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '15%',
     //   backgroundColor: 'green',
        height: 50
    },
    inputText: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: '70%',
        height: '5%',
        paddingLeft: 10
    },
  });

export default SongInput