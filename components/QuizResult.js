import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Loading from "./Loading";

const QuizResult = ({ navigation, route }) => {
    if (!(navigation && route)) {
        console.log("faslse");
        return <Loading />;
    } else {
        console.log("success");
        const { percentage, correctAnswers, totalQuestions, title } =
            route.params;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Result</Text>
                <Text style={styles.percentage}>{percentage}%</Text>
                <Text style={styles.result}>
                    <Text style={styles.txtColor}>{correctAnswers}</Text> answer
                    out of{" "}
                    <Text style={{ fontWeight: "bold", color: "black" }}>
                        {totalQuestions}
                    </Text>
                </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: "#34495e" }]}
                        onPress={() =>
                            navigation.navigate("Deck", { deckTitle: title })
                        }
                    >
                        <Text style={{ color: "#fff" }}>Back to Deck</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: "none" }]}
                        onPress={() =>
                            navigation.navigate("Quiz", { deckTitle: title })
                        }
                    >
                        <Text>Reset Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 100,
    },
    title: {
        marginBottom: 10,
        fontSize: 20,
        paddingBottom: 8,
        color: "#999",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    percentage: {
        color: "#2980b9",
        fontSize: 45,
    },
    result: {
        fontSize: 24,
        color: "#444",
    },
    txtColor: {
        color: "#2980b9",
        fontWeight: "bold",
    },
    btnContainer: {
        marginTop: 30,
    },
    btn: {
        width: "45%",
        marginBottom: 20,
        borderRadius: 5,
        padding: 15,
        alignItems: "center",
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

export default QuizResult;
