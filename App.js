import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeItem } from './ItemsActions';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Keyboard, SafeAreaView, ScrollView, TouchableWithoutFeedback, Button, Image, FlatList, Alert, Dimensions, Slider, Picker } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Marker } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';

const data = [
  {
    groceryItem: 'Apple',
    price: '$2.99',
    category: 'Produce',
    src: require('./assets/apples.jpg'),
    id: Math.floor(Math.random() * 100) + 1
  },
  {
    groceryItem: 'Pear',
    price: '$2.49',
    category: 'Produce',
    src: require('./assets/pear.jpg'),
    id: Math.floor(Math.random() * 100) + 1
  },
  {
    groceryItem: 'Banana',
    price: '$0.99',
    category: 'Produce',
    src: require('./assets/banana.jpg'),
    id: Math.floor(Math.random() * 100) + 1
  },
  {
    groceryItem: 'Carrot',
    price: '$2.49',
    category: 'Produce',
    src: require('./assets/carrot.jpg'),
    id: Math.floor(Math.random() * 100) + 1
  },
  {
    groceryItem: 'Lettuce',
    price: '$3.99',
    category: 'Produce',
    src: require('./assets/lettuce.jpg'),
    id: Math.floor(Math.random() * 100) + 1
  },
  {
    groceryItem: 'Milk',
    price: '$2.99',
    category: 'Dairy',
    src: require('./assets/milk.jpg'),
    id: Math.floor(Math.random() * 100) + 1
  }
];

function UselessTextInput(props) {
  return (
    <TextInput
      {...props}
      style={{ height: 30, borderWidth: 1, padding: 6, paddingTop: 10, margin: 5, color: 'midnightblue', borderColor: '#A5C9FA', backgroundColor: "oldlace", }}
      editable
      maxLength={30}
    />
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "yellowgreen" }}>
      <Text>{'\n'}</Text>
      <Image source={require('./assets/logo.gif')} style={{ width: 130, height: 200 }} />
      <Text>{'\n'}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('All Items')}
        style={styles.homeButton}>
        <Text style={styles.homeButtonText}>Check Out Our{'\n'}Available Items!</Text>
      </TouchableOpacity>
    </View>
  );
}

function ItemsScreen({ navigation }) {

  const ItemView = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Image
            source={item.src}
            style={styles.itemImage}
          />
        </View>
        <Text style={styles.itemTextStyle} onPress={() => getItem(item)}>{item.groceryItem}</Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View style={styles.fList} />
    );
  };

  const getItem = (item) => {
    Alert.alert('Item: ' + item.groceryItem + '\n' + 'Price: ' + item.price + '\n' + 'Category: ' + item.category + '\n' + 'Item #: ' + item.id + '\n')
  };


  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image
        source={{ uri: item.src }}
        style={{ width: 40, height: 40 }}
      />
      <Text>{item.groceryItem}</Text>
    </View>
  );

  return (
    <View style={styles.container2}>
      <Text style={styles.heading11}>JIV'S GROCERIES</Text>
      <Text style={styles.heading2}>Groceries</Text>
      <FlatList
        data={data}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        keyExtractor={item => item.id} />
    </View>
  );
}

function SearchScreen({ navigation }) {
  const [nameInput, setNameInput] = useState('');
  const [itemNoInput, setItemNoInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');

  const [checked, setChecked] = React.useState(false);

  const [sliderValue, setSliderValue] = useState(15.49);

  const [max, setMax] = useState(49.99);
  const [min, setMin] = useState(0.99);

  const [itemsList, setItemsList] = useState(data);


  const searchItem = () => {
    navigation.navigate('SearchScreen', { post: JSON.stringify({ text: nameInput, }) });
    if (nameInput == "" || itemNoInput == "") {
      Alert.alert("At least an input is empty.");
    } else if (itemsList.filter(item => item.groceryItem == nameInput)) {
      Alert.alert("Item " + nameInput + " has been found.");
    }
  };

  // const DismissKeyboard = ({ children }) => (
  //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  //     {children}
  //   </TouchableWithoutFeedback>
  // );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "yellowgreen", paddingTop: 70 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={'always'}>
        <Text style={styles.heading1}>JIV'S GROCERIES</Text>
        <Text style={styles.heading2}>Advanced Search</Text>
        <View style={{
          flex: 0,
          flexDirection: 'column',
          justifyContent: 'space-between', width: 250, height: 450, backgroundColor: 'olivedrab', padding: 20,
        }}>

            <Text style={styles.searchText}>Name:</Text>
            <UselessTextInput
              multiline
              numberOfLines={4}
              value={nameInput}
              onChangeText={itemText => setNameInput(itemText)}
            />
            <Text style={styles.searchText}>Item No.:</Text>
            <UselessTextInput
              keyboardType='numeric'
              multiline
              numberOfLines={4}
              value={itemNoInput}
              onChangeText={itemText => setItemNoInput(itemText)}
            />
            <Text style={styles.searchText3}>Category:</Text>
            <View style={styles.containerPicker}>
              <Picker style={styles.pickerStyle}
                selectedValue={categoryInput}
                onValueChange={(itemValue) =>
                  setCategoryInput(itemValue)}
              >
                <Picker.Item label="Dairy" value="dairy" />
                <Picker.Item label="Produce" value="produce" />
                <Picker.Item label="Meat & Seafood" value="meats" />
                <Picker.Item label="Beer & Wine" value="bw" />
                <Picker.Item label="Condiments" value="con" />
                <Picker.Item label="Candy & Snacks" value="cs" />
                <Picker.Item label="Baking" value="bake" />
              </Picker>
            </View>

          <View />
          <Text style={styles.searchText}>
            Price : $ {sliderValue}
          </Text>

          <Slider
            maximumValue={max}
            minimumValue={min}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#ffffff"
            step={0.50}
            value={sliderValue}
            onValueChange={
              (sliderValue) => setSliderValue(Math.round(sliderValue * 100) / 100)
            }
          />
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "oldlace", height: 35, width: 10 }}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                uncheckedColor="white"
                color="red"
              />
            </View>
            <Text style={styles.searchText2}>Show items available</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={searchItem}
            style={styles.button2}>
            <Text style={styles.textButton}>Search</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

function LocateScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: "yellowgreen", paddingTop: 90 }}>
      <Text style={styles.heading1}>JIV'S GROCERIES</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Map')}>
        <Text style={styles.heading2}>Find Us On The Map!</Text>
      </TouchableOpacity>
    </View>
  );
}

function MapScreen({ navigation }) {
  const [myRegion, setRegion] = useState({
    latitude: 42.46096759950416,
    longitude: -76.50325598116764,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }
  );
  const [markers, setMarkers] = useState([{
    latlng: {
      latitude: 42.49196502655446,
      longitude: -76.52158509097018,
    },
    title: "JIV'S GROCERIES",
    description: "The Best Groceries Around!",
    pinColor: 'green',
  }]
  );

  const onRegionChange = (region) => {
    setRegion(region);
  }
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}
        region={myRegion}
        onRegionChange={onRegionChange}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor}
          />
        ))}
      </MapView>
    </View>
  );
}

function ListScreen({ navigation }) {

  const _onPressButton = (key, item) => {
    Alert.alert('You clicked ' + item + '\n' + 'with key ' + key);
    props.removeItem(key);
  }


  return (
    <View style={styles.container2}>
      <Text style={styles.heading1}>JIV'S GROCERIES</Text>
      <Text style={styles.heading2}>List Screen</Text>
    </View>
  );
}

const LocateStack = createStackNavigator();

function LocateStackScreen() {
  return (
    <LocateStack.Navigator>
      <LocateStack.Screen name="Locate" component={LocateScreen} options={{ headerShown: false }} />
      <LocateStack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
    </LocateStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App(props) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-cart'
                : 'ios-cart'
            } else if (route.name === 'All Items') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Search') {
              iconName = focused ? 'ios-search' : 'ios-search'
            } else if (route.name === 'Locate') {
              iconName = focused ? 'ios-navigate' : 'ios-navigate'
            } else if (route.name === 'My Lists') {
              iconName = focused ? 'ios-checkbox' : 'ios-checkbox-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#db86a3',
          inactiveTintColor: '#6b1331',
          activeBackgroundColor: 'pink',
          inactiveBackgroundColor: 'pink'
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="All Items" component={ItemsScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Locate" component={LocateStackScreen} />
        <Tab.Screen name="My Lists" component={ListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightcyan'
  },
  container2: {
    backgroundColor: 'yellowgreen',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 90,
    flex: 1
  },
  heading2: {
    fontSize: 28,
    color: "lightyellow",
    fontFamily: "Cochin",
    marginBottom: 10,
    alignItems: 'center',
  },
  heading1: {
    fontSize: 30,
    color: "papayawhip",
    fontFamily: "Cochin",
    marginBottom: 10,
    borderRadius: 10,
    padding: 12,
    borderWidth: 3.5,
    borderColor: "papayawhip",
    paddingLeft: 30
  },
  searchText: {
    fontSize: 20,
    color: "lightpink",
    fontFamily: "Cochin",
  },
  searchText3: {
    fontSize: 20,
    color: "lightpink",
    fontFamily: "Cochin",
    marginBottom: 50,
  },
  searchText2: {
    fontSize: 15,
    color: "lightpink",
    fontFamily: "Cochin",
    marginLeft: 40,
    paddingTop: 10

  },
  button2: {
    textAlign: "center",
    marginTop: 20,
    paddingTop: 15,
    // borderRadius: 10,
    // borderWidth: 1,
    backgroundColor: 'pink',
    padding: 12,
    // borderWidth: 0.5,
    borderRadius: (65 / 2),
    width: 95,
    height: 45,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },

  },
  textButton: {
    textAlign: 'center',
    fontSize: 12,
  },
  homeButton: {
    textAlign: "center",
    marginTop: 20,
    paddingTop: 15,
    backgroundColor: 'pink',
    padding: 12,
    borderRadius: (65 / 2),
    width: 150,
    height: 60,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },

  },
  homeButtonText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: "Cochin",
    color: '#6b1331',
  },
  listItem: {
    backgroundColor: 'lightyellow',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
  },
  item: {
    padding: 10,
    color: '#F95904',
    fontSize: 17,
    height: 35,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
  fList: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C3DCFF'

  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemImage: {
    height: 40,
    width: 40,
    justifyContent: 'flex-end',
    borderRadius: 150 / 2,
  },
  itemTextStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: "Cochin",
    color: '#333333',
    paddingTop: 10,
    paddingRight: 40
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pickerStyle: {
    height: 50,
    width: "80%",
    color: '#344953',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 90,
    fontSize: 20
  },
  containerPicker: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// const mapStateToProps = (state) => {
//   const { items } = state
//   return { items }
// };

// const mapDispatchToProps = dispatch => (
//   bindActionCreators({
//     removeItem,
//   }, dispatch)
// );

// export default connect(mapStateToProps, mapDispatchToProps)(App);