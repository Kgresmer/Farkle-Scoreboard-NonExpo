import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {CardSection, Card, Button} from './common';


class ExistingPlayerListItem extends Component {

    deletePlayer() {
        this.props.deletePlayer(this.props.player.id);
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

    render() {
        const {player} = this.props;
        return (
            <Card dynamicStyles={styles.card}>
                <View style={styles.playerItemContainer}>
                    <View>
                        <CardSection style={{backgroundColor: '#05a8aa'}}>
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
        backgroundColor: '#C70039'
    },
    addButtonStyle: {
        alignSelf: 'flex-start',
        backgroundColor: '#89ae6d'
    },
    dropButtonStyle: {
        alignSelf: 'flex-start',
        backgroundColor: '#ea651d'
    },
};

export default ExistingPlayerListItem;