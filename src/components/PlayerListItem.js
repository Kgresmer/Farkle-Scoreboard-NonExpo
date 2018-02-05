import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, View, CheckBox, Dimensions} from 'react-native';
import {CardSection, Card, Button} from './common';


class PlayerListItem extends Component {
    onRowPress() {

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
                        <Button
                            buttonStyleDyn={styles.addButtonStyle}
                            textStyleDyn={styles.addButtonTextStyle}
                            onPress={() => {
                            }}>
                            +
                        </Button>
                        <Button
                            buttonStyleDyn={styles.removeButtonStyle}
                            textStyleDyn={styles.removeButtonTextStyle}
                            onPress={() => {
                            }}>
                            X
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
        backgroundColor: '#ea651d'
    },
    removeButtonTextStyle: {},
    addButtonStyle: {
        alignSelf: 'flex-start',
        backgroundColor: '#89ae6d'
    },
    addButtonTextStyle: {}
};

export default PlayerListItem;