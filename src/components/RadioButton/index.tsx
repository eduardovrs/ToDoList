import React from 'react';
import {View} from 'react-native';
import {CheckButton, CheckIcon, UncheckedButton} from './styles';
interface IRadioButton {
  isActive: boolean;
  onChangeButton: () => void;
}

const RadioButton = ({isActive, onChangeButton}: IRadioButton) => {
  return (
    <View>
      {isActive ? (
        <CheckButton onPress={onChangeButton}>
          <CheckIcon name="check" size={20} />
        </CheckButton>
      ) : (
        <UncheckedButton onPress={onChangeButton} />
      )}
    </View>
  );
};

export default RadioButton;
