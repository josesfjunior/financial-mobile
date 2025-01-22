import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { PluggyConnect } from 'react-native-pluggy-connect';
import { useNavigation } from '@react-navigation/native';


export default function Pluggy() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const sandbox = true;

  const navigation = useNavigation();

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get("http://10.1.82.85:4000/api/credentials", {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setApiKey(response.data.token);
      } catch (error) {
        console.error('Erro ao obter a API Key:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApiKey();
  }, []);

  const handleOnOpen = useCallback(() => {
    console.log('open');
  }, []);

  const onSuccess = (itemData: any) => {
    console.log(itemData);
    navigation.navigate('Main' as never);
  };

  const handleOnClose = useCallback(() => {
    setApiKey('');
    navigation.navigate('Main' as never);
  }, []);

  const onError = (error: any) => {
    console.log(error);
    navigation.navigate('Main' as never);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!apiKey) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar a API Key.</Text>
      </View>
    );
  }

  return (
        <PluggyConnect
        connectToken={apiKey}
        includeSandbox={sandbox}
        onOpen={handleOnOpen}
        onClose={handleOnClose}
        onSuccess={onSuccess}
        onError={onError}
      />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
});
