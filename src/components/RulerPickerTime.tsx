import { Lucide } from "@react-native-vector-icons/lucide";
import { useState } from 'react';
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RulerPicker } from 'react-native-ruler-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { changeTime } from '../features/pomodoro/PomodoroSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { colors, fonts, radius, textSize } from '../theme';
type Props = {
  visibleForm: boolean
  onClose: () => void

}
const screenWidth = Dimensions.get('window').width;
const RulerPickerTime = ({ visibleForm, onClose }: Props) => {
  const insets = useSafeAreaInsets();
  const currentTime = useAppSelector((state) => state.pomodoro.time);
  const [time, setTime] = useState(currentTime);
  const dispatch = useAppDispatch();
  const handleAddTime = () => {
    dispatch(changeTime(time));
    onClose();
  }
  return (
    <Modal
      animationType='slide'
      visible={visibleForm}
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
            <Text style={styles.title}>StopWatch</Text>
            <Lucide name={'timer'} style={[styles.title, { fontSize: 30 }]} />
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <RulerPicker
                key={visibleForm ? currentTime : 'closed'}
                min={10}
                max={180}
                step={5}
                fractionDigits={0}
                initialValue={currentTime}
                onValueChangeEnd={(number) => setTime(Number(number))}
                unit="min"
                height={70}
                indicatorHeight={50}
                shortStepHeight={20}
                valueTextStyle={styles.title}
                unitTextStyle={styles.title}
              />
            </View>

            <TouchableOpacity
              onPress={handleAddTime}
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