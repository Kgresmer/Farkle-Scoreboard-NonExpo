import React, {Component} from "react";
import {
    Text,
    View,
    Platform,
    Image,
    TouchableOpacity
} from "react-native";


class ScoreboardListItem extends Component {

    render() {
        return (
            <View style={styles.itemContainer}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={() => {}}
                    >
                        <Image
                            style={{height: 60, width: 60, marginLeft: 7}}
                            source={require('./exiticon.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.nameStyles}>
                    Scoreboard
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={() => {}}
                    >
                        <Image
                            style={{height: 60, width: 60, marginRight: 7}}
                            source={require('./rulesicon.png')}
                        />
                    </TouchableOpacity>
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