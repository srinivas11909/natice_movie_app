import React from "react";
import { Text, View,FlatList, StyleSheet } from "react-native";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
    return(
        <View style={style.container}>
            <Text style={style.titleText}>{props.title}</Text>
            <FlatList 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={props.movieData}
                keyExtractor={(data) => data.id} 
                renderItem={({item}) => <MovieCard data={item}/>}
            />
        </View>
    )
}

export default MovieList

const style = StyleSheet.create({
    titleText: {
        paddingHorizontal:0,
        marginBottom: 8,
        fontWeight: 'bold',
        marginLeft: 15,
        color: '#fff'
    },
    container: {
        marginBottom: 15,
    }
})