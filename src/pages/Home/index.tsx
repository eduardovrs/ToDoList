import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DraggableFlatList, {
  OpacityDecorator,
  ScaleDecorator,
  ShadowDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
} from './styles';
import RadioButton from '../../components/RadioButton';

interface IData {
  id: string;
  name: string;
}

const Home = () => {
  const [data, setData] = useState<IData[]>([]);
  const [state, setState] = useState(true);
  const [taskName, setTaskName] = useState('');
  const randomNumber = String(Math.floor(1000000 + Math.random() * 999999));
  const [asyncInfo, setAsyncInfo] = useState<IData[]>([]);
  const [finishedButton, setFinisehdButton] = useState(false);
  const dataKey = '@ToDoList:tasks';

  const styles = StyleSheet.create({});

  const getAsyncItems = useCallback(async () => {
    const result = await AsyncStorage.getItem(dataKey);
    const formatedResult = result ? JSON.parse(result) : [];
    if (!result) {
      return;
    }
    setAsyncInfo(formatedResult as unknown as IData[]);
  }, []);

  useEffect(() => {
    getAsyncItems();
  }, [getAsyncItems, state]);

  async function addNewTask() {
    // const verifyEventName = asyncInfo.some(item => {
    //   return item.name === taskName;
    // });

    // if (verifyEventName) {
    //   return Toast.show('Já existe um evento com esse nome.');
    // }

    // if (!taskName) {
    //   return Toast.show('Não é possível adicionar um evento sem nome.');
    // }
    const cardInfo = {
      id: randomNumber,
      name: taskName,
    };
    setData(prevState => [...prevState, cardInfo]);
    setTaskName('');

    try {
      const eventData = await AsyncStorage.getItem(dataKey);
      const curentData = eventData ? JSON.parse(eventData) : [];
      const formatedData = [...curentData, cardInfo];
      await AsyncStorage.setItem(dataKey, JSON.stringify(formatedData));
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  }

  const removeAsyncTask = useCallback(
    async (id: string) => {
      const response = await AsyncStorage.getItem(dataKey);
      const previousData = response ? JSON.parse(response) : [];

      const removeTask = previousData.filter((task: IData) => task.id !== id);
      await AsyncStorage.setItem(dataKey, JSON.stringify(removeTask));
      setData(removeTask);
      setState(!state);
    },
    [state],
  );

  const renderItem = useCallback(
    ({item, drag}) => {
      const {isActive} = useOnCellActiveAnimation();
      return (
        <ScaleDecorator>
          <OpacityDecorator activeOpacity={0.5}>
            <ShadowDecorator>
              <TaskRenderButton
                onLongPress={drag}
                delayLongPress={70}
                activeOpacity={1}
                style={[
                  styles.rowItem,
                  {
                    elevation: isActive ? 30 : 0,
                  },
                ]}>
                <RadioButton
                  isActive={finishedButton}
                  onChangeButton={() => {
                    setFinisehdButton(!finishedButton);
                  }}
                />
                <TaskNameText>{item.name}</TaskNameText>
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
    [removeAsyncTask, styles.rowItem, finishedButton],
  );

  const draggableList = useMemo(
    () => (
      <GestureHandlerRootView>
        <DraggableFlatList
          data={asyncInfo}
          keyExtractor={item => item.id}
          onDragEnd={({data}) => setData(data)}
          renderItem={renderItem}
        />
      </GestureHandlerRootView>
    ),
    [asyncInfo, renderItem],
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
          />
          <AddTaskButton
            onPress={() => {
              addNewTask();
            }}>
            <PlusIcon name={'pluscircleo'} size={25} />
          </AddTaskButton>
        </AddTaskContainer>
      </Header>
      <TaskListView>
        <TaskStatus
          style={{
            borderBottomWidth: 0.5,
            borderStyle: 'solid',
            borderColor: '#808080',
          }}>
          <CreatedText>Criadas</CreatedText>
          <ConcludedText>Concluídas</ConcludedText>
        </TaskStatus>
        <GestureHandlerRootView>{draggableList}</GestureHandlerRootView>
      </TaskListView>
    </Container>
  );
};

export default Home;
