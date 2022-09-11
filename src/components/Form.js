import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    top: -100,
    backgroundColor: '#f4f6f8',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#4E944F',
  },
  inputContainerError: {
    borderColor: '#D72323',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 10,
    color: '#b4b6b8',
  },
  input: {
    color: '#353031',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    top: -100,
    backgroundColor: '#3D8361',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    //paddingVertical: 10,
  },
  errorText: {
    fontSize: 14,
    color: '#D72323',
  },
});

export const Input = ({label, error, ...props}) => {
  const containerStyles = [styles.inputContainer];
  if (error) {
    containerStyles.push(styles.inputContainerError);
  }

  return (
    <View style={containerStyles}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.row}>
        <TextInput autoCapitalize="none" style={styles.input} {...props} />
      </View>
    </View>
  );
};

export const Button = ({text, onPress, ...props}) => {
  return (
    <TouchableOpacity {...props} onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const ErrorText = ({messages = []}) => {
  const displayMessages = messages.filter(msg => msg !== undefined);

  return (
    <View style={styles.errorContainer}>
      {displayMessages.map(msg => (
        <Text key={msg} style={styles.errorText}>
          {msg}
        </Text>
      ))}
    </View>
  );
};
