import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const CheckButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 20px;
  background-color: #5e60ce;
  align-items: center;
  justify-content: center;
`;

export const CheckIcon = styled(Feather)`
  color: #f2f2f2;
`;

export const UncheckedButton = styled.TouchableOpacity`
  height: 25px;
  width: 25px;
  border-radius: 20px;
  border: 2px solid #4ea8de;
  background-color: #333333;
`;
