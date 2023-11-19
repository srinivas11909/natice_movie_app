import React from "react";
import { Dimensions, TouchableWithoutFeedback} from "react-native";
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { posterImgBig } from "../api/db";


const MovieCard = ({data}) => {
    const {width, height} = Dimensions.get('window');
    const navigation = useNavigation();
    return(
            <>
               <TouchableWithoutFeedback onPress={() => navigation.push('Movie', data)}>
                    <Card.Cover source={{ uri: posterImgBig(data.poster_path) }} style={{
                    width: width * 0.6,
                    height: height * 0.4,
                    marginRight: 10
                }}/>
                </TouchableWithoutFeedback>
             
            </>
    )
}

export default MovieCard
