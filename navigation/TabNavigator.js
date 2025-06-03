// mobile-app/navigation/DrawerNavigator.js

import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import useSWR from 'swr'
import api from '../utils/api'
import TabNavigator from './TabNavigator'
import CMSListScreen from '../screens/CMSListScreen'
import CMSPageScreen from '../screens/CMSPageScreen'

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
  const { data: pages = [] } = useSWR('/pages', api.get)

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={TabNavigator} />
      {pages.map(p => (
        <Drawer.Screen
          key={p.slug}
          name={p.title}
          component={CMSPageScreen}
          initialParams={{ slug: p.slug }}
        />
      ))}
      <Drawer.Screen name="More Pages" component={CMSListScreen} />
    </Drawer.Navigator>
  )
}
