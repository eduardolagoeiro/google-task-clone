import React from 'react';
import { View, StyleSheet, Pressable, Modal } from 'react-native';

interface SimpleModalProps {
  visible: boolean;
  children: JSX.Element;
  closeFunction: () => void;
}

export default function SimpleModal(props: SimpleModalProps) {
  return (
    <>
      {props.visible ? <View style={styles.overlay} /> : null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.closeFunction}
      >
        <Pressable style={styles.modalSpace} onPress={props.closeFunction}>
          <View />
        </Pressable>
        {props.children}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalSpace: {
    flex: 1,
  },
  overlay: {
    opacity: 0.2,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    elevation: 25,
  },
});
