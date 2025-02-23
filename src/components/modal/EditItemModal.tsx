import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import CustomText from '@components/global/CustomText';
import Icon from '@components/ui/Icon';
import {Colors} from '@unistyles/Constants';
import HorizontalLine from '@components/ui/HorizontalLine';
import ScalePress from '@components/ui/ScalePress';
import AnimatedNumbers from 'react-native-animated-numbers';
import {useAppDispatch} from '@states/reduxHook';
import {
  addCustomizableItem,
  updateCustomizableItem,
} from '@states/reducers/cartSlice';

function transformSelectedOptions(
  selectedOption: any,
  customizationOptions: any,
) {
  return Object.entries(selectedOption).map(([type, index]) => {
    const customization = customizationOptions?.find(
      (option: any) => option.type === type,
    );
    if (!customization || !customization?.options[index as number]) {
      throw new Error(`Invalid customization type or inder for ${type}`);
    }
    return {
      type,
      selectedOption: customization?.options[index as number],
    };
  });
}

const EditItemModal: FC<{
  item: any;
  restaurant: any;

  onClose: () => void;
  cus: any;
}> = ({item, restaurant, onClose, cus}) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    quantity: cus?.quantity,
    price: cus?.cartPrice,
    selectedOption: {} as Record<string, number>,
  });

  useEffect(() => {
    const defaultSelectedOption: Record<string, number> = {};
    let initialPrice = item?.price || 0;

    cus?.customizationOptions?.forEach((cusOption: any) => {
      const itemCustomization = item?.customizationOptions?.find(
        (option: any) => option.type === cusOption?.type,
      );

      if (itemCustomization) {
        const selectedIndex = itemCustomization?.options?.findIndex(
          (option: any) => option?.name == cusOption?.selectedOption?.name,
        );

        if (selectedIndex !== -1) {
          defaultSelectedOption[cusOption?.type] = selectedIndex;
        }
      }
    });

    setData(prevData => ({
      ...prevData,
      selectedOption: defaultSelectedOption,
    }));
  }, [item]);

  const calculatePrice = (
    quantity: number,
    selectedOption: Record<string, number>,
  ) => {
    const basePrice = item?.price || 0;
    let customizationPrice = 0;

    Object.keys(selectedOption).forEach(type => {
      const optionIndex = selectedOption[type];
      const optionPrice =
        item?.customizationOptions?.find((c: any) => c.type === type)
          ?.options?.[optionIndex]?.price || 0;

      customizationPrice += optionPrice;
    });

    return (basePrice + customizationPrice) * quantity;
  };

  const selectedOptionHandler = (type: string, index: number) => {
    setData(prevData => {
      const updatedSelectedOption = {...prevData.selectedOption, [type]: index};

      const updatedPrice = calculatePrice(
        prevData?.quantity,
        updatedSelectedOption,
      );

      return {
        ...prevData,
        selectedOption: updatedSelectedOption,
        price: updatedPrice,
      };
    });
  };

  const removeCartHandler = () => {
    if (data?.quantity > 1) {
      setData(prevData => ({
        ...prevData,
        quantity: prevData?.quantity - 1,
        price: calculatePrice(prevData?.quantity - 1, prevData?.selectedOption),
      }));
    } else {
      onClose();
    }
  };

  const addCartHeader = () => {
    setData(prevData => ({
      ...prevData,
      quantity: prevData?.quantity + 1,
      price: calculatePrice(prevData?.quantity + 1, prevData?.selectedOption),
    }));
  };

  const updateItemIntoCart = async () => {
    const customizationOptions = transformSelectedOptions(
      data?.selectedOption,
      item?.customizationOptions,
    ).sort((a, b) => a.type.localeCompare(b.type));

    const customizedData = {
      restaurant_id: restaurant?.id,
      itemId: item?.id,
      customizationId: cus?.id,
      newCustomization: {
        quantity: data?.quantity,
        price: data?.price,
        customizationOptions: customizationOptions,
      },
    };
    dispatch(updateCustomizableItem(customizedData));
    onClose();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.flexRow}>
          <Image source={item?.imageUrl} style={styles.headerImage} />
          <CustomText
            fontFamily="Poppins-Medium"
            fontSize={18}
            style={styles.itemName}>
            {item?.name}
            (Edit)
          </CustomText>
        </View>
        <TouchableOpacity style={styles.bookmarkIcon}>
          <Icon
            name="bookmark"
            iconFamily="Ionicons"
            color={Colors.text}
            size={22}
          />
        </TouchableOpacity>
      </View>

      {/* Customization Options */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {item?.customizationOptions?.map(
          (customization: any, index: number) => {
            return (
              <View style={styles.customizationCard} key={index}>
                <CustomText
                  fontFamily="Poppins-Bold"
                  fontSize={16}
                  style={{fontFamily: 'Poppins-Medium'}}>
                  {customization?.type}
                </CustomText>
                <HorizontalLine />
                {customization?.options?.map((option: any, i: number) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.optionContainer}
                      onPress={() => {
                        selectedOptionHandler(customization?.type, i);
                      }}>
                      <CustomText
                        fontSize={14}
                        style={{fontFamily: 'Poppins-Regular'}}>
                        {option?.name}
                      </CustomText>
                      <View style={styles.flexRow}>
                        <View style={styles.priceContainer}>
                          <CustomText
                            fontSize={16}
                            style={{
                              marginLeft: 4,
                              fontFamily: 'Poppins-Bold',
                            }}>
                            ₹ {option.price}
                          </CustomText>
                        </View>
                        <Icon
                          name={
                            data?.selectedOption[customization.type] === i
                              ? 'radiobox-marked'
                              : 'radiobox-blank'
                          }
                          iconFamily="MaterialCommunityIcons"
                          color={
                            data?.selectedOption[customization.type] == i
                              ? Colors.active
                              : '#888'
                          }
                          size={20}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          },
        )}
      </ScrollView>

      {/* Action Row: Quantity Controls & Add Item Button */}
      <View style={styles.actionRow}>
        <View style={styles.quantityContainer}>
          <ScalePress onPress={removeCartHandler}>
            <Icon
              iconFamily="MaterialCommunityIcons"
              color="#fff"
              name="minus"
              size={26}
            />
          </ScalePress>
          <AnimatedNumbers
            includeComma={false}
            animationDuration={150}
            animateToNumber={data?.quantity}
            fontStyle={styles.quantityText}
          />
          <ScalePress onPress={addCartHeader}>
            <Icon
              iconFamily="MaterialCommunityIcons"
              color="#fff"
              name="plus"
              size={26}
            />
          </ScalePress>
        </View>

        <ScalePress onPress={updateItemIntoCart} style={styles.addButton}>
          <CustomText
            fontFamily="Poppins-Medium"
            fontSize={16}
            color="#fff"
            style={{textAlign: 'center', fontFamily: 'Poppins-Medium'}}>
            Updated item - ₹{data?.price}
          </CustomText>
        </ScalePress>
      </View>

      <SafeAreaView />
    </View>
  );
};

export default EditItemModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    height: 80,
    width: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemName: {
    flexShrink: 1,
    fontFamily: 'Poppins-Bold',
  },
  bookmarkIcon: {
    padding: 8,
  },
  scrollContainer: {
    padding: 16,
  },
  customizationCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  radioIcon: {
    marginLeft: 8,
  },
  quantityText: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    marginHorizontal: 12,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#28a745',
    borderRadius: 20,
    paddingVertical: 10,
    marginRight: 8,
  },
  addButton: {
    flex: 3.5,
    backgroundColor: '#0F1419',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});
