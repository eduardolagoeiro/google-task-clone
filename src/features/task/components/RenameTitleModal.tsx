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
import ThemeContext from '../../theme/state/theme.context';
import TaskContext from '../state/task.context';
import { updateTilte } from '../state/task.reducer';

export default function RenameTitleModal() {
  const [newTitle, setNewTitle] = useState('');

  const { state, dispatch } = useContext(TaskContext);

  const { state: themeState } = useContext(ThemeContext);

  const modalInput = useRef<TextInput>(null);

  useEffect(() => {
    if (state.isRenameModalOpen) {
      setTimeout(() => {
        modalInput.current?.focus();
      }, 10);
    } else {
      setTimeout(() => {
        Keyboard.dismiss();
      }, 10);
    }
  }, [state.isRenameModalOpen]);

  return (
    <SimpleModal
      closeFunction={() => {
        dispatch({ type: 'CLOSE_RENAME_TITLE' });
      }}
      visible={state.isRenameModalOpen}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        contentContainerStyle={[
          styles.addModal,
          { backgroundColor: themeState.theme.backgroundColor },
        ]}
        style={[
          styles.addModal,
          { backgroundColor: themeState.theme.backgroundColor },
        ]}
      >
        <TextInput
          autoFocus={true}
          placeholderTextColor={themeState.theme.disabled}
          placeholder="New title"
          ref={modalInput}
          style={[styles.modalInput, { color: themeState.theme.text }]}
          onChangeText={setNewTitle}
          value={newTitle}
        />
        <TouchableOpacity
          style={[
            styles.saveButtonWrapper,
            { backgroundColor: themeState.theme.backgroundColor },
          ]}
          disabled={!newTitle}
          onPress={() => {
            dispatch({ type: 'CLOSE_RENAME_TITLE' });
            setTimeout(() => {
              dispatch(updateTilte(newTitle));
            }, 200);
            setNewTitle('');
          }}
        >
          <Text
            style={[
              styles.saveButton,
              newTitle
                ? {
                    color: themeState.theme.primary,
                  }
                : {
                    color: themeState.theme.disabled,
                  },
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
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    position: 'absolute',
    bottom: 0,
  },
  modalInput: {
    fontSize: 16,
    padding: 20,
  },
  saveButtonWrapper: {
    paddingRight: 25,
    paddingBottom: 40,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});
