import React, {Component} from "react";
import {Text, ToastAndroid, View} from "react-native";
import {Button, Confirm} from "../common";


class ExistingPlayerListItem extends Component {
    state = {showModal: false};

    deletePlayer() {
        this.setState({showModal: true})
    }

    playerAdded() {
        this.props.playerAdded(this.props.player);

    }

    dropPlayer() {
        this.props.dropPlayer(this.props.player.id);
    }

    checkIfPlayerIsOnRoster() {
        if (this.props.playerOnRoster) {
            return (<Button
                buttonStyleDyn={styles.dropButtonStyle}
                onPress={this.dropPlayer.bind(this)}>
                Drop
            </Button>);
        } else {
            return (<Button
                buttonStyleDyn={styles.addButtonStyle}
                onPress={this.playerAdded.bind(this)}>
                Add
            </Button>);
        }
    }

    onAccept() {
        this.props.deletePlayer(this.props.player.id);
        this.setState({showModal: false});
        ToastAndroid.show('They are gone!', ToastAndroid.SHORT);
    }

    onDecline() {
        this.setState({showModal: false})
    }

    render() {
        const {player} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.nameStyles}>
                    {player.name}{"\n"}
                    <Text style={styles.textStyles}>
                        Wins: {player.wins} Losses: {player.losses}{"\n"}
                        Best Score: {player.bestScore} Worst Score: {player.worstScore}
                    </Text>
                </Text>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Button
                        buttonStyleDyn={styles.removeButtonStyle}
                        onPress={this.deletePlayer.bind(this)}>
                        x
                    </Button>
                    {this.checkIfPlayerIsOnRoster()}
                </View>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete '{player.name}'? {'\n'}
                    <Text style={{fontSize: 14}}>They will be removed from the existing player list and all of their stats will be deleted.</Text>
                </Confirm>
            </View>
        )
    }
}

const styles = {
    container: {
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
    textStyles: {
        alignSelf: 'center',
        fontSize: 16,
        lineHeight: 20,
        color: 'white',
    },
    nameStyles: {
        alignSelf: 'center',
        fontSize: 21,
        lineHeight: 30,
        color: 'white',
    },
    removeButtonStyle: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(255,55,55,0.9)',
        width: 50,
        marginTop: 1
    },
    addButtonStyle: {
        alignSelf: 'center',
        backgroundColor: '#89ae6d',
        width: 95,
        marginTop: 1
    },
    dropButtonStyle: {
        alignSelf: 'center',
        backgroundColor: '#ea651d',
        width: 95,
        marginTop: 1
    },
};

export default ExistingPlayerListItem;