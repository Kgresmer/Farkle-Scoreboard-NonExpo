import React, {Component} from 'react';
import {Text, View, Modal, StyleSheet, Dimensions} from 'react-native';
import {CardSection} from '../common/CardSection';
import {Button} from '../common/Button';
import {Card} from "../common/Card";
import {Input} from "../common/Input";
import {connect} from "react-redux";
import {newPlayerNameChange} from "../../actions";

class AddNewPlayer extends Component {

    state = {errorMessage: ''};

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playerName === '' && this.props.playerName.length > 0) {
            this.setState({errorMessage: 'You cannot have a player with an empty name'});
        } else if (nextProps.playerName.length === 15) {
            this.setState({errorMessage: 'You have reached the character limit'});
        } else {
            this.setState({errorMessage: ''})
        }
    }

    addNewPlayer() {
        this.props.addPlayer(this.props.playerName);
        this.props.closeModal();
        this.setState({errorMessage: ''});
    }

    onInputChange(value) {
        this.props.newPlayerNameChange(value);
    }

    cancelAddNewPlayer() {
        this.props.closeModal();
    };

    checkForInvalidName() {
        if (this.props.playerName === '') {
            return (
                <Button
                    disabled={true}
                    buttonStyleDyn={{backgroundColor: 'rgba(232,209,161,0.40)'}}
                    onPress={this.addNewPlayer.bind(this)}>
                    Add</Button>
            )
        } else {
            return (
                <Button
                    buttonStyleDyn={{backgroundColor: '#05a8aa'}}
                    onPress={this.addNewPlayer.bind(this)}>
                    Add</Button>
            )
        }
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                transparent
                animationType="slide"
                onRequestClose={() => {
                }}
            >
                <View style={styles.containerStyles}>
                    <Card dynamicStyles={styles.newPlayerCard}>
                        <CardSection>
                            <Text style={styles.textStyles}>Enter Player Name</Text>
                        </CardSection>
                        <Card dynamicStyles={styles.inputCard}>
                            <CardSection>
                                <Input
                                    label=""
                                    maxLength={15}
                                    keyboardType="default"
                                    placeholder="Name"
                                    onChangeText={(value) => this.onInputChange(value)}
                                />
                            </CardSection>
                        </Card>
                        <View>
                            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                        </View>
                        <CardSection>
                            <Button
                                buttonStyleDyn={{backgroundColor: '#ea651d'}}
                                onPress={this.cancelAddNewPlayer.bind(this)}>
                                Cancel</Button>
                            {this.checkForInvalidName()}
                        </CardSection>
                    </Card>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    newPlayerCard: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 50,
        marginLeft: 50
    },
    inputCard: {
        marginBottom: 10,
        padding: 8,
        borderWidth: 0,
        width: Dimensions.get('window').width * 0.7
    },
    textStyles: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 10,
        marginTop: 10,
        color: 'white'
    },
    containerStyles: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessage: {
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10
    }
});

const mapStateToProps = (state) => {
    return {
        roster: state.player.roster,
        playerList: state.player.playerList,
        playerName: state.player.playerName
    };
};

export default connect(mapStateToProps, {newPlayerNameChange})(AddNewPlayer);