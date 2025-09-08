import React, { useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import ProductsSection from '../components/ProductsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { theme } = useTheme();
  const scrollViewRef = useRef(null);

  const scrollToSection = (sectionIndex) => {
    // Approximate heights for each section
    const sectionHeights = {
      0: 0, // Hero
      1: 600, // Video
      2: 1200, // Products
      3: 1800, // About
      4: 2400, // Contact
    };
    
    scrollViewRef.current?.scrollTo({
      y: sectionHeights[sectionIndex] || 0,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header onNavigate={scrollToSection} />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Hero />
        <VideoSection />
        <ProductsSection />
        <AboutSection />
        <ContactSection />
        <FAQSection />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});