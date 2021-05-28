import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

import QuizResult from "./QuizResult";

class Quiz extends Component {
    state = {
        currentQuestion: 0,
        correctAnswers: 0,
        inCorrectAnswers: 0,
        showAnswer: "false",
    };

    handleAnswer = (answer) => {
        if (answer === "correct") {
            this.setState(
                () => ({
                    correctAnswers: this.state.correctAnswers + 1,
                    currentQuestion: this.state.currentQuestion + 1,
                    showAnswer: false,
                }),
                () => {
                    if (
                        this.state.currentQuestion ===
                        this.props.questions.length
                    ) {
                        const result = this.handleResult(
                            this.state.correctAnswers
                        );
                        this.resetState();
                        this.props.navigation.navigate("QuizResult", {
                            ...result,
                        });
                    }
                }
            );
        } else {
            this.setState(
                () => ({
                    inCorrectAnswers: this.state.inCorrectAnswers + 1,
                    currentQuestion: this.state.currentQuestion + 1,
                    showAnswer: false,
                }),
                () => {
                    if (
                        this.state.currentQuestion ===
                        this.props.questions.length
                    ) {
                        const result = this.handleResult(
                            this.state.correctAnswers
                        );
                        this.resetState();
                        this.props.navigation.navigate("QuizResult", {
                            ...result,
                        });
                    }
                }
            );
        }
    };

    resetState = () => {
        this.setState(() => ({
            currentQuestion: 0,
            correctAnswers: 0,
            inCorrectAnswers: 0,
            showAnswer: false,
        }));
    };

    handleResult = (correctAnswers) => {
        const totalQuestions = this.props.questions.length;
        const percentage = Math.round((100 / totalQuestions) * correctAnswers);
        const title = this.props.deckTitle;

        return {
            percentage,
            correctAnswers,
            totalQuestions,
            title,
        };
    };

    toggleQuestion = () => {
        this.setState(() => ({ showAnswer: !this.state.showAnswer }));
    };

    render() {
        const { questions } = this.props;
        const { currentQuestion, showAnswer } = this.state;
        const totalQuestions = questions.length;

        if (totalQuestions === 0) {
            return (
                <View
                    style={[
                        styles.container,
                        { justifyContent: "center", marginBottom: 120 },
                    ]}
                >
                    <Text style={{ fontSize: 20, color: "#D11A2A" }}>
                        There are no cards in the deck
                    </Text>
                </View>
            );
        }

        if (currentQuestion === totalQuestions) {
            return <QuizResult />;
        }

        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.title}>
                        <Text style={styles.innerTitle}>
                            {currentQuestion + 1}
                        </Text>
                        /{totalQuestions} {showAnswer ? "Answer" : "Question"}
                    </Text>
                    <Text style={styles.question}>
                        {showAnswer
                            ? questions[currentQuestion].answer
                            : questions[currentQuestion].question}
                    </Text>
                </View>
                <View style={styles.btnsBox}>
                    <TouchableOpacity
                        onPress={() => this.handleAnswer("incorrect")}
                    >
                        <Ionicons
                            name="close-outline"
                            size={50}
                            color="#D11A2A"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.handleAnswer("correct")}
                    >
                        <Ionicons
                            name="checkmark-outline"
                            size={50}
                            color="#155724"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.toggleBtn}
                    onPress={this.toggleQuestion}
                >
                    <Text style={{ fontSize: 15, color: "#34495e" }}>
                        {showAnswer ? "Show Question" : "Show Answer"}
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
        marginTop: 100,
    },
    box: {
        width: "100%",
        backgroundColor: "#ccc",
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        marginBottom: 80,
    },
    title: {
        borderBottomWidth: 1,
        borderBottomColor: "#999",
        marginBottom: 10,
        fontSize: 20,
        color: "#888",
        paddingBottom: 3,
    },
    innerTitle: {
        color: "#2980b9",
    },
    question: {
        fontSize: 25,
        color: "#2980b9",
    },
    btnsBox: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
    },
    toggleBtn: {
        marginTop: 10,
    },
});

function mapStateToProps(decks, { route }) {
    const { deckTitle } = route.params;
    const questions = decks[deckTitle].questions;

    return {
        questions,
        deckTitle,
    };
}

export default connect(mapStateToProps)(Quiz);
