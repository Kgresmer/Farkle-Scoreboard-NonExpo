import React, {Component} from 'react';
import {Button, Card, CardSection} from "../components/common/index";
import {connect} from 'react-redux';

class SetPlayerOrder extends Component {
    static navigationOptions = {
        title: 'Set Player Order',
        headerStyle: {
            backgroundColor: '#0b7a75'
        },
        headerTitleStyle:  {
            color: 'white'
        }
    };


    render() {
        return (
            <Card>
                <CardSection>
                    Player Name
                </CardSection>
            </Card>
        )
    }
}


const mapStateToProps = (state) => {
    return {};
};

export default SetPlayerOrder;