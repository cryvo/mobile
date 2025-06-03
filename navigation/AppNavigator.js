// mobile-app/navigation/AppNavigator.js

import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import AppNavigator from './navigation/AppNavigator'

export default function App() {
  return <AppNavigator />
}


// Authentication & Profile
import LoginScreen                 from '../screens/LoginScreen'
import SignUpScreen                from '../screens/SignUpScreen'
import ProfileScreen               from '../screens/ProfileScreen'

// Core Features
import EarnScreen                  from '../screens/EarnScreen'
import OptionsScreen               from '../screens/OptionsScreen'
import CopyTradingScreen           from '../screens/CopyTradingScreen'
import CompetitionsScreen          from '../screens/CompetitionsScreen'
import LeaderboardScreen           from '../screens/LeaderboardScreen'
import SwapScreen                  from '../screens/SwapScreen'
import DepositScreen               from '../screens/DepositScreen'
import WithdrawScreen              from '../screens/WithdrawScreen'
import ChartScreen                 from '../screens/ChartScreen'

// CryBot
import CrybotSubscribeScreen       from '../screens/CrybotSubscribeScreen'
import CrybotDashboardScreen       from '../screens/CrybotDashboardScreen'

// MT4/5 Live Trades
import MtTradesScreen              from '../screens/MtTradesScreen'

const Stack = createStackNavigator(
  {
    // Auth flow
    Login:            LoginScreen,
    SignUp:           SignUpScreen,

    // User
    Profile:          ProfileScreen,

    // Products & Trading
    Earn:             EarnScreen,
    Options:          OptionsScreen,
    CopyTrading:      CopyTradingScreen,
    Competitions:     CompetitionsScreen,
    Leaderboard:      LeaderboardScreen,
    Swap:             SwapScreen,
    Deposit:          DepositScreen,
    Withdraw:         WithdrawScreen,
    Chart:            ChartScreen,

    // CryBot
    CrybotSubscribe:  CrybotSubscribeScreen,
    CrybotDashboard:  CrybotDashboardScreen,

    // MT4/5 Trades
    MtTrades:         MtTradesScreen,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: '#7C3AED' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    },
  }
)

export default createAppContainer(Stack)
