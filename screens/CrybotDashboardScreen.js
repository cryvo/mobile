import React, { useState, useEffect } from 'react';
import { View, Text, Picker, ScrollView, StyleSheet } from 'react-native';
import API from '../utils/api';
import NewsFeed from '../components/NewsFeed';

export default function CrybotDashboard() {
  const [cfg, setCfg]       = useState({});
  const [mode, setMode]     = useState('');
  
  useEffect(() => {
    API.get('/admin/settings/crybot-config').then(({ data }) => {
      setCfg(data);
      setMode(data.mode);
    });
  }, []);

  const onChangeMode = async m => {
    setMode(m);
    const updated = { ...cfg, mode: m };
    await API.post('/admin/settings/crybot-config', updated);
    setCfg(updated);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>CryBot Dashboard</Text>
      {cfg.modes && (
        <Picker
          selectedValue={mode}
          onValueChange={onChangeMode}
          style={styles.picker}
        >
          {Object.keys(cfg.modes).map(m => (
            <Picker.Item key={m} label={m.toUpperCase()} value={m} />
          ))}
        </Picker>
      )}
      <View style={styles.newsSection}>
        <Text style={styles.sectionHeader}>Latest News & Sentiment</Text>
        <NewsFeed query="crypto OR forex OR stocks" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header:    { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  picker:    { height: 50, marginBottom: 20 },
  newsSection: { marginTop: 20 },
  sectionHeader: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
});
