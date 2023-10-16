import { usePreferences } from '@/hooks';
import { PreferenceTag } from '@/types';
import {
  Box,
  Divider,
  Pressable,
  Switch,
  Text,
  VStack,
} from '@gluestack-ui/themed';

const SettingsScreen = () => {
  const { tags, togglePreference } = usePreferences();

  return (
    <VStack px='$2'>
      <PreferenceSwitch
        label='Gluten Free'
        description='Only show gluten free meals'
        value={tags.includes(PreferenceTag.GLUTEN_FREE)}
        onValueChange={() => togglePreference(PreferenceTag.GLUTEN_FREE)}
      />

      <Divider bgColor='$gray300' h='$px' w='$full' />

      <PreferenceSwitch
        label='Latose Free'
        description='Only show lactose free meals'
        value={tags.includes(PreferenceTag.LACTOSE_FREE)}
        onValueChange={() => togglePreference(PreferenceTag.LACTOSE_FREE)}
      />

      <Divider bgColor='$gray300' h='$px' w='$full' />

      <PreferenceSwitch
        label='Vegan'
        description='Only show vegan meals'
        value={tags.includes(PreferenceTag.VEGAN)}
        onValueChange={() => togglePreference(PreferenceTag.VEGAN)}
      />

      <Divider bgColor='$gray300' h='$px' w='$full' />

      <PreferenceSwitch
        label='Vegetarian'
        description='Only show vegetarian meals'
        value={tags.includes(PreferenceTag.VEGETARIAN)}
        onValueChange={() => togglePreference(PreferenceTag.VEGETARIAN)}
      />
    </VStack>
  );
};

interface PreferenceSwitchProps {
  label: string;
  description: string;
  value: boolean;
  onValueChange: () => void;
}

const PreferenceSwitch: React.FC<PreferenceSwitchProps> = ({
  label,
  description,
  value,
  onValueChange,
}) => {
  return (
    <Pressable
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      pl='$1'
      onPress={onValueChange}
    >
      <Box>
        <Text fontSize='$md' fontWeight='$semibold'>
          {label}
        </Text>
        <Text color='$gray700'>{description}</Text>
      </Box>

      <Switch value={value} onValueChange={onValueChange} />
    </Pressable>
  );
};

export default SettingsScreen;
