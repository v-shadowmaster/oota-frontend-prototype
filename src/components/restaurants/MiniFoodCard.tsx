import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {useAppSelector} from '@states/reduxHook';
import {selectRestaurantCartItem} from '@states/reducers/cartSlice';
import HorizontalLine from '@components/ui/HorizontalLine';
import {Colors} from '@unistyles/Constants';

const MiniFoodCard: React.FC<{item: any; cus: any; restaurant: any}> = ({
  cus,
  restaurant,
  item,
}) => {
  const cartItem = useAppSelector(
    selectRestaurantCartItem(restaurant?.id, item?.id),
  );

  const modalRef = useRef<any>(null);

  return (
    <>
      <View style={styles.flexRowItemBaseline}>
              <View style={styles.flexRowGapBaseLine}>
                  
        </View>
      </View>
    </>
  );
};

export default MiniFoodCard;

const styles = StyleSheet.create({
  flexRowItemBaseline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: Colors.border,
  },

  flexRowGapBaseLine: {
    flexDirection: 'row',
    width: '70%',
    alignItems: 'flex-start',
    gap: 10,
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});
