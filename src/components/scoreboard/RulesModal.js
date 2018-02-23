
import React from 'react';
import {Text, View, Modal, StyleSheet} from 'react-native';
import {Card, CardSection, Button} from "../common";


const RulesModal = ({visible, onAccept}) => {
    const {cardStyles, textStyles, containerStyles} = styles;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
        >
            <View style={containerStyles}>
                <Card dynamicStyles={cardStyles}>
                    <CardSection>
                        <Text style={textStyles}>
                            To win at Farkle you must be the player with the highest score above 10,000 points on the final round of play.
                            {'\n'}
                            Each player takes turns rolling the dice. On your turn, you roll all six dice. A 1 or a 5, three of a kind, three pairs, or a six-dice straight earn points. You must select at least one scoring die. You can then pass and bank your points, or risk the points earned this turn and roll the remaining dice.
                            {'\n'}
                            Scoring is based on selected dice in each roll. You cannot earn points by combining dice from different rolls.
                            {'\n'}
                            If none of your dice rolled earn points, you get a Farkle. Three Farkles in a row and you lose 1,000 points.
                            {'\n'}
                            You continue rolling until you either Pass or Farkle. Then the next player rolls the six dice. Play continues until it is your turn again.
                            {'\n'}
                            Example: Your first rolls shows 1, 2, 3, 3, 5, and 6. You keep the 1 and the 5 for 150 points. You then opt to roll the remaining four dice. On that roll you get 3, 4, 4, and 5. You select the 5 and decide to Pass and bank your points.
                            {'\n'}
                            The final round starts as soon as any player reaches 10,000 or more points.
                            {'\n'}
                            Scoring
                            {'\n'}
                            1 - 100{'\n'}
                            5 - 50{'\n'}
                            Three 1's - 1000{'\n'}
                            Three 2's - 200{'\n'}
                            Three 3's - 300{'\n'}
                            Three 4's - 400{'\n'}
                            Three 5's - 500{'\n'}
                            Three 6's - 600{'\n'}
                            1-2-3-4-5-6 - 3000{'\n'}
                            3 pairs - 1500{'\n'}
                            4 of a Kind - 1000{'\n'}
                            5 of a Kind - 2000{'\n'}
                            6 of a Kind - 3000{'\n'}
                            2 Triplets - 2500{'\n'}
                            4 of a Kind + Pair - 1500{'\n'}
                            {'\n'}
                            Scoring is based on selected dice each roll. You cannot earn points by combining dice from different rolls. For example, if you roll a 5 (50 points), and then roll two 5s (100 points), you can't combine them to form three of a kind (500 points).
                            {'\n'}
                            The 1 and 5 spot dice are special, as they are the only dice that can be scored outside of a combination (such as three of a kind).

                        </Text>
                    </CardSection>
                    <CardSection>
                        <Button
                            buttonStyleDyn={{backgroundColor: '#ea651d', width: 80}}
                            onPress={onAccept}>OK</Button>
                    </CardSection>
                </Card>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    cardStyles: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5,
        overflow: 'hidden'
    },
    textStyles: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
        marginBottom: 15,
        color: 'white'
    },
    containerStyles: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
});

export {RulesModal};