import React, {Component} from "react";
import {Text, View} from "react-native";
import {Button} from "./common";
import {Icon} from 'react-native-elements';


class ScoreboardListItem extends Component {

    removePlayerFromRoster() {
        this.props.dropPlayer(this.props.player.id);
    }

    render() {
        const {player} = this.props;
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.nameStyles}>
                    {player.name}
                </Text>
                <Text style={styles.scoreStyles}>
                    10400
                </Text>
                <Icon
                    raised
                    name="fa-times-circle"
                    type="font-awesome"
                    color="#C70039"
                />
                <Icon
                    size="20"
                    raised
                    name="fa-times-circle"
                    type="font-awesome"
                    color="#C70039"
                />
            </View>
        )
    }
}

const styles = {
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#05a8aa',
        alignItems: 'center',
        marginTop: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 2,
        overflow: 'hidden',
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    nameStyles: {
        alignSelf: 'center',
        fontSize: 15,
        lineHeight: 20,
        color: 'white',
        paddingBottom: 7
    },
    scoreStyles: {
        alignSelf: 'center',
        fontSize: 19,
        lineHeight: 24,
        color: 'white',
        paddingBottom: 7
    },
    removeButtonStyle: {
        alignSelf: 'center',
        backgroundColor: '#ea651d'
    },
    removeButtonTextStyle: {},
    addButtonStyle: {
        alignSelf: 'center',
        backgroundColor: '#89ae6d'
    },
    addButtonTextStyle: {}
};

export default ScoreboardListItem;