import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";

import { submitDeck } from "./../utils/api";
import { addDeck } from "./../actions/index";

class AddDeck extends Component {
    state = {
        value: "",
    };

    handleTextChange = (value) => {
        this.setState(() => ({
            value,
        }));
    };

    handleSubmit = () => {
        const deckTitle = this.state.value;
        const deck = { title: deckTitle, questions: [] };

        this.props.dispatch(addDeck(deckTitle));

        submitDeck({ key: deckTitle, deck });

        this.setState(() => ({ value: "" }));

        this.toHome();
    };

    toHome = () => {
        this.props.navigation.dispatch(CommonActions.goBack());
    };

    render() {
        const { value } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    What is the title of your new deck?
                </Text>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => this.handleTextChange(value)}
                />
                <TouchableOpacity
                    title="Create Deck"
                    onPress={this.handleSubmit}
                    style={styles.button}
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
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 20,
    },
    input: {
        height: 40,
        width: "100%",
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
        marginBottom: 30,
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

export default connect()(AddDeck);
