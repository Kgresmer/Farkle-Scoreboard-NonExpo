import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {CardSection, Card, Button} from './common';
import {Confirm} from "./common/Confirm";


class ExistingPlayerListItem extends Component {
    state = { showModal: false};

    deletePlayer() {
        this.setState({ showModal: true })
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
        this.setState({ showModal: false });
    }

    onDecline() {
        this.setState({ showModal: false })
    }

    render() {
        const {player} = this.props;
        return (
            <Card dynamicStyles={styles.card}>
                <View style={styles.playerItemContainer}>
                    <View>
                        <CardSection style={{backgroundColor: '#05a8aa', flexWrap: 'wrap'}}>
                            <Text style={styles.nameStyles}>
                                {player.name}
                            </Text>
                        </CardSection>
                    </View>
                    <View>
                        <CardSection style={{backgroundColor: '#05a8aa', padding: 3}}>
                            <Text style={styles.textStyles}>
                                Wins: {player.wins} Losses: {player.losses} {"\n"}
                                Best Score: {player.bestScore} {"\n"}
                                Worst Score: {player.worstScore}
                            </Text>
                        </CardSection>
                    </View>
                    <View>
                        {this.checkIfPlayerIsOnRoster()}
                        <Button
                            buttonStyleDyn={styles.removeButtonStyle}
                            onPress={this.deletePlayer.bind(this)}>
                            Delete
                        </Button>
                    </View>
                </View>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete '{player.name}'?
                    {player.name} will be removed from the existing player list and all of their stats will be deleted.
                </Confirm>
            </Card>
        )
    }
}

const styles = {
    card: {
        backgroundColor: '#05a8aa',
        width: (Dimensions.get('window').width)
    },
    playerItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textStyles: {
        alignSelf: 'stretch',
        fontSize: 16,
        color: 'white',
    },
    nameStyles: {
        alignSelf: 'stretch',
        fontSize: 21,
        color: 'white',
    },
    removeButtonStyle: {
        alignSelf: 'flex-start',
        backgroundColor: '#C70039',
        width: 90,
        marginTop: 5
    },
    addButtonStyle: {
        alignSelf: 'flex-start',
        backgroundColor: '#89ae6d',
        width: 90,
        marginTop: 5
    },
    dropButtonStyle: {
        alignSelf: 'flex-start',
        backgroundColor: '#ea651d',
        width: 90,
        marginTop: 5
    },
};

export default ExistingPlayerListItem;