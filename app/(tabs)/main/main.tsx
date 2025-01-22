import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Config } from 'react-native-config';
import { useNavigation } from '@react-navigation/native';

export default function Main() {

  const navigation = useNavigation();

  const client = {
    fullName: 'Jose dos Santos',
    balance: 231,
  };

  const actions = [
    { id: '0', name: 'Conectar Conta', screen: 'Pluggy', icon: 'add-circle-outline' as const },
    { id: '1', name: 'Área Pix', screen: 'pix', icon: 'cash-outline' as const },
    { id: '2', name: 'Transferir', screen: 'transfer', icon: 'swap-horizontal-outline' as const },
    { id: '3', name: 'Depositar', screen: 'deposit', icon: 'add-circle-outline' as const },
    { id: '4', name: 'Sacar', screen: 'withdraw', icon: 'remove-circle-outline' as const },
    { id: '5', name: 'Pagamentos', screen: 'payments', icon: 'receipt-outline' as const },
    { id: '6', name: 'Recarregar celular', screen: 'reload', icon: 'phone-portrait-outline' as const },
    { id: '7', name: 'Ultrapasse', screen: 'ultrapasse', icon: 'car-outline' as const },
    { id: '8', name: 'Parcelar tudo', screen: 'parcel', icon: 'wallet-outline' as const },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {client.fullName}</Text>
        <Ionicons name="help-circle-outline" size={24} color="white" />
      </View>

      {/* Conteúdo principal com Scroll */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Saldo e Ação */}
        <View style={styles.balanceCard}>
          <Text style={styles.balance}>R$ {client.balance}</Text>
          <Text style={styles.infoText}>Traga mais R$ 647,70 este mês para continuar com 105% do CDI.</Text>
        </View>

        {/* Ações principais */}
        <View style={styles.actionSection}>
          {actions.map((item) => (
            <TouchableOpacity key={item.id} style={styles.actionButton} onPress={() => navigation.navigate(item.screen as never)}>
              <Ionicons name={item.icon} size={28} color="#007AFF" />
              <Text style={styles.actionText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.tabText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="card-outline" size={24} color="white" />
          <Text style={styles.tabText}>Pix</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="menu-outline" size={24} color="white" />
          <Text style={styles.tabText}>Mais</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  greeting: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  balanceCard: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 10,
    padding: 16,
    elevation: 4,
    justifyContent: 'center',
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  actionSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    width: Dimensions.get('window').width / 4 - 20,
    alignItems: 'center',
    marginVertical: 8,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});
