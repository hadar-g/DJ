import { StyleSheet, Text, View, Button, ScrollView, Pressable, Image, Animated} from 'react-native';
import { useState, useRef} from 'react';


const DropdownItem = (props) => {

    return(
        <Pressable 
        style = {({pressed}) => [pressed ? {...styles.drowpdownItem, opacity: 0.4} : styles.drowpdownItem]}
        onPress={props.onPress}
        >
            <Text style = {styles.text}>{props.item.name}</Text>
            <Text>{props.item.artist}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    drowpdownItem: {
        flex: 1,
        borderColor: 'black',
        backgroundColor: 'grey',
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        margin: 2,
        width: '100%'
    },
    text: {
        fontSize: 20
    }
})

export default DropdownItem
