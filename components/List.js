import { StyleSheet, Text, View, Button, ScrollView, Pressable, Image, FlatList} from 'react-native';
import { useState, useEffect, useRef} from 'react';
import ListItem from './listItem';


const List = (props) => {
    const [inputValue, setInputValue] = useState(' ')
    const [isFirstRun, setIsFirstRun] = useState(true)
    const[songsArray, setSongsArray] = useState([props.inputValue])

    const reOrderArrayForUpvotes = (array, indexOf, indexIn, object) => {

        const start = array.slice(0, indexIn)
        const end = array.slice(indexIn, array.length)
        const newArrayWithObject = start.concat(object).concat(end)
        const newStart = newArrayWithObject.slice(0,indexOf + 1)
        const newEnd = newArrayWithObject.slice(indexOf + 2, array.length + 1)
        const finalArray = newStart.concat(newEnd)

        return finalArray
    }
    const noReOrderUpvote = (array, index, object) => {
        const start = array.slice(0, index)
        const end = array.slice(index + 1, array.length)
        const finalArray = start.concat(object).concat(end)

        return finalArray
    }

    const onUpvotePressedHandler = (index) => {
        const currentVotes = songsArray[index].votes + 1
        const currentTitle = songsArray[index].title
        let notFound = true
        let loopValue = 0
        while(notFound){   
            if( currentVotes > songsArray[loopValue].votes){
                notFound = false
                continue
            }
            loopValue += 1
        }
        if(loopValue == index){
            setSongsArray(songsArray => noReOrderUpvote(songsArray, index, {title: currentTitle, votes: currentVotes}))
            console.log("not moving")
            return false
        }else{
            console.log("moving up")
            setSongsArray(songsArray => reOrderArrayForUpvotes(songsArray, index, loopValue, {title: currentTitle, votes: currentVotes}))
            return true
        }
       // console.log(loopValue)
            
           // songsArray.splice(loopValue, 0, {title: currentTitle, votes: currentVotes})
        
        console.log(loopValue)
     //   setSongsArray(songsArray => songsArray.slice(0, loopValue).concat({title: currentTitle, votes: currentVotes}).concat(songsArray.slice(loopValue + 1, songsArray.length)))
    }
    const onDownvotePressedHandler = (index) => {
        if(songsArray[index].votes > 0){
            setSongsArray(songsArray => songsArray.slice(0, index).concat({title: songsArray[index].title, votes: (songsArray[index].votes - 1)}).concat(songsArray.slice(index + 1, songsArray.length)))
        }
        
    }

    useEffect(() => {
        if(isFirstRun){
            setIsFirstRun(false)
            setSongsArray(songsArray.slice(1))
            return
        }
      
        setSongsArray(songsArray => [...songsArray, {title : props.inputValue, votes: 10}])
        console.log(songsArray)
    }, [props.inputValue])

    return(
        <View style = {styles.listContainer}>
            <FlatList 
            data = {songsArray}
            renderItem = {({item, index}) => (
                // <Text>{item}</Text>
                <ListItem 
                    songTitle = {item.title} 
                    numVotes = {item.votes} 
                    upvotePressed = {() => onUpvotePressedHandler(index)} 
                    downvotePressed = {() => onDownvotePressedHandler(index)}/>
            )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
       // flex: 1,
     //   backgroundColor: 'blue',

        height: '75%',
        width: '95%',
        
        //marginBottom: 200
    },

    flatList: {
      //  backgroundColor: 'green'
    }

  });

export default List