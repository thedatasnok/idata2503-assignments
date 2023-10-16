import { Affordability, Complexity } from '@/types';
import { Box, Icon, Image, Pressable, Text } from '@gluestack-ui/themed';
import {
  BadgeDollarSignIcon,
  BriefcaseIcon,
  ClockIcon,
} from 'lucide-react-native';

export interface RecipeCardProps {
  name: string;
  imageUrl: string;
  duration: number;
  affordability: Affordability;
  complexity: Complexity;
  onPress?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  name,
  imageUrl,
  duration,
  affordability,
  complexity,
  onPress,
}) => {
  return (
    <Pressable
      borderWidth='$1'
      borderColor='$gray300'
      onPress={onPress}
      rounded='$md'
      overflow='hidden'
    >
      <Image h='$32' source={imageUrl} alt='yep' />
      <Text fontWeight='$semibold' fontSize='$lg' px='$1'>
        {name}
      </Text>

      <Box
        flexDirection='row'
        justifyContent='space-between'
        alignItems='flex-end'
        px='$1'
        pb='$1'
      >
        <Box>
          <Box flexDirection='row' alignItems='center' gap='$0.5'>
            {/* @ts-ignore */}
            <Icon as={BadgeDollarSignIcon} color='$gray700' size='16' />
            <Text fontWeight='$medium' color='$gray700'>
              {complexity}
            </Text>
          </Box>
          <Box flexDirection='row' alignItems='center' gap='$0.5'>
            {/* @ts-ignore */}
            <Icon as={BriefcaseIcon} color='$gray700' size='16' />
            <Text fontWeight='$medium' color='$gray700'>
              {affordability}
            </Text>
          </Box>
        </Box>

        <Box flexDirection='row' alignItems='center' gap='$1'>
          {/* @ts-ignore */}
          <Icon as={ClockIcon} color='$gray700' size='18' />
          <Text fontWeight='$medium' fontSize='$md' color='$gray700'>
            {duration} min
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default RecipeCard;
