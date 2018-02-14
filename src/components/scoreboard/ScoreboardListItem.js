import React, {Component} from "react";
import {Image, Text, View} from "react-native";
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
                    {player.name}: <Text style={styles.scoreStyles}>10400</Text>
                </Text>

                <View style={{flexDirection: 'row'}}>
                    <Text
                        style={{
                            width: 30,
                            height: 30,
                            backgroundColor: 'red',
                            borderWidth: 2,
                            marginRight: 4,
                            borderRadius: 15,
                        }}
                    />
                    <Text
                        style={{
                            width: 30,
                            height: 30,
                            backgroundColor: 'red',
                            borderWidth: 2,
                            marginRight: 10,
                            borderRadius: 15,
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
        backgroundColor: '#05a8aa',
        alignItems: 'center',
        marginTop: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 2,
        overflow: 'hidden',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    nameStyles: {
        fontSize: 24,
        lineHeight: 33,
        color: 'white',
        padding: 5
    },
    scoreStyles: {
        alignSelf: 'center',
        fontSize: 28,
        lineHeight: 33,
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