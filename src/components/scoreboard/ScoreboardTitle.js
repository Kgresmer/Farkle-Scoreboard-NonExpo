import React, {Component} from "react";
import {Text, View, Platform} from "react-native";
import {Icon} from 'react-native-elements';


class ScoreboardListItem extends Component {

    render() {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.nameStyles}>
                    Scoreboard
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <Icon
                        raised
                        name="plus-circle"
                        type="font-awesome"
                        color="#ea651d"
                        onPress={() => {
                        }}
                    />
                    <Icon
                        raised
                        name="book"
                        type="font-awesome"
                        color="#89ae6d"
                        onPress={() => {
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0b7a75',
        height: 80,
        marginTop: Platform.OS == "ios" ? 20 : 0,
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    nameStyles: {
        alignSelf: 'center',
        fontSize: 30,
        marginLeft: 10,
        lineHeight: 35,
        color: 'white',
    },
};

export default ScoreboardListItem;