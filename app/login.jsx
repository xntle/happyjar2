import { Alert, Pressable, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState , useRef} from 'react';
import { useRouter} from 'expo-router';
import { supabase } from '../lib/supabase';

const Login = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
      if(!emailRef.current || !passwordRef.current){
        Alert.alert('Login', "please fill out all fields")
        return;
      }

      let email = emailRef.current.trim();
      let password = passwordRef.current.trim();
      setLoading(true);
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password
      });

      setLoading(false);

      console.log('error: ', error);
      if(error){
        Alert.alert('Login', error.message);
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        onChangeText={text=> emailRef.current = text}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        onChangeText={text=> passwordRef.current = text}
        secureTextEntry
        autoCapitalize="none"
      />
      
      <TouchableOpacity style={styles.button} onPress={onSubmit} loading={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
      </TouchableOpacity>
      <Pressable onPress={() => router.push('signUp')}>
      <Text style={styles.footerText}>
        Don't have an account? <Text style={styles.signupText}>Sign up</Text>
      </Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f0f0f5',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#666666',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    color: '#888888',
  },
  signupText: {
    color: '#666666',
    fontWeight: 'bold',
  },
});
