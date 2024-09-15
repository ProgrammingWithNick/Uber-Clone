import { Stack } from 'expo-router';
const layout=()=> {

    return (

        <Stack>
            <Stack.Screen name="Welcome" options={{ headerShown: false }} />
            <Stack.Screen name="Sign-Up" options={{ headerShown: false }} />
            <Stack.Screen name="Sign-In" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>

    );
}
export default layout;