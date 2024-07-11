import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "../screens/Auth";
import BottomNav from "./BottomNav";
import AddEvent from "../screens/AddEvent";

const Stack = createNativeStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="BottomNav" component={BottomNav} />
      <Stack.Screen name="AddEvent" component={AddEvent} />
    </Stack.Navigator>
  );
}

export default StackNav;
