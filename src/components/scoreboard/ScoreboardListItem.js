import React, {Component} from "react";
import {Image, Text, View} from "react-native";


class ScoreboardListItem extends Component {

    removePlayerFromRoster() {
        this.props.dropPlayer(this.props.player.id);
    }

    showFarkels() {
        if (this.props.player.farkles === 2) {
            return (
                <View style={styles.farkelsContainer}>
                    <Image
                        style={styles.farkelMarkerStyles}
                        source={require('./farkle-icon.png')}
                    />
                    <Image
                        style={styles.farkelMarkerStyles}
                        source={require('./farkle-icon.png')}
                    />
                </View>
            )
        } else if (this.props.player.farkles === 1) {
            return (
                <View style={styles.farkelsContainer}>
                    <Image
                        style={styles.farkelMarkerStyles}
                        source={require('./farkle-icon.png')}
                    />
                </View>
            )
        }
    }

    render() {
        const {player} = this.props;

        function setContainerStyles() {
            console.log(player.isActive)
            if (player.isActive) {
                return {
                    ...styles.itemContainer,
                    backgroundColor: '#05a8aa',
                    borderWidth: 7,
                    borderColor: '#ea651d',
                };
            } else {
                return {
                    ...styles.itemContainer,
                    backgroundColor: '#6cdeff'
                };
            }
        }

        return (
            <View style={setContainerStyles()}>
                <Text style={styles.nameStyles}>
                    {player.name}: <Text style={styles.scoreStyles}>{player.score}</Text>
                </Text>
                {this.showFarkels()}
            </View>
        )
    }
}

const styles = {
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
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
    farkelsContainer: {
        flexDirection: 'row',
        paddingRight: 10
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
    farkelMarkerStyles: {
        width: 35,
        height: 35,
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