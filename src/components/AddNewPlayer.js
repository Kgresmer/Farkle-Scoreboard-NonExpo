import React, {Component} from 'react';
import {Text, View, Modal, StyleSheet, Dimensions} from 'react-native';
import {CardSection} from './common/CardSection';
import {Button} from './common/Button';
import {Card} from "./common/Card";
import {Input} from "./common/Input";

class AddNewPlayer extends Component {

    state = {name: ''};

    componentWillMount() {
        console.log(' add new player mounted')
        console.log(this.props)
    }

    addNewPlayer() {
        this.props.addPlayer(this.state.name);
        this.props.closeModal();
    }

    cancelAddNewPlayer() {
        this.props.closeModal();
    };

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
                                    keyboardType="default"
                                    placeholder="Name"
                                    onChangeText={value => this.setState({name: value})}
                                />
                            </CardSection>
                        </Card>
                        <CardSection>
                            <Button
                                buttonStyleDyn={{backgroundColor: '#ea651d'}}
                                onPress={this.cancelAddNewPlayer.bind(this)}>
                                Cancel</Button>
                            <Button
                                buttonStyleDyn={{backgroundColor: '#05a8aa'}}
                                onPress={this.addNewPlayer.bind(this)}>
                                Add</Button>
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
        width: Dimensions.get('window').width * 0.7
    },
    textStyles: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
        marginBottom: 35,
        color: 'white'
    },
    containerStyles: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AddNewPlayer;