import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, KeyboardAvoidingView, View} from 'react-native';
import {Input, Button, ErrorText} from '../components/Form';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFC0',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  headerText: {
    color: '#353031',
    fontWeight: 'bold',
    fontSize: 30,
    top: -200,
  },
});

const useLoginFormState = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId:
        '24083507219-s9ca2acl239njqoa548gu3pdp2ip2mad.apps.googleusercontent.com',
    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  let isUsernameValid = false;
  let isPasswordValid = false;

  if (username === 'sample123') {
    isUsernameValid = true;
  }

  if (password === '123_sample') {
    isPasswordValid = true;
  }

  return {
    username: {
      value: username,
      set: setUsername,
      valid: isUsernameValid,
    },
    password: {
      value: password,
      set: setPassword,
      valid: isPasswordValid,
    },
    submit: {
      value: submit,
      set: () => {
        setSubmit(true);

        if (isUsernameValid && isPasswordValid) {
          fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
              username,
              password,
            }),
          })
            .then(response => response.json())
            .then(() => {
              navigation.push('HomeScreen');
            })
            .catch(error => {
              console.log('error', error);
            });
        }
      },
    },
  };
};

export default ({navigation}) => {
  const {username, password, submit} = useLoginFormState({navigation});

  let usernameErrorMsg;
  let passwordErrorMsg;

  if (submit.value && !username.valid) {
    usernameErrorMsg = 'Invalid username.';
  }

  if (submit.value && !password.valid) {
    passwordErrorMsg = 'Invalid password.';
  }

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <Text style={styles.headerText}>Login</Text>
      <Input
        //label="Username"
        placeholder="Username"
        onChangeText={username.set}
        error={usernameErrorMsg}
        testID="SignIn.usernameInput"
      />
      <Input
        //label="Password"
        placeholder="Password"
        secureTextEntry
        onChangeText={password.set}
        error={passwordErrorMsg}
        testID="SignIn.passwordInput"
      />
      <ErrorText messages={[usernameErrorMsg, passwordErrorMsg]} />
      <Button testID="SignIn.Button" text="Login" onPress={submit.set} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'center',
          bottom: 40,
        }}>
        OR
      </Text>
      <View marginLeft={70}>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={_signIn}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
