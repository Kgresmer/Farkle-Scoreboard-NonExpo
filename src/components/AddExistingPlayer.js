import React, {Component} from 'react';
import {Text, View, Modal, StyleSheet, FlatList} from 'react-native';
import {CardSection, Button, Card} from './common';
import { connect } from 'react-redux';
import { addExistingPlayerToRoster, playerDeleted, removePlayerFromRoster } from '../actions';
import ExistingPlayerListItem from "./ExistingPlayerListItem";


class AddExistingPlayer extends Component {
    static navigationOptions = {
        title: 'Existing Players',
        headerStyle: {
            backgroundColor: '#0b7a75'
        },
        headerTitleStyle: {
            color: 'white'
        }
    };

    componentWillMount() {
        this.createDataSource(this.props.playerList);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.playerList);
    }

    createDataSource(players) {
        this.dataSource = players;
    }

    onFinishAdding() {
        this.props.navigation.navigate('AddPlayers');
    }

    checkIfPlayerIsOnRoster(playerId) {
        return this.props.roster.some(player => player.id === playerId);
    }

    renderRow({player}) {

        return <ExistingPlayerListItem
            playerAdded={this.props.addExistingPlayerToRoster.bind(this)}
            playerOnRoster={this.checkIfPlayerIsOnRoster(player.id)}
            dropPlayer={this.props.removePlayerFromRoster.bind(this)}
            deletePlayer={this.props.playerDeleted.bind(this)}
            player={player}/>;
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{flex: 1}}>
                    <FlatList
                        data={this.dataSource}
                        renderItem={this.renderRow.bind(this)}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Button
                            textStyleDyn={styles.readyButtonTextStyle}
                            buttonStyleDyn={styles.readyButtonStyle}
                            onPress={this.onFinishAdding.bind(this)}>
                            Done!
                        </Button>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
    existingButtonStyle: {},
    newButtonStyle: {},
    readyButtonTextStyle: {
        fontSize: 30,
        paddingTop: 4,
        paddingBottom: 4,
    },
    readyButtonStyle: {}
});

const mapStateToProps = (state) => {
    console.log('map state in existing');
    console.log(state);
    return {roster: state.player.roster, playerList: state.player.playerList};
};

export default connect(
    mapStateToProps,
    {addExistingPlayerToRoster,
        playerDeleted,
        removePlayerFromRoster
    })(AddExistingPlayer);