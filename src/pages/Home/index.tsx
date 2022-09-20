/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useMemo, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DraggableFlatList, {
  OpacityDecorator,
  ScaleDecorator,
  ShadowDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import Toast from 'react-native-simple-toast';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {
  AddTaskButton,
  AddTaskContainer,
  AddTaskTextInput,
  Container,
  Header,
  Logo,
  LogoView,
  PlusIcon,
  TaskListView,
  TaskStatus,
  TrashCanIcon,
  CreatedText,
  ConcludedText,
  TaskNameText,
  TaskRenderButton,
  TaskCounterContainer,
  TaskCounterText,
  NoTasksContainer,
  ClipboardIcon,
  NoTaskText,
} from './styles';
import RadioButton from '../../components/RadioButton';

interface IData {
  id: string;
  name: string;
  isPressed: boolean;
}

const Home = () => {
  const [data, setData] = useState<IData[]>([]);
  const [state, setState] = useState(true);
  const [taskName, setTaskName] = useState('');
  const randomNumber = String(Math.floor(1000000 + Math.random() * 999999));
  const [newData, setNewData] = useState<IData[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const createdTasks = data.length;
  const concludedTasks = newData.filter(item => item.isPressed === true).length;

  const styles = StyleSheet.create({});

  function addNewTask() {
    const verifyTaskName = data.some(item => {
      return item.name === taskName;
    });

    if (verifyTaskName) {
      return Toast.show('Já existe uma tarefa com esse nome.');
    }

    if (!taskName) {
      return Toast.show('Não é possível adicionar uma tarefa sem nome.');
    }
    const cardInfo = {
      id: randomNumber,
      name: taskName,
      isPressed: isChecked,
    };
    setData(prevState => [...prevState, cardInfo]);
    setTaskName('');
    setState(!state);
  }

  const removeAsyncTask = useCallback(
    (id: string) => {
      const removeTask = data.filter((task: IData) => task.id !== id);
      setData(removeTask);
      setNewData(removeTask);
      setState(!state);
    },
    [data, state],
  );

  const verifyItem = useCallback(
    (item: IData) => {
      const verifyNewData = newData.includes(item);
      if (verifyNewData) {
        setNewData([...newData].filter((task: IData) => task.id !== item.id));
        setState(!state);
      } else {
        setNewData([...newData, item]);
        setState(!state);
      }
    },
    [state, newData],
  );

  const renderItem = useCallback(
    ({item, drag}) => {
      const verifyNewData = newData.includes(item);
      const {isActive} = useOnCellActiveAnimation();
      return (
        <ScaleDecorator>
          <OpacityDecorator activeOpacity={0.5}>
            <ShadowDecorator>
              <TaskRenderButton
                onLongPress={drag}
                delayLongPress={90}
                activeOpacity={1}
                style={[
                  styles.rowItem,
                  {
                    elevation: isActive ? 30 : 0,
                  },
                ]}>
                <RadioButton
                  isActive={verifyNewData}
                  onChangeButton={() => {
                    verifyItem(item);
                  }}
                />
                <TaskNameText
                  style={{
                    textDecorationLine: verifyNewData ? 'line-through' : null,
                    color: verifyNewData ? '#808080' : '#f2f2f2',
                  }}>
                  {item.name}
                </TaskNameText>
                <TouchableOpacity
                  onPress={() => {
                    removeAsyncTask(item.id);
                  }}>
                  <TrashCanIcon name={'trash-can-outline'} size={25} />
                </TouchableOpacity>
              </TaskRenderButton>
            </ShadowDecorator>
          </OpacityDecorator>
        </ScaleDecorator>
      );
    },
    [newData, styles.rowItem, verifyItem, removeAsyncTask],
  );

  const draggableList = useMemo(
    () => (
      <GestureHandlerRootView>
        <DraggableFlatList
          data={data}
          keyExtractor={item => item.id}
          onDragEnd={({data}) => setData(data)}
          renderItem={renderItem}
        />
      </GestureHandlerRootView>
    ),
    [data, renderItem],
  );

  return (
    <Container>
      <Header>
        <LogoView>
          <Logo source={require('../../assets/Logo.png')} />
        </LogoView>
        <AddTaskContainer>
          <AddTaskTextInput
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor={'#808080'}
            onChangeText={setTaskName}
            color={'#F2F2F2'}
            value={taskName}
          />
          <AddTaskButton
            onPress={() => {
              addNewTask();
            }}>
            <PlusIcon name={'pluscircleo'} size={15} />
          </AddTaskButton>
        </AddTaskContainer>
      </Header>

      <TaskListView>
        <TaskStatus
          style={{
            borderBottomWidth: 0.5,
            borderStyle: !data ? null : 'solid',
            borderColor: !data ? null : '#808080',
          }}>
          <CreatedText>Criadas</CreatedText>
          <TaskCounterContainer>
            <TaskCounterText>{createdTasks}</TaskCounterText>
          </TaskCounterContainer>
          <ConcludedText>Concluídas</ConcludedText>
          <TaskCounterContainer>
            <TaskCounterText>{concludedTasks}</TaskCounterText>
          </TaskCounterContainer>
        </TaskStatus>
        {data.length <= 0 ? (
          <NoTasksContainer>
            <ClipboardIcon size={56} name={'clipboard-pencil'} />
            <NoTaskText>
              Você ainda não tem tarefas cadastradas. {'\n'}Crie tarefas e
              organize seus itens a fazer.
            </NoTaskText>
          </NoTasksContainer>
        ) : (
          <GestureHandlerRootView>{draggableList}</GestureHandlerRootView>
        )}
      </TaskListView>
    </Container>
  );
};

export default Home;
