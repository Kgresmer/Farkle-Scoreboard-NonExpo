import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {CardSection} from '../components/common/index';


class WelcomeScreen extends Component {
    static navigationOptions = {
        title: ''
    };

    componentDidMount() {
        const {navigate} = this.props.navigation;
        setTimeout(() => {
            navigate('AddPlayers');
        }, 500);
    }

    render() {
        return (
            <View>
                <CardSection>
                    <Text style={styles.titleStyles}>
                        Welcome to Farkle Score
                    </Text>
                </CardSection>
            </View>
        )
    }
}

const styles = {
    titleStyles: {
        fontSize: 18,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
        paddingBottom: 30,
        marginTop: 60,
        color: 'white'
    }
};

export default WelcomeScreen;