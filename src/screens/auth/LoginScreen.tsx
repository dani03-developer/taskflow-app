import { colors, fonts, textSize } from '@/src/theme'
import LottieView from 'lottie-react-native'
import { useState } from 'react'
import { ActivityIndicator, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import image from '../../assets/backgroundLogin.png'
import { signIn } from '../../services/auth/authService'
type Props = {
  navigation: any
}

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => { //asyncpermite ejecutar operaciones que toman tiempo sin bloquear el hilo principal, devolviendo siempre una promesa.
    setError('')
    setLoading(true)
    if (!email.trim() || !password) {
      setError('Completá email y contraseña')
      return
    }

    try {
      await signIn(email.trim(), password) //aquí se comunica con firebase singIn es el puente entre la app y firebase
    } catch (error) {
      console.error(error)
      setError('Email o contraseña incorrectos')
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <View style={styles.lottieWrapper}>
            <LottieView
              source={require('../../assets/lotties/animacionLogin.json')}
              autoPlay
              resizeMode='cover'
              loop
              style={{ width: '100%', height: '100%'}}
            />
          </View>
          <View style={styles.form}>
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

            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : null}

            <Pressable
              style={styles.button}
              disabled={loading}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>{loading ? <ActivityIndicator color={colors.backgroundColor}/>: "Iniciar Sesión"}</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.link}>
                ¿No tenés una cuenta? Registrate
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  lottieWrapper: {
    height:'60%',
    justifyContent: 'center',
    paddingTop:10,
  },
  form: {
    flex: 1,
    alignContent: 'flex-start',
    paddingHorizontal: 24,
    gap: 5
  },

  subtitle: {
    fontSize: textSize.subTitle,
    fontFamily: fonts.Interbold,
    color: colors.text
  },

  input: {
    backgroundColor: colors.backgroundColor,
    borderRadius: 8,
    padding: 12,
    marginBottom: 5,
  },

  button: {
    backgroundColor: colors.text,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
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
    color: colors.textRed,
    marginBottom: 8,
    fontFamily: fonts.Interregular
  },
})