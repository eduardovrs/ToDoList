import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';

interface IFinishedButton {
  isFinished: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: column;
  height: 20%;
  background-color: #000000;
  align-items: center;
  z-index: 1;
`;

export const Logo = styled.Image`
  height: 32px;
  width: 110px;
  align-self: flex-start;
`;

export const LogoView = styled.View`
  justify-content: center;
`;

export const AddTaskContainer = styled.View`
  flex-direction: row;
  margin-top: 10%;
`;

export const AddTaskButton = styled.TouchableOpacity`
  height: 90%;
  width: 13%;
  margin-left: 5px;
  border-radius: 6px;
  background-color: #1e6f9f;
  align-items: center;
  justify-content: center;
`;

export const PlusIcon = styled(AntDesign)`
  color: #f2f2f2;
`;

export const AddTaskTextInput = styled.TextInput`
  background-color: #262626;
  justify-content: flex-end;
  height: 90%;
  width: 60%;
  border-radius: 6px;
  padding: 10px;
`;

export const TaskListView = styled.View`
  height: 80%;
  background-color: #0d0d0d;
  z-index: 1;
`;

export const TaskStatus = styled.View`
  flex-direction: row;
  padding: 5%;
`;

export const TrashCanIcon = styled(MaterialCommunityIcons)`
  color: #808880;
`;

export const CreatedText = styled.Text`
  color: #4ea8de;
  font-size: 14px;
  font-weight: bold;
`;

export const ConcludedText = styled.Text`
  color: #4ea8de;
  font-size: 14px;
  font-weight: bold;
  margin-left: 48%;
`;

export const TaskNameText = styled.Text<IFinishedButton>`
  font-size: 14px;
`;

export const TaskRenderButton = styled.TouchableOpacity`
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  background-color: #262626;
  margin: 4px 24px;
  border-radius: 8px;
  padding: 12px;
`;

export const ScratchedTaskNameText = styled.Text`
  color: #f2f2f2;
  font-size: 14px;
  text-decoration: line-through;
`;

export const NoTasksContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 20%;
`;

export const ClipboardIcon = styled(Foundation)`
  color: #333333;
  margin-bottom: 16px;
`;

export const NoTaskText = styled.Text`
  color: #808080;
  align-self: center;
  font-size: 14px;
`;

export const TaskCounterContainer = styled.View`
  background-color: #333333;
  height: 19px;
  width: 25px;
  border-radius: 99px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

export const TaskCounterText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: #d9d9d9;
`;
