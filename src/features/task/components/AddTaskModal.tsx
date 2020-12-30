import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import SimpleModal from '../../common/components/SimpleModal';
import TaskContext from '../state/task.context';
import { addTask } from '../state/task.reducer';

export default function AddTaskModal() {
  const [newTaskText, setNewTaskText] = useState('');

  const { state, dispatch } = useContext(TaskContext);

  const modalInput = useRef<TextInput>(null);

  useEffect(() => {
    if (state.isAddModalOpen) {
      setTimeout(() => {
        modalInput.current?.focus();
      }, 10);
    } else {
      setTimeout(() => {
        Keyboard.dismiss();
      }, 10);
    }
  }, [state.isAddModalOpen]);

  return (
    <SimpleModal
      closeFunction={() => {
        dispatch({ type: 'CLOSE_ADD_MODAL' });
      }}
      visible={state.isAddModalOpen}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        contentContainerStyle={styles.addModal}
        style={styles.addModal}
      >
        <TextInput
          autoFocus={true}
          placeholder="New task"
          ref={modalInput}
          style={styles.modalInput}
          onChangeText={setNewTaskText}
          value={newTaskText}
        />
        <TouchableOpacity
          style={styles.saveButtonWrapper}
          disabled={!newTaskText}
          onPress={() => {
            dispatch({ type: 'CLOSE_ADD_MODAL' });
            setTimeout(() => {
              dispatch(
                addTask({
                  value: newTaskText,
                  done: false,
                  id: parseInt(Math.random().toFixed(10).substring(2)),
                })
              );
            }, 200);
            setNewTaskText('');
          }}
        >
          <Text
            style={[
              styles.saveButton,
              newTaskText ? {} : styles.saveButtonDisabled,
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
