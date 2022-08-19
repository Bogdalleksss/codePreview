import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { MainColor } from "utils/constants/color";
import { Font } from "utils/constants/sizes";
import { h, w } from "utils/response";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CButton from "components/UI/Buttons/CButton";
import CBackButton from "components/UI/Buttons/CBackButton";
import DismissKeyboard from "components/DismissKeyboard";

type Layout = {
  children: ReactNode;
  prepend?: ReactNode;
  backButton?: boolean;
  title?: string;
  description?: string;
  fetching?: boolean;
  disabled?: boolean;
  nextButtonOptions: {
    text: string;
    action: () => void;
  };
}

const SignUpLayout: React.FC<Layout> = (props: Layout): JSX.Element => {
  const {
    children,
    backButton,
    title,
    description,
    nextButtonOptions,
    fetching,
    disabled,
    prepend,
  } = props;
  const insets = useSafeAreaInsets();

  return (
    <DismissKeyboard>
      <View style={[styles.container, {paddingBottom: insets.bottom}]}>
        { backButton &&
        <View style={[styles.head]}>
          <CBackButton style={styles.back} />
        </View>
        }
        <View style={styles.main} pointerEvents="box-none">
          { prepend }
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          { children }
        </View>
        <CButton
          handlePress={() => nextButtonOptions.action()}
          loading={fetching}
          disabled={disabled}
          style={[{ marginBottom: insets.bottom <= 0 && 20 }]}
          text={nextButtonOptions.text}/>
      </View>
    </DismissKeyboard>
  );
};

export default SignUpLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: MainColor.light.background,
    alignItems: 'center',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: MainColor.light.background,
  },
  main: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    position: 'absolute',
    alignSelf: 'stretch',
  },
  back: {
    position: 'absolute',
    top: 20,
  },
  title: {
    fontSize: w(20),
    lineHeight: w(20),
    fontFamily: 'Lato_700Bold',
    marginBottom: h(10),
  },
  description: {
    fontSize: Font.medium,
    lineHeight: w(18),
    width: '78%',
    textAlign: 'center',
    fontFamily: 'Lato_500Medium',
    marginBottom: h(20),
  },
  tabs: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginTop: 15,
  },
  tab: {
    height: w(4),
    flex: 1,
    backgroundColor: MainColor.light.accent
  },
});
