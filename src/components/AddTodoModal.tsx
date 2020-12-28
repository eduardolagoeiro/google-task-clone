import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import SimpleModal from './SimpleModal';

export default function AddTodoModal(props: {
  closeModal: () => void;
  createTodo: (value: string) => void;
  addModalVisible: boolean;
}) {
  const [newTodoText, setNewTodoText] = useState('');

  const modalInput = useRef<TextInput>(null);
  if (props.addModalVisible) {
    setTimeout(() => {
      modalInput.current?.focus();
    }, 100);
  }
  return (
    <SimpleModal
      closeFunction={props.closeModal}
      visible={props.addModalVisible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        contentContainerStyle={styles.addModal}
        style={styles.addModal}
      >
        <TextInput
          placeholder="New task"
          ref={modalInput}
          style={styles.modalInput}
          onChangeText={setNewTodoText}
          value={newTodoText}
        />
        <TouchableOpacity
          style={styles.saveButtonWrapper}
          disabled={!newTodoText}
          onPress={() => {
            props.createTodo(newTodoText);
            setNewTodoText('');
          }}
        >
          <Text
            style={[
              styles.saveButton,
              newTodoText ? {} : styles.saveButtonDisabled,
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SimpleModal>
  );
}

const styles = StyleSheet.create({
  addModal: {
    height: 132,
    width: '100%',
    backgroundColor: 'white',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    position: 'absolute',
    bottom: 0,
  },
  modalInput: {
    color: 'black',
    fontSize: 16,
    padding: 20,
  },
  saveButtonWrapper: {
    backgroundColor: 'white',
    paddingRight: 25,
    paddingBottom: 40,
  },
  saveButton: {
    color: '#2373E6',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  saveButtonDisabled: {
    color: '#B7B7B7',
  },
});
