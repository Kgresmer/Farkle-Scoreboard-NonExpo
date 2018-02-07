import React, {Component} from 'react';
import {Button} from "../components/common";
import {StyleSheet, View, FlatList, Text} from "react-native";
import PlayerListItem from "./PlayerListItem";
import AddNewPlayer from "./AddNewPlayer";
import { connect } from 'react-redux';
import {removePlayerFromRoster, playerCreated} from "../actions";

class AddPlayers extends Component {
    static navigationOptions = {
        title: 'Fill Your Roster',
        titleStyle: {
            textAlign: 'center'
        },
        headerStyle: {
            backgroundColor: '#0b7a75'
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerLeft: null
    };

    state = {showNewPlayerModal: false};

    addNewPlayer(name) {
        this.props.playerCreated(name);
        this.closeAddNewPlayerModal();
    };

    dropPlayer(id) {
        this.props.removePlayerFromRoster(id);
    };

    onExistingPlayerPress() {
        this.props.navigation.navigate('AddExistingPlayers');
    }

    onNewPlayerPress() {
        this.setState({showNewPlayerModal: true});
    }

    onReadyButtonPress() {
        this.props.navigation.navigate('SetPlayerOrder');
    }

    closeAddNewPlayerModal() {
        this.setState({showNewPlayerModal: false});
    }

    componentWillMount() {
        this.createDataSource(this.props.roster);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.roster);
    }

    createDataSource(players) {
        this.dataSource = players;
    }

    renderRow({player}) {
        return <PlayerListItem dropPlayer={this.dropPlayer.bind(this)} player={player}/>;
    }

    checkForEmptyRoster() {
        if (this.props.roster.length > 0) {
            return (<FlatList
                data={this.dataSource}
                renderItem={this.renderRow.bind(this)}
            />);
        } else {
            return (<Text style={styles.emptyRosterText}>
                Your Roster is Empty. Click below to add players.
            </Text>);
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{flex: 1}}>
                    {this.checkForEmptyRoster()}
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        <Button
                            disabled={this.props.playerList.length > 0}
                            buttonStyleDyn={styles.existingButtonStyle}
                            onPress={this.onExistingPlayerPress.bind(this)}>
                            Add Existing Player
                        </Button>
                    </View>
                    <View style={{flex: 2}}>
                        <Button
                            buttonStyleDyn={styles.newButtonStyle}
                            onPress={this.onNewPlayerPress.bind(this)}>
                            Add New Player
                        </Button>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Button
                            textStyleDyn={styles.readyButtonTextStyle}
                            buttonStyleDyn={styles.readyButtonStyle}
                            onPress={this.onReadyButtonPress.bind(this)}>
                            Ready!
                        </Button>
                    </View>
                </View>
                <AddNewPlayer
                    visible={this.state.showNewPlayerModal}
                    closeModal={this.closeAddNewPlayerModal.bind(this)}
                    addPlayer={this.addNewPlayer.bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
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
    readyButtonStyle: {},
    emptyRosterText: {
        fontSize: 50,
        color: 'rgba(11,172,167,0.40)'
    }
});


const mapStateToProps = (state) => {
    console.log('map state to props')
    console.log(state);
    return {
        roster: state.player.roster,
        playerList: state.player.playerList
    };
};

export default connect(mapStateToProps, {
    removePlayerFromRoster,
    playerCreated
})(AddPlayers);