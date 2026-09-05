import { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

import { colors, fonts, textSize } from '@/src/theme'
import image from '../../assets/bepRegister.png'
import { createAccount } from '../../services/auth/authService'
type Props = {
  navigation: any
}

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, isLoading] =useState(false)
  const handleRegister = async () => {
    setError('')
    isLoading(true)
    if (!email.trim() || !password || !confirmPassword) {
      setError('Completá todos los campos')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      await createAccount(email.trim(), password)
    } catch (error) {
      console.error(error)
      setError('No se pudo crear la cuenta')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Bienvenido a{"\n"} Task flow</Text>
        <Text style={styles.subtitle}>Gmail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.subtitle}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Repetir contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}

        <Pressable
          style={styles.button}
          disabled={loading}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>{loading ? <ActivityIndicator color={colors.backgroundColor}/>: "Crear cuenta"}</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.link}>
            ¿Ya tenés una cuenta? Ingresá
          </Text>
        </Pressable>
      </View>
      <View style={styles.containerImage}>
        <Image source={image} style={styles.image} />
      </View>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  form: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 35,
    paddingVertical: 15,
    gap: 5,

  },

  title: {
    fontSize: 32,
    fontFamily: fonts.BepFont,
    textAlign: 'center',
    marginBottom: 50

  },

  subtitle: {
    fontSize: textSize.subTitle,
    fontFamily: fonts.Interbold,
    color: colors.text
  },

  input: {
    backgroundColor: colors.softGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: colors.text,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },

  buttonText: {
    color: colors.backgroundColor,
    fontWeight: 'bold',
  },

  link: {
    textAlign: 'center',
    fontFamily: fonts.Interregular
  },

  error: {
    color: 'red',
    marginBottom: 8,
    fontFamily: fonts.Interregular
  },
  containerImage: {
    height: '30%',
    justifyContent: 'flex-end',
  },
  image: {
    width: 'auto',
    height: '100%'
  }
})