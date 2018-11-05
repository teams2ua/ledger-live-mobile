// @flow

import React, { Component } from "react";
import { translate } from "react-i18next";
import { StyleSheet, SafeAreaView } from "react-native";
import type { NavigationScreenProp } from "react-navigation";

import LText from "../../components/LText";

type Props = {
  navigation: NavigationScreenProp<*>,
  t: *,
};

class OnboardingStep0801PasswordNew extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={styles.root}>
        <LText>OnboardingStep0801PasswordNew</LText>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default translate()(OnboardingStep0801PasswordNew);
