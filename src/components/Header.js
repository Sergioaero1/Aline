import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function Header({ onNavigate }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    { title: 'Home', index: 0 },
    { title: 'Curso', index: 1 },
    { title: 'Sobre', index: 3 },
    { title: 'Contato', index: 4 },
  ];

  const handleMenuPress = (index) => {
    setMenuVisible(false);
    onNavigate(index);
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/553188589163');
  };

  return (
    <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={[styles.logoText, { color: theme.primary }]}>Aline Diversidades</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: theme.backgroundSecondary }]}
            onPress={toggleTheme}
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={20}
              color={theme.text}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.whatsappButton, { backgroundColor: theme.secondary }]}
            onPress={openWhatsApp}
          >
            <Ionicons name="logo-whatsapp" size={20} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuVisible(true)}
          >
            <Ionicons name="menu" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.menuModal, { backgroundColor: theme.background }]}>
            <View style={styles.menuHeader}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>Menu</Text>
              <TouchableOpacity
                onPress={() => setMenuVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
            
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, { borderBottomColor: theme.border }]}
                onPress={() => handleMenuPress(item.index)}
              >
                <Text style={[styles.menuItemText, { color: theme.text }]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    flex: 1,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  themeButton: {
    padding: 8,
    borderRadius: 20,
  },
  whatsappButton: {
    padding: 8,
    borderRadius: 20,
  },
  menuButton: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuModal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
  },
});