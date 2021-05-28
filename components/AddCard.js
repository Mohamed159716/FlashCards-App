import React, { Component } from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";

import { addCardToDeck } from "../actions/index";
import { submitCardToDeck } from "../utils/api";

class AddCard extends Component {
    state = {
        question: "",
        answer: "",
    };

    handleQuestion = (question) => {
        this.setState(() => ({ question }));
    };

    handleAnswer = (answer) => {
        this.setState(() => ({ answer }));
    };

    handleSubmit = () => {
        const { question, answer } = this.state;
        const {
            route: {
                params: { deckTitle },
            },
        } = this.props;

        const card = { question, answer };

        this.props.dispatch(addCardToDeck({ deckTitle, card }));

        submitCardToDeck({ deckTitle, card });

        this.setState(() => ({ value: "" }));

        this.toHome();
    };

    toHome = () => {
        this.props.navigation.dispatch(CommonActions.goBack());
    };

    render() {
        const { question, answer } = this.state;

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={question}
                    onChangeText={(question) => this.handleQuestion(question)}
                    placeholder="The Question"
                />
                <TextInput
                    style={styles.input}
                    value={answer}
                    onChangeText={(answer) => this.handleAnswer(answer)}
                    placeholder="The Answer"
                />
                <TouchableOpacity
                    disabled={question && answer ? false : true}
                    title="Create Deck"
                    onPress={this.handleSubmit}
                    style={[
                        styles.button,
                        { opacity: question && answer ? 1 : 0.5 },
                    ]}
                >
                    <Text style={{ color: "#fff", fontSize: 15 }}>
                        Create Deck
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    input: {
        height: 40,
        width: "80%",
        margin: 12,
        paddingLeft: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#2980b9",
        width: "60%",
        padding: 15,
        alignItems: "center",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
});

export default connect()(AddCard);
