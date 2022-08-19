import SignUpHeader from "components/Headers/SignUpHeader";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SUEmailPage from "pages/SignUp/SUEmailPage";
import SUPasswordPage from "pages/SignUp/SUPasswordPage";
import SUUsernamePage from "pages/SignUp/SUUsernamePage";
import SUUserDataPage from "pages/SignUp/SUUserDataPage";
import SULocationPage from "pages/SignUp/SULocationPage";
import SUAvatarPage from "pages/SignUp/SUAvatarPage";
import SUConfirmPage from "pages/SignUp/SUConfirmPage";

const Tab = createMaterialTopTabNavigator();

export default () => {
  return(
    <Tab.Navigator
      initialRouteName="SignUpEmail"
      tabBar={SignUpHeader}
      backBehavior="history"
      screenOptions={{
        swipeEnabled: false,
      }}
    >
      <Tab.Screen
        name="SignUpEmail"
        component={SUEmailPage}
      />
      <Tab.Screen
        name="SignUpConfirm"
        component={SUConfirmPage}
      />
      <Tab.Screen
        name="SignUpPassword"
        component={SUPasswordPage}
      />
      <Tab.Screen
        name="SignUpUsername"
        component={SUUsernamePage}
      />
      <Tab.Screen
        name="SignUpUserData"
        component={SUUserDataPage}
      />
      <Tab.Screen
        name="SignUpLocation"
        component={SULocationPage}
      />
      <Tab.Screen
        name="SignUpAvatar"
        component={SUAvatarPage}
      />
    </Tab.Navigator>
  )
}
