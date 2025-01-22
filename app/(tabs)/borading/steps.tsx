import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
import UndrawAccessAccount from '@/app/components/undraw_access-account';
import UndrawMobileAnalytics from '@/app/components/undraw_mobile-analytics';
import UndrawPersonalGoals from '@/app/components/undraw_personal-goals';

const { width, height } = Dimensions.get('window');
const rWidth = width * 0.8;
const rHeight = height * 0.4;

const stepIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#800080', // Cor roxa
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#800080', // Cor roxa
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#800080', // Cor roxa
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#800080', // Cor roxa
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#800080', // Cor roxa
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#800080', // Cor roxa
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  stepIndicatorContainer: {
    marginTop: 80,
    width: '100%',
    paddingHorizontal: 20,
  },
  page: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  stepContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 30,
    width: '80%',
  },
  nextButton: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    backgroundColor: '#800080', // Cor roxa
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});

const steps = [
  {
    key: 'step1',
    component: (
      <View style={styles.stepContainer}>
        <UndrawAccessAccount width={rWidth} height={rHeight} />
        <Text style={styles.text}>Bem-vindo ao Connect! Conecte suas contas bancárias em um só lugar.</Text>
      </View>
    ),
  },
  {
    key: 'step2',
    component: (
      <View style={styles.stepContainer}>
        <UndrawMobileAnalytics width={rWidth} height={rHeight} />
        <Text style={styles.text}>Veja seus dados financeiros de forma clara e organizada.</Text>
      </View>
    ),
  },
  {
    key: 'step3',
    component: (
      <View style={styles.stepContainer}>
        <UndrawPersonalGoals width={rWidth} height={rHeight} />
        <Text style={styles.text}>Com a ajuda da inteligência artificial, organize suas finanças de maneira fácil.</Text>
      </View>
    ),
  },
];

const Onboarding = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentStep(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentStep + 1 });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicatorContainer}>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          currentPosition={currentStep}
          stepCount={steps.length}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={steps}
        renderItem={({ item, index }) => (
          <View style={styles.page}>
            {item.component}
            {index === steps.length - 1 && (
              <View style={styles.buttonContainer}>
                <Button title="Ir para Login" onPress={() => navigation.navigate('Login' as never)} />
              </View>
            )}
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      {currentStep < steps.length - 1 && (
        <TouchableOpacity style={styles.nextButton} onPress={goToNextStep}>
          <Text style={styles.nextButtonText}>→</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Onboarding;
