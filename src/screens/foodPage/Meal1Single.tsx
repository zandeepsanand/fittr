/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {BASE_URL} from '@env';
import {useTheme, useTranslation} from '../../hooks';
import {Block, Button, Image, Input, Text} from '../../components/';
import {
  Platform,
  TouchableOpacity,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import Axios from 'axios';
import {FlatList} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {MealContext} from '../../hooks/useMeal';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import {log} from 'react-native-reanimated';
import _ from 'lodash'; // Import Lodash

type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};

const isAndroid = Platform.OS === 'android';
const Meal1Single = ({route, navigation}) => {
  const {data} = route.params;
  // console.log(data);
 
  const [initialGram, setInitialGram] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(initialGram);
  useEffect(() => {
    setSelectedWeight(initialGram);
  }, [initialGram]);

  const [selectedFood, setSelectedFood] = useState({});
  const [servingGrams, setServingGrams] = useState([]);
  const [servingDetails, setServingDetails] = useState([]);
  const [servingDetailsFull, setServingDetailsFull] = useState([]);
  const [id, setServingId] = useState([]);
  const [selectedDropDown, setSelectedDropDown] = useState([]);
  const [ironAmount, setIronAmount] = useState(0);
  const [proteinAmount, setProteinAmount] = useState(0);
  const [calorieAmount, setCalorieAmount] = useState(0);
  const [fatAmount, setFatAmount] = useState(0);
  const [carbAmount, setCarbAmount] = useState(0);
  const [fiberAmount, setFiberAmount] = useState(0);
  const [sugarAmount, setSugarAmount] = useState(0);
  const [sodiumAmount, setSodiumAmount] = useState(0);
  const [potassiumAmount, setPotassiumAmount] = useState(0);
  const [cholesterolAmount, setCholesterolAmount] = useState(0);
  const [saturatedFatAmount, setSaturatedFatAmount] = useState(0);
  const [transFatAmount, setTransFatAmount] = useState(0);
  const [monounsaturatedFatAmount, setMonounsaturatedFatAmount] = useState(0);
  const [polyunsaturatedFatAmount, setPolyunsaturatedFatAmount] = useState(0);
  const [vitaminAIUAmount, setVitaminAIUAmount] = useState(0);
  const [vitaminARAEAmount, setVitaminARAEAmount] = useState(0);
  const [vitaminCAmount, setVitaminCAmount] = useState(0);
  const [vitaminDAmount, setVitaminDAmount] = useState(0);
  const [calciumAmount, setCalciumAmount] = useState(0);
  const [multiplication, setMultiplication] = useState(1);
  const [totalCalorie, setTotalCalorie] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarb, setTotalCarb] = useState(0);
  const [totalSugar, setTotalSugar] = useState(0);
  const [totalFiber, setTotalFiber] = useState(0);
  const [totalSodium, setTotalSodium] = useState(0);
  const [totalPotassium, setTotalPotassium] = useState(0);
  const [totalCholesterol, setTotalCholesterol] = useState(0);
  const [totalSaturatedFat, setTotalSaturatedFat] = useState(0);
  const [totalTransFat, setTotalTransFat] = useState(0);
  const [totalMonounsaturatedFat, setTotalMonounsaturatedFat] = useState(0);
  const [totalPolyunsaturatedFat, setTotalPolyunsaturatedFat] = useState(0);
  const [totalVitaminAIU, setTotalVitaminAIU] = useState(0);
  const [totalVitaminARAE, setTotalVitaminARAE] = useState(0);
  const [totalVitaminC, setTotalVitaminC] = useState(0);
  const [totalVitaminD, setTotalVitaminD] = useState(0);
  const [totalCalcium, setTotalCalcium] = useState(0);
  const [totalIron, setTotalIron] = useState(0);
  const {mealType, meal_type} = route.params;
  const [foodItems, setFoodItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const handleEditButtonClick = (itemId) => {
    // console.log(item.details.food_id);

    // Set the ID of the item to be edited
    setEditItemId(itemId);
  };

  // console.log(mealType,"this is meal type id ");

  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const {
    breakfastItems,
    lunchItems,
    eveningSnackItems,
    dinnerItems,
    deleteItem,
    morningSnackItems,
    mealItems1,
    mealItems2,
    addDinnerItem ,
    addMealItem1
  } = useContext(MealContext);
  
  const {assets, colors, gradients, sizes, fonts, user} = useTheme();
  const [selectedValue, setSelectedValue] = useState(245);
  const [count, setCount] = useState(1);
  const [gramCount, setGramCount] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const handleValueChange = (value) => {
    setSelectedValue(value);
    setTextInputValue(`You selected ${value}`);
  };
  const [foodData, setFoodData] = useState();
  const {t} = useTranslation();
  const [isFullBlock, setIsFullBlock] = useState(false);
  const [breakfast, setBreakfast] = useState('');

  const handleViewToggle = () => {
    setIsFullBlock(!isFullBlock);
  };
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  // console.log('id', id);
  const debouncedHandleEdit = _.debounce(handleEdit, 500);

  const toggleEdit = (item) => {
    // This function will be called when the touch icon is pressed
    setIsEditMode(true); // Set isEditMode to true to hide the touch icon and show the block
    debouncedHandleEdit(item);
  };

  function handleEdit(item) {
    // console.log('dark', item);
    setIsEditMode(true);
    axios
      .get(`${BASE_URL}get_serving_desc_by_food_id/${item.id}`)
      .then((response) => {
        setServingDetailsFull(response.data.data.serving_desc);
        const servingNames = response.data.data.serving_desc.map(
          (serving) => serving.name,
        );
        const servingId = response.data.data.serving_desc.map(
          (serving) => serving.id,
        );
        const servingInitialGram = response.data.data.serving_desc.map(
          (serving) => serving.weight,
        );
        const servingGrams = response.data.data.serving_desc.map(
          (serving) => `${serving.name} (${serving.weight} g)`,
        );
        setServingId(servingId[0]);
        setServingDetails(servingNames);
        nutritionCalculation(item);
        setServingGrams(servingGrams);
        setInitialGram(item.details.selectedWeight);
        setSelectedDropDown(item.details.selectedDropDown);
      })
      .catch((error) => {
        console.error(error);
        setIsEditMode(false);
      });
  }

  function nutritionCalculation(item, selectedWeight1) {
    if (selectedWeight1 === undefined) {
      const selectedWeight1 = item.details.selectedWeight;
      const new_Weight = selectedWeight1;
      const new_calories = selectedWeight1 * (item.calories / 100);
      const new_fat = selectedWeight1 * (item.fat_in_g / 100);
      const new_protein = selectedWeight1 * (item.protein_in_g / 100);
      const new_carb = selectedWeight1 * (item.carb_in_g / 100);
      const new_sugar = selectedWeight1 * (item.sugar_in_g / 100);
      const new_fiber = selectedWeight1 * (item.fiber_in_g / 100);
      const new_sodium = selectedWeight1 * (item.sodium_in_mg / 100);
      const new_potassium = selectedWeight1 * (item.potassium_in_mg / 100);
      const new_cholestrol = selectedWeight1 * (item.cholestrol_in_mg / 100);
      const new_saturated_fat =
        selectedWeight1 * (item.saturated_fat_in_g / 100);
      const new_trans_fat = selectedWeight1 * (item.trans_fat_in_g / 100);
      const new_monounsaturated_fat =
        selectedWeight1 * (item.monounsaturated_fat_in_g / 100);
      const new_polyunsaturated_fat =
        selectedWeight1 * (item.polyunsaturated_fat_in_g / 100);
      const new_vitamin_a_iu = selectedWeight1 * (item.vitamin_a_iu / 100);
      const new_vitamin_a_rae_mg =
        selectedWeight1 * (item.vitamin_a_rae_mg / 100);
      const new_vitamin_c = selectedWeight1 * (item.vitamin_c_in_mg / 100);
      const new_vitamin_d = selectedWeight1 * (item.vitamin_d_mg / 100);
      const new_calcium = selectedWeight1 * (item.calcium_in_mg / 100);
      const new_iron = selectedWeight1 * (item.iron_in_mg / 100);

      setSelectedWeight(new_Weight);
      setProteinAmount(new_protein);
      setCalorieAmount(new_calories);
      setIronAmount(new_iron);
      setFatAmount(new_fat);
      setCarbAmount(new_carb);
      setSugarAmount(new_sugar);
      setFiberAmount(new_fiber);
      setSodiumAmount(new_sodium);
      setPotassiumAmount(new_potassium);
      setCholesterolAmount(new_cholestrol);
      setSaturatedFatAmount(new_saturated_fat);
      setTransFatAmount(new_trans_fat);
      setMonounsaturatedFatAmount(new_monounsaturated_fat);
      setPolyunsaturatedFatAmount(new_polyunsaturated_fat);
      setVitaminAIUAmount(new_vitamin_a_iu);
      setVitaminARAEAmount(new_vitamin_a_rae_mg);
      setVitaminCAmount(new_vitamin_c);
      setVitaminDAmount(new_vitamin_d);
      setCalciumAmount(new_calcium);
    } else {
      // if the dropdown menu is selected the calculations will be done
      const new_Weight = selectedWeight1;
      const new_calories = selectedWeight1 * (item.calories / 100);
      const new_fat = selectedWeight1 * (item.fat_in_g / 100);
      const new_protein = selectedWeight1 * (item.protein_in_g / 100);
      const new_carb = selectedWeight1 * (item.carb_in_g / 100);
      const new_sugar = selectedWeight1 * (item.sugar_in_g / 100);
      const new_fiber = selectedWeight1 * (item.fiber_in_g / 100);
      const new_sodium = selectedWeight1 * (item.sodium_in_mg / 100);
      const new_potassium = selectedWeight1 * (item.potassium_in_mg / 100);
      const new_cholestrol = selectedWeight1 * (item.cholestrol_in_mg / 100);
      const new_saturated_fat =
        selectedWeight1 * (item.saturated_fat_in_g / 100);
      const new_trans_fat = selectedWeight1 * (item.trans_fat_in_g / 100);
      const new_monounsaturated_fat =
        selectedWeight1 * (item.monounsaturated_fat_in_g / 100);
      const new_polyunsaturated_fat =
        selectedWeight1 * (item.polyunsaturated_fat_in_g / 100);
      const new_vitamin_a_iu = selectedWeight1 * (item.vitamin_a_iu / 100);
      const new_vitamin_a_rae_mg =
        selectedWeight1 * (item.vitamin_a_rae_mg / 100);
      const new_vitamin_c = selectedWeight1 * (item.vitamin_c_in_mg / 100);
      const new_vitamin_d = selectedWeight1 * (item.vitamin_d_mg / 100);
      const new_calcium = selectedWeight1 * (item.calcium_in_mg / 100);
      const new_iron = selectedWeight1 * (item.iron_in_mg / 100);

     
      setSelectedWeight(new_Weight);
      setProteinAmount(new_protein);
      setCalorieAmount(new_calories);
      setIronAmount(new_iron);
      setFatAmount(new_fat);
      setCarbAmount(new_carb);
      setSugarAmount(new_sugar);
      setFiberAmount(new_fiber);
      setSodiumAmount(new_sodium);
      setPotassiumAmount(new_potassium);
      setCholesterolAmount(new_cholestrol);
      setSaturatedFatAmount(new_saturated_fat);
      setTransFatAmount(new_trans_fat);
      setMonounsaturatedFatAmount(new_monounsaturated_fat);
      setPolyunsaturatedFatAmount(new_polyunsaturated_fat);
      setVitaminAIUAmount(new_vitamin_a_iu);
      setVitaminARAEAmount(new_vitamin_a_rae_mg);
      setVitaminCAmount(new_vitamin_c);
      setVitaminDAmount(new_vitamin_d);
      setCalciumAmount(new_calcium);
    }
  }
  const handleGramChange = (value) => {
    setMultiplication(value);
  };

  useEffect(() => {
  
    if (multiplication) {
      setTotalCalorie((multiplication * calorieAmount).toFixed(2));
      setTotalProtein((multiplication * proteinAmount).toFixed(2));
      setTotalFat((multiplication * fatAmount).toFixed(2));
      setTotalCarb((multiplication * carbAmount).toFixed(2));
      setTotalSugar((multiplication * sugarAmount).toFixed(2));
      setTotalFiber((multiplication * fiberAmount).toFixed(2));
      setTotalSodium((multiplication * sodiumAmount).toFixed(2));
      setTotalPotassium((multiplication * potassiumAmount).toFixed(2));
      setTotalCholesterol((multiplication * cholesterolAmount).toFixed(2));
      setTotalSaturatedFat((multiplication * saturatedFatAmount).toFixed(2));
      setTotalTransFat((multiplication * transFatAmount).toFixed(2));
      setTotalMonounsaturatedFat(
        (multiplication * monounsaturatedFatAmount).toFixed(2),
      );
      setTotalPolyunsaturatedFat(
        (multiplication * polyunsaturatedFatAmount).toFixed(2),
      );
      setTotalVitaminAIU((multiplication * vitaminAIUAmount).toFixed(2));
      setTotalVitaminARAE((multiplication * vitaminARAEAmount).toFixed(2));
      setTotalVitaminC((multiplication * vitaminCAmount).toFixed(2));
      setTotalVitaminD((multiplication * vitaminDAmount).toFixed(2));
      setTotalCalcium((multiplication * calciumAmount).toFixed(2));
      setTotalIron((multiplication * ironAmount).toFixed(2));
    }
  }, [
    multiplication,
    calorieAmount,
    proteinAmount,
    fatAmount,
    carbAmount,
    sugarAmount,
    fiberAmount,
    sodiumAmount,
    potassiumAmount,
    cholesterolAmount,
    saturatedFatAmount,
    transFatAmount,
    monounsaturatedFatAmount,
    polyunsaturatedFatAmount,
    vitaminAIUAmount,
    vitaminARAEAmount,
    vitaminCAmount,
    vitaminDAmount,
    calciumAmount,
    ironAmount,
  ]);
  const mealDetails = {
    totalCalorie,
    totalProtein,
    totalFat,
    totalCarb,
    totalSugar,
    totalFiber,
    totalSodium,
    totalPotassium,
    totalCholesterol,
    totalSaturatedFat,
    totalTransFat,
    totalMonounsaturatedFat,
    totalPolyunsaturatedFat,
    totalVitaminAIU,
    totalVitaminARAE,
    totalVitaminC,
    totalVitaminD,
    totalCalcium,
    totalIron,
    multiplication,
    selectedDropDown,
    selectedWeight,
    id,
    mealType,
    meal_type,
  };
  const handleAddFood = async (item) => {
    setIsEditMode(false);
    switch (mealType) {
      case 'meal1':
        try {
          await addMealItem1(item, mealDetails);
          console.log('Meal! item added successfully');
          // Handle any post-addition logic or navigation here
        } catch (error) {
          console.error('Error adding breakfast item:', error);
          // Handle the error, if necessary
        }
        break;
      default:
        break;
    }
  };
  const handleDelete = (itemIndex: number, mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        const newBreakfastItems = [...breakfastItems];
        newBreakfastItems.splice(itemIndex, 1);
        deleteItem(newBreakfastItems, mealType);
        break;
      case 'morningSnackItems':
        const newMorningSnackItems = [...morningSnackItems];
        newMorningSnackItems.splice(itemIndex, 1);
        deleteItem(newMorningSnackItems, mealType);
        break;
      case 'lunch':
        // console.log('lunchhhh');

        const newLunchItems = [...lunchItems];
        newLunchItems.splice(itemIndex, 1);
        deleteItem(newLunchItems, mealType);
        break;
      case 'evening':
        // console.log('lunchhhh');

        const neweveningItems = [...eveningSnackItems];
        neweveningItems.splice(itemIndex, 1);
        deleteItem(neweveningItems, mealType);
        break;
      case 'dinner':
        const newDinnerItems = [...dinnerItems];
        newDinnerItems.splice(itemIndex, 1);
        deleteItem(newDinnerItems, mealType);
        break;
      case 'meal1':
        const newMealItem1 = [...mealItems1];
        newMealItem1.splice(itemIndex, 1);
        deleteItem(newMealItem1, mealType);
        break;
      case 'meal2':
        const newMealItem2 = [...mealItems2];
        newMealItem2.splice(itemIndex, 1);
        deleteItem(newMealItem2, mealType);
        break;
      default:
        break;
    }
  };

  const [expanded, setExpanded] = useState(false);
  const [expandedEdit, setExpandedEdit] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };
  const handleToggleDetails = (itemId) => {
    setExpanded(!expanded);
    setSelectedItemId(itemId);
  };

  const totalEveningCalorie = mealItems1.reduce(
    (acc, item) => acc + parseFloat(item.details.totalCalorie),
    0,
  );
  const totalMeal1Calories = totalEveningCalorie.toFixed(2);

  return (
    <Block safe scroll>
      <Block
        center
        flex={0.3}
        align="center"
        style={{
          backgroundColor: '#3cf29d',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}>
        {mealType === 'breakfast' ? (
          <Text bold padding={10}>
            {' '}
            Breakfast
          </Text>
        ) : (
          <Text bold padding={10}>
            {' '}
            Meal 1
          </Text>
        )}

        <CircularProgress
          value={totalMeal1Calories}
          radius={55}
          duration={2000}
          activeStrokeWidth={12}
          progressValueColor={'#ffff'}
          activeStrokeColor="#baabf9"
          maxValue={data.calories * 0.12}
          circleBackgroundColor={'#353353'}
          title={
            // totalCaloriesOfAllFoods >= data.calories ? 'REACHED 🔥' : 'KCAL LEFT 🔥'
            'KCAL'
          }
          titleColor={'white'}
          titleStyle={{fontWeight: 'bold', fontSize: 15}}
        />
      </Block>
      <Block color={colors.card} flex={0} paddingHorizontal={sizes.s}></Block>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('searchfood', {
                mealType: 'meal1',
                meal_type,
              })
            }>
            <Block
              card
              color={'#94a9fe'}
              flex={0}
              paddingHorizontal={10}
              marginHorizontal={20}
              marginTop={10}
              style={{
                width: 200,
                alignSelf: 'center',
                backgroundColor: '#94a9fe',
              }}>
              <Text center white semibold>
                {' '}
                ADD MORE FOODS{' '}
              </Text>
            </Block>
          </TouchableOpacity>
          {mealItems1.map((item, index) => (
            <Block>
              <Block
                radius={sizes.sm}
                shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                marginTop={sizes.s}
                marginHorizontal={0}
                card
                color="#eaefff"
                flex={0.5}>
                <Block row align="center">
                  <Block flex={0}>
                    <Image
                      source={{
                        uri: `${item.image}`,
                      }}
                      style={{
                        width: sizes.xl,
                        height: sizes.xl,
                      }}
                      marginLeft={sizes.s}
                    />
                  </Block>
                  <Block flex={3} style={{alignSelf: 'center'}}>
                    <Text p black semibold center padding={10}>
                      {item.food_name} ({item.details.totalCalorie}kcal)
                    </Text>
                    <Block row flex={0} align="center" justify="center">
                      <Block
                        flex={0}
                        height={1}
                        width="50%"
                        end={[1, 0]}
                        start={[0, 1]}
                        gradient={gradients.divider}
                      />
                      <Text center marginHorizontal={sizes.s}></Text>
                      <Block
                        flex={0}
                        height={1}
                        width="50%"
                        end={[0, 1]}
                        start={[1, 0]}
                        gradient={gradients.divider}
                      />
                    </Block>
                  </Block>

                  <Block flex={0}>
                    <TouchableOpacity
                      onPress={() => handleDelete(index, 'meal1')}>
                      <Image
                        source={require('../../assets/icons/close1.png')}
                        color={'#fa9579'}
                        style={
                          (styles.data,
                          {width: 20, height: 20, alignContent: 'center'})
                        }
                        //  marginTop={sizes.s}
                      />
                    </TouchableOpacity>
                  </Block>
                </Block>
                <Block margin={0}>
                  <Block margin={0} paddingTop={10} paddingLeft={10}>
                    {isEditMode && editItemId === item.details.id ? (
                      <Block
                        row
                        style={{alignSelf: 'center'}}
                        paddingTop={20}
                        flex={0}>
                        <Input
                          marginBottom={sizes.s}
                          placeholder={item.details.multiplication.toString()} // Convert to string in case it's a number
                          keyboardType="numeric"
                          maxLength={3}
                          style={{
                            height: 50,
                            width: 60,
                            backgroundColor: 'white',
                          }}
                          onChangeText={(value) => {
                            {
                              // setCount(value);
                              handleGramChange(value);
                            }
                          }}
                        />

                        <Block
                          style={{
                            height: 50,
                            // width: 300,
                            backgroundColor: 'white',
                            borderRadius: 20,
                            marginLeft: 10,
                          }}>
                          <SelectDropdown
                            // defaultValue={item.details.selectedWeight}
                            dropdownStyle={{borderRadius: 20}}
                            buttonStyle={{
                              height: 50,
                              width: 200,
                              backgroundColor: 'white',
                              borderRadius: 20,
                              marginLeft: 10,
                            }}
                            data={servingGrams}
                            onSelect={(selectedItem, index) => {
                              // console.log(servingGrams, 'ok bie ');
                              const item1 = servingGrams.find((item1) =>
                                item1.includes(selectedItem),
                              );

                              const selectedWeight1 = item1
                                ? item1
                                    .split(' ')
                                    [item1.split(' ').length - 2].replace(
                                      '(',
                                      '',
                                    )
                                : null;
                              // console.log('selected weight is ', selectedWeight1);
                              setSelectedWeight(selectedWeight1);
                              nutritionCalculation(item, selectedWeight1);

                              // console.log('selected weight is2', selectedWeight);

                              // Get the ID of the selected item
                              // console.log('this is serving detrails', servingDetailsFull);
                              const ids = servingDetailsFull.find(
                                (ids) =>
                                  ids.name === selectedItem.split(' (')[0],
                              );
                              // console.log('dark', ids);
                              if (ids) {
                                setServingId(ids.id);
                              }
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              // console.log(selectedItem);
                              setSelectedDropDown(selectedItem);
                              // console.log('hallalalalalalla', selectedDropDown);
                              // text represented after item is selected
                              // if data array is an array of objects then return selectedItem.property to render after item is selected
                              return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                              // text represented for each item in dropdown
                              // if data array is an array of objects then return item.property to represent item in dropdown
                              return item;
                            }}
                            defaultButtonText={item.details.selectedDropDown}
                          />
                        </Block>
                        <Block
                          card
                          color={'#ffff'}
                          flex={0}
                          // paddingHorizontal={10}
                          marginLeft={20}
                          // marginTop={-10}
                          style={{
                            // width: 200,
                            alignSelf: 'flex-end',
                            backgroundColor: '#94a9fe',
                            position: 'relative',
                            top: -12,
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              // setSelectedFood(item.food_name);

                              handleAddFood(item);
                            }}>
                            <Text bold>Update</Text>
                          </TouchableOpacity>
                        </Block>
                      </Block>
                    ) : (
                      <Block>
                        <Block style={styles.row} flex={0}>
                          <Block flex={0}>
                            <Text paddingRight={10} semibold>
                              Quantity
                            </Text>
                          </Block>
                          <Block flex={3}>
                            <Text center semibold>
                              Selected serving size
                            </Text>
                          </Block>
                          <Block flex={0} width={40}></Block>
                        </Block>
                        <Block style={styles.row} flex={0} paddingTop={10}>
                          <Block flex={0} width={65}>
                            <Text paddingRight={10} center>
                              {item.details.multiplication}
                            </Text>
                          </Block>

                          <Block flex={3}>
                            <Text center>{item.details.selectedDropDown}</Text>
                          </Block>
                          <TouchableOpacity
                            key={item.details.id}
                            onPress={() => {
                              debouncedHandleEdit(item);
                              toggleEdit(item);
                              handleEditButtonClick(item.details.id);
                            }}>
                            <Block flex={0}>
                              <Image
                                marginLeft={5}
                                marginRight={10}
                                marginTop={1}
                                source={require('../../assets/icons/edit1.png')}
                                //  color={'#fa9579'}
                                style={
                                  (styles.data, {width: 25, height: 25})
                                }></Image>
                            </Block>
                          </TouchableOpacity>
                        </Block>
                      </Block>
                    )}

                    <Block>
                      <TouchableOpacity
                        onPress={() => {
                          handleToggleDetails(item.details.id);
                          console.log(item.details, 'sandeep idd');
                        }}>
                        <Block padding={10} align="center">
                          {expanded &&
                          selectedItemId === item.details.id ? (
                            <Text>Hide</Text>
                          ) : (
                            <Text>Full Details </Text>
                          )}
                        </Block>
                      </TouchableOpacity>
                      {expanded && selectedItemId === item.details.id && (
                        <Block flex={2} style={{height: 1000}}>
                          <Block
                            card
                            row
                            flex={3}
                            padding={sizes.s}
                            paddingTop={sizes.m}
                            marginBottom={sizes.m}
                            style={styles.container5}>
                            <Block>
                              <Text
                                p
                                bold
                                center
                                color={'green'}
                                paddingBottom={sizes.s}>
                                Nutrition
                              </Text>
                              <Block style={styles.container}>
                                {/* Header */}
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.header} center semibold>
                                    Sugar :
                                  </Text>
                                  <Text style={styles.header} center>
                                    {item.details.totalSugar}
                                  </Text>
                                </Block>

                                {/* Data Rows */}
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.header} center semibold>
                                    Fiber :
                                  </Text>
                                  <Text style={styles.header} center>
                                    {item.details.totalFiber}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.header} center semibold>
                                    Sodium :
                                  </Text>
                                  <Text style={styles.header} center>
                                    {item.details.totalSodium}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.header} center semibold>
                                    Potassium :
                                  </Text>
                                  <Text style={styles.header} center>
                                    {item.details.totalPotassium}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.header} center semibold>
                                    Cholesterol :
                                  </Text>
                                  <Text style={styles.header} center>
                                    {item.details.totalCholesterol}
                                  </Text>
                                </Block>

                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.data} center semibold>
                                    Saturated Fat :
                                  </Text>
                                  <Text style={styles.data} center>
                                    {item.details.totalSaturatedFat}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.data} center semibold>
                                    TransFat :
                                  </Text>
                                  <Text style={styles.data} center>
                                    {item.details.totalTransFat}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.data} center semibold>
                                    Monounsaturated Fat :
                                  </Text>
                                  <Text style={styles.data} center>
                                    {item.details.totalMonounsaturatedFat}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.data} center semibold>
                                    Polyunsaturated Fat :
                                  </Text>
                                  <Text style={styles.data} center>
                                    {item.details.totalPolyunsaturatedFat}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.data} center semibold>
                                    Vitamin A :
                                  </Text>
                                  <Text style={styles.data} center>
                                    {item.details.totalVitaminAIU}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.data} center semibold>
                                    Vitamin A Retinol Activity Equivalents (RAE)
                                    :
                                  </Text>
                                  <Text style={styles.data} center>
                                    {item.details.totalVitaminARAE}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.data} center semibold>
                                    Vitamin C :
                                  </Text>
                                  <Text style={styles.data} center>
                                    {item.details.totalVitaminC}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.data} center semibold>
                                    Vitamin D :
                                  </Text>
                                  <Text style={styles.data} center>
                                    {item.details.totalVitaminD}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.data} center semibold>
                                    Calcium :
                                  </Text>
                                  <Text style={styles.data} center>
                                    {item.details.totalCalcium}
                                  </Text>
                                </Block>
                                <Block
                                  style={styles.row}
                                  flex={0}
                                  card
                                  margin={1}>
                                  <Text style={styles.data} center semibold>
                                    Iron :
                                  </Text>
                                  <Text style={styles.data} center>
                                    {item.details.totalIron}
                                  </Text>
                                </Block>
                              </Block>
                            </Block>
                          </Block>
                        </Block>
                      )}
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          ))}
        </Block>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#22faa0',

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {backgroundColor: '', flexDirection: 'row', flex: 1},
  cover: {padding: 30, width: '50%', height: '10%'},
  text: {padding: 30},
  container: {
    flex: 4,
    flexDirection: 'row', // set elements horizontally, try column.
    padding: 10,
  },
  powderblue: {
    width: 60,
    height: 60,
    backgroundColor: 'powderblue',
  },
  skyblue: {
    width: 60,
    height: 60,
    backgroundColor: 'skyblue',
  },
  steelblue: {
    width: 60,
    height: 60,
    backgroundColor: 'steelblue',
  },
  container: {
    flex: 3,
    // backgroundColor: '#f9f6ee',
    padding: 10,
  },
  mainCardView: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff',
    borderRadius: 15,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 0,
    backgroundColor: 'transparent',
    // borderColor: "green",
    // borderWidth: 1,
    // borderStyle: "solid",
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    alignSelf: 'center',
    minWidth: 60,
  },
  data: {
    flex: 2,
    fontSize: 16,
    padding: 5,
    minWidth: 60,
    // paddingBottom: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  item: {
    flexDirection: 'row',
  },
});

export default Meal1Single;
