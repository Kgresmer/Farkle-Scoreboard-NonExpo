import React, {Component} from "react";
import {Text, View} from "react-native";
import {Button} from "../common";


class PlayerListItem extends Component {

    removePlayerFromRoster() {
        this.props.dropPlayer(this.props.player.id);
    }

    render() {
        const {player} = this.props;
        return (
            <View style={styles.playerItemContainer}>
                <Text style={styles.nameStyles}>
                    {player.name}{"\n"}
                    <Text style={styles.textStyles}>
                        Wins: {player.wins} Losses: {player.losses}{"\n"}
                        Best Score: {player.bestScore} Worst Score: {player.worstScore}
                    </Text>
                </Text>
                <Button
                    buttonStyleDyn={styles.removeButtonStyle}
                    textStyleDyn={styles.removeButtonTextStyle}
                    onPress={this.removePlayerFromRoster.bind(this)}>
                    X
                </Button>
            </View>
        )
    }
}

const styles = {
    playerItemContainer: {
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
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    textStyles: {
        alignSelf: 'center',
        fontSize: 16,
        lineHeight: 20,
        color: 'white'
    },
    nameStyles: {
        alignSelf: 'center',
        fontSize: 21,
        lineHeight: 30,
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

export default PlayerListItem;