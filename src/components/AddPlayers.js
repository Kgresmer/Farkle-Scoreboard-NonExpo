import React, {Component} from 'react';
import {Button} from "../components/common";
import {StyleSheet, View, ListView} from "react-native";
import PlayerListItem from "./PlayerListItem";
import AddNewPlayer from "./AddNewPlayer";
import { connect } from 'react-redux';
import {removePlayerToRoster, playerDeleted, playerCreated} from "../actions";
import AddExistingPlayer from "./AddExistingPlayer";

class AddPlayers extends Component {
    static navigationOptions = {
        title: 'Fill Your Roster',
        headerStyle: {
            backgroundColor: '#0b7a75'
        },
        headerTitleStyle: {
            color: 'white'
        }
    };

    state = {showNewPlayerModal: false, showExistingPlayerModal: false};

    addNewPlayer(name) {
        console.log('player created. adding player');
        this.props.playerCreated({name});
        this.closeAddNewPlayerModal();
    };

    onExistingPlayerPress() {
        console.log('navigate to add existing');
        console.log(this);
        this.props.navigation.navigate('AddExistingPlayers');
    }

    onNewPlayerPress() {
        this.setState({showNewPlayerModal: true});
    }

    onReadyButtonPress() {

    }

    closeAddNewPlayerModal() {
        this.setState({showNewPlayerModal: false});
    }

    closeAddExistingPlayerModal() {
        this.props.navigation.navigate('AddExistingPlayer');
    }

    componentWillMount() {
        console.log(this.props);
        this.createDataSource(this.props.roster);
    }

    // TODO may not be needed
    componentWillReceiveProps(nextProps) {
        console.log('will receive add players');
        console.log(this.props);
        this.createDataSource(nextProps.roster);
    }

    createDataSource(players) {
        console.log('create datasource');
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        console.log('about to clone');
        this.dataSource = ds.cloneWithRows(players);
    }

    renderRow(player) {
        console.log('render row');
        return <PlayerListItem player={player}/>;
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{flex: 1}}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        <Button
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
    readyButtonStyle: {}
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
    removePlayerToRoster,
    playerDeleted,
    playerCreated
})(AddPlayers);