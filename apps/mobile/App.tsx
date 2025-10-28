import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createNearxApiClient,
  type LoginPayload,
  type NearxApiClient,
} from '@nearx/api-client';

export default function App() {
  const [baseUrl, setBaseUrl] = useState('http://localhost:3000/api');
  const [email, setEmail] = useState('operator@example.com');
  const [password, setPassword] = useState('nearx123');
  const [status, setStatus] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setStatus(null);
    setToken(null);
    setLoading(true);

    try {
      const client: NearxApiClient = createNearxApiClient({ baseUrl });
      const payload: LoginPayload = {
        email,
        password,
      };
      const response = await client.login(payload);
      setToken(response.token);
      setStatus(`Welcome back, ${response.user.firstName}!`);
    } catch (error: unknown) {
      setStatus(error instanceof Error ? error.message : 'Failed to login. Check backend status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps='handled'
      >
        <Text style={styles.title}>NEARX Mobile Admin</Text>
        <Text style={styles.subtitle}>
          Authenticate against the identity service to unlock proximity-first features.
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>API Base URL</Text>
          <TextInput
            style={styles.input}
            value={baseUrl}
            onChangeText={setBaseUrl}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='url'
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() => {
            void handleLogin();
          }}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
        </TouchableOpacity>

        {status && <Text style={styles.status}>{status}</Text>}
        {token && (
          <View style={styles.tokenContainer}>
            <Text style={styles.tokenLabel}>Session Token</Text>
            <Text selectable style={styles.tokenValue}>
              {token}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    gap: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1b2a4b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 22,
  },
  formGroup: {
    width: '100%',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#10b981',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  tokenContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#6ee7b7',
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  tokenLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#047857',
  },
  tokenValue: {
    fontFamily: 'monospace',
    color: '#065f46',
    fontSize: 12,
  },
});
