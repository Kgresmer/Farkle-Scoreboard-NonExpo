import React, {Component} from "react";
import {Text, View} from "react-native";
import {Icon} from 'react-native-elements';


class ScoreboardListItem extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.itemContainer}>
                    <Text style={styles.nameStyles}>
                        Scoreboard
                    </Text>
                    <View>
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
            </View>
        )
    }
}

const styles = {
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0b7a75',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    nameStyles: {
        alignSelf: 'flex-start',
        fontSize: 25,
        marginLeft: 8,
        lineHeight: 20,
        color: 'white',
    },
};

export default ScoreboardListItem;