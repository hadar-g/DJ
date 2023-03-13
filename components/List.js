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
    const reOrderArrayForDownvotes = (array, indexForItemToBePlaced, indexOfItemToBeMoved, object) => {
        const start = array.slice(0, indexForItemToBePlaced + 1)
        const end = array.slice(indexForItemToBePlaced + 1, array.length)
        const arrayWith = start.concat(object).concat(end)
        const newStart = arrayWith.slice(0, indexOfItemToBeMoved)
        const newEnd = arrayWith.slice(indexOfItemToBeMoved + 1, array.length + 1)
        const finalArray = newStart.concat(newEnd)

        console.log("start: ", start)
console.log("end: ", end)
console.log("array with: " ,arrayWith)
console.log("new start: ", newStart)
console.log("new end: ", newEnd)
console.log("new array: ", finalArray)

        return finalArray
        

    }
    const noReOrderDownvote = () => {

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
            console.log("not moving up")
            return false
        }else{
            console.log("moving up")
            setSongsArray(songsArray => reOrderArrayForUpvotes(songsArray, index, loopValue, {title: currentTitle, votes: currentVotes}))
            return true
        }
       // console.log(loopValue)
            
           // songsArray.splice(loopValue, 0, {title: currentTitle, votes: currentVotes})
        
       // console.log(loopValue)
     //   setSongsArray(songsArray => songsArray.slice(0, loopValue).concat({title: currentTitle, votes: currentVotes}).concat(songsArray.slice(loopValue + 1, songsArray.length)))
    }
    const onDownvotePressedHandler = (index) => {
        console.log("downvote pressed in index", index)
        const currentVotes = songsArray[index].votes - 1
        const currentTitle = songsArray[index].title
        let downNotFound = true
        let downLoopValue = songsArray.length
        
        while(downLoopValue != 0){  
            downLoopValue -= 1 
           console.log('loop', downLoopValue)
           console.log("index w" , index)
            if( currentVotes < songsArray[downLoopValue].votes){
                //downNotFound = false
                break
            }
        }

        if(downLoopValue == index){
            setSongsArray(songsArray => noReOrderUpvote(songsArray, index, {title: currentTitle, votes: currentVotes}))
            console.log("not moving down")
        }else{
            console.log("moving down")
            setSongsArray(songsArray => reOrderArrayForDownvotes(songsArray, downLoopValue, index, {title: currentTitle, votes: currentVotes}))
        }
        // if(songsArray[index].votes > 0){
        //     setSongsArray(songsArray => songsArray.slice(0, index).concat({title: songsArray[index].title, votes: (songsArray[index].votes - 1)}).concat(songsArray.slice(index + 1, songsArray.length)))
        // }
        
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