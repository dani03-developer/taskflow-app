import { Lucide, type LucideIconName } from "@react-native-vector-icons/lucide";
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RulerPicker } from 'react-native-ruler-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, textSize } from '../theme';

type Props = {
  visible: boolean
  onClose: () => void
  onConfirm: (value: number) => void
  initialValue: number
  min?: number
  max?: number
  step?: number
  unit?: string
  title?: string
  iconName?: LucideIconName
}

const RulerPickerTime = ({
  visible,
  onClose,
  onConfirm,
  initialValue,
  min = 10,
  max = 180,
  step = 5,
  unit = 'min',
  title = 'Tiempo',
  iconName = 'timer',
}: Props) => {
  const insets = useSafeAreaInsets();
  const [value, setValue] = useState(initialValue);

  const handleConfirm = () => {
    onConfirm(value);
    onClose();
  }

  return (
    <Modal
      animationType='slide'
      visible={visible}
      transparent
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdropTouchable} onPress={onClose} />
        <ScrollView
          style={styles.formScroll}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          bounces={false}
        >
          <View style={styles.form}>
            <View style={styles.grabber} />
            <Text style={styles.title}>{title}</Text>
            <Lucide name={iconName} style={[styles.title, { fontSize: 30 }]} />
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <RulerPicker
                key={visible ? initialValue : 'closed'}
                min={min}
                max={max}
                step={step}
                fractionDigits={0}
                initialValue={initialValue}
                onValueChangeEnd={(number) => setValue(Number(number))}
                unit={unit}
                height={70}
                indicatorHeight={50}
                shortStepHeight={20}
                valueTextStyle={styles.title}
                unitTextStyle={styles.title}
              />
            </View>

            <TouchableOpacity
              onPress={handleConfirm}
              activeOpacity={0.85}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default RulerPickerTime;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdropTouchable: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.backColor,
  },
  formScroll: {
    flexGrow: 0,
    maxHeight: '90%',
    backgroundColor: colors.backgroundColor,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  form: {
    width: '100%',
    paddingHorizontal: 18,
    paddingTop: 18,
    gap: 15,
    backgroundColor: colors.backgroundColor,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  grabber: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 10,
    backgroundColor: colors.darkGray,
    marginBottom: 4,
  },
  title: {
    fontSize: textSize.title,
    fontFamily: fonts.Intersemibold,
    color: colors.text,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: colors.text,
    paddingVertical: 15,
    borderRadius: radius.md,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: colors.backgroundColor,
    fontFamily: fonts.Interbold,
    fontSize: textSize.subTitle,
  },
});
