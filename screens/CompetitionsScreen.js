// mobile-app/screens/CompetitionsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import api from '../utils/api';

export default function CompetitionsScreen({ navigation }) {
  const [comps, setComps] = useState([]);
  useEffect(() => { api.get('/competitions').then(r=>setComps(r.data)); }, []);

  return (
    <View style={{ flex:1, padding:16 }}>
      <FlatList
        data={comps}
        keyExtractor={c=>c.id.toString()}
        renderItem={({item})=>(
          <View style={{ marginBottom:12 }}>
            <Text style={{fontSize:18}}>{item.name}</Text>
            <Button
              title="View Leaderboard"
              onPress={()=>navigation.navigate('Leaderboard', { id: item.id })}
              color="#7C3AED"
            />
          </View>
        )}
      />
    </View>
  );
}

// mobile-app/screens/LeaderboardScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import api from '../utils/api';

export default function LeaderboardScreen({ navigation }) {
  const [board, setBoard] = useState([]);
  const id = navigation.getParam('id');
  useEffect(() => { api.get(`/competitions/${id}/leaderboard`).then(r=>setBoard(r.data)); }, []);

  return (
    <View style={{ flex:1, padding:16 }}>
      <FlatList
        data={board}
        keyExtractor={e=>e.id.toString()}
        renderItem={({item})=>(
          <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:8 }}>
            <Text>{item.user.name}</Text>
            <Text>{item.profit}</Text>
          </View>
        )}
      />
    </View>
  );
}
