import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "../screens/Auth";
import BottomNav from "./BottomNav";
import AddEvent from "../screens/AddEvent";
import Invite from "../screens/Invite";
import { useAuth } from "../contexts/Auth";
import Calendar from "../screens/Calender";

const Stack = createNativeStackNavigator();

function StackNav() {
  const { user } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="BottomNav" component={BottomNav} />
          <Stack.Screen name="AddEvent" component={AddEvent} />
          <Stack.Screen name="Invite" component={Invite} />
          <Stack.Screen name="Calendar" component={Calendar} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={Auth} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default StackNav;
