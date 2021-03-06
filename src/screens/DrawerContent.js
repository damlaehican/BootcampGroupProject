import React, {useContext, useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';
import {Gravatar, GravatarApi} from 'react-native-gravatar';
import auth from '@react-native-firebase/auth';
import {Moon, Sun} from '../components/SVGR-Components';

const DrawerContent = (props) => {
  const user = auth().currentUser;
  const {colors} = useTheme();
  const styles = customStyles(colors);
  const {state, dispatch} = useContext(Context);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    dispatch({type: 'SET_THEME'});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Gravatar
          options={{
            email: user.email,
            parameters: {size: '200', d: 'mm'},
            secure: true,
          }}
          style={styles.roundedProfileImage}
        />
        <Text style={styles.userName}>UserName</Text>
      </View>
      <View style={styles.drawerListContainer}>
        <DrawerItemList {...props} />
        <View style={styles.switchContainer}>
          <DrawerItem
            label="Theme"
            onPress={toggleSwitch}
            icon={() =>
              isEnabled ? (
                <Moon stroke="gray" width={25} height={25} />
              ) : (
                <Sun stroke="gray" width={25} height={25} />
              )
            }
          />
          <DrawerItem
            label={() => (
              <Switch
                trackColor={{false: 'lightgray', true: colors.text}}
                thumbColor={colors.primary}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export {DrawerContent};

const customStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingVertical: 20,
      backgroundColor: colors.primary,
    },
    drawerListContainer: {
      marginVertical: 20,
      flex: 4,
    },
    roundedProfileImage: {
      width: 80,
      height: 80,
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 50,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userName: {
      fontSize: 18,
      fontWeight: '500',
      color: '#fff',
      marginTop: 10,
    },
  });
