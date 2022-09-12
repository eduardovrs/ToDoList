import React from 'react';
import {View} from 'react-native';
import {
  CheckButton,
  CheckIcon,
  TrashCanButton,
  TrashCanIcon,
  UncheckedButton,
} from './styles';
interface IRadioButton {
  isActive: boolean;
  onChangeButton: () => void;
}

const RadioButton = ({isActive, onChangeButton}: IRadioButton) => {
  return (
    <View>
      {isActive ? (
        <TrashCanButton onPress={onChangeButton}>
          <TrashCanIcon name="check" color={'#808880'} size={20} />
        </TrashCanButton>
      ) : (
        <TrashCanButton onPress={onChangeButton}>
          <TrashCanIcon name="check" color={'#808880'} size={20} />
        </TrashCanButton>
      )}
    </View>
  );
};

export default RadioButton;
