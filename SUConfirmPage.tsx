import React, { useEffect, useState } from 'react';
import SignUpLayout from "layouts/SignUpLayout";
import CTextField from "components/UI/Fields/СTextField";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { h } from "utils/response";
import { useNavigation } from "@react-navigation/native";
import { TextColors } from "utils/constants/color";
import { Font } from "utils/constants/sizes";
import { authApi } from "store/api/auth";
import { SignUpScreenProps } from "../types";
import { useToast } from "react-native-toast-notifications";
import { setSignUpData } from "store/slices/SignUpSlice";

const SUConfirmPage = () => {
  const navigation = useNavigation<SignUpScreenProps>();
  const toast = useToast();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const { email, verify_id }: any = useAppSelector(state => state.signUpReducer.data);

  const [confirmEmail, confirmEmailData] = authApi.useConfirmEmailMutation()
  const [sendCode, sendCodeData] = authApi.useSendCodeMutation();
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
      const interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    return () => clearInterval(interval);
  });

  const dispatch = useAppDispatch();

  const resendCode = async () => {
    const responseSendCode: any = await sendCode(email);

    if (responseSendCode.data.data.verify_id) {
      dispatch(setSignUpData({ key: 'verify_id', value: responseSendCode.data.data.verify_id, }));
    }
    setSeconds(30);
  }

  const enterCode = (value: string) => {
    setError('');
    setCode(value)
  }

  const handlePress = async () => {

    try {
      const res: any = await confirmEmail({
        verify_id: verify_id,
        verify_code: +code,
      });

      if (res.error) {
        toast.show(res.error.data.message, {
          type: "danger",
          placement: "top",
        });
      } else {
        if (res.data.data.confirmed) {
          dispatch(setSignUpData({
            key: 'confirmed',
            value: true,
          }))

          navigation.navigate('SignUpPassword')
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpLayout
      backButton={true}
      title="Введите код подтверждения"
      fetching={confirmEmailData.isLoading}
      description={ `Введите код отправленный на ${email}` }
      disabled={!code.length}
      nextButtonOptions={{
        text: "Подтвердить",
        action: () => handlePress(),
      }}
    >
      <CTextField
        placeholder="Код подтверждения"
        value={code}
        error={error}
        keyboardType="number-pad"
        maxLength={6}
        onChange={(value: string) => enterCode(value)}
      />
      <View style={{ alignSelf: 'stretch', alignItems: 'flex-end' }}>
        { seconds <= 0
          ? <TouchableOpacity onPress={ () => resendCode() }>
              <Text style={ styles.resend }>Отправить повторно</Text>
            </TouchableOpacity>
          : <Text style={ styles.resend }>Повторная отправка { seconds } секунд</Text> }
      </View>
    </SignUpLayout>
  );
};

export default SUConfirmPage;

const styles = StyleSheet.create({
  resend: {
    marginTop: h(10),
    fontSize: Font.medium_small,
    color: TextColors.light.gray_dark
  }
});
