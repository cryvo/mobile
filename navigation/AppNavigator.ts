import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import EarnScreen from '../screens/EarnScreen';
import OptionsScreen from '../screens/OptionsScreen';
import CopyTradingScreen from '../screens/CopyTradingScreen';
import CompetitionsScreen from '../screens/CompetitionsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import SwapScreen from '../screens/SwapScreen';
import CrybotSubscribeScreen from '../screens/CrybotSubscribeScreen';
import CrybotDashboardScreen from '../screens/CrybotDashboardScreen';
import DepositScreen from '../screens/DepositScreen';
import MtTradesScreen from '../screens/MtTradesScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import ChartScreen from '../screens/ChartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TradeScreen from '../screens/TradeScreen';
import ReferralScreen from '../screens/ReferralScreen';
import ProfileScreen from '../screens/ProfileScreen';
// …add other screens like NFT, Wallet, Markets…

const Stack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Earn: EarnScreen,
    Options: OptionsScreen,
    CopyTrading: CopyTradingScreen,
    Competitions: CompetitionsScreen,
    Leaderboard: LeaderboardScreen,
    Swap: SwapScreen,
    Deposit: DepositScreen,
    Withdraw: WithdrawScreen,
    Chart: ChartScreen,
    // …etc…
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: '#7C3AED' },
      headerTintColor: '#fff',
    },
  }
);

export default createAppContainer(Stack);
