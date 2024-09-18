import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({ source, focused }: { source: ImageSourcePropType, focused: boolean }) => (
    <View className={`flex flex-row items-center justify-center rounded-full ${focused ? 'bg-general-300' : ''}`}>
        <View className={`rounded-full w-12 h-12 justify-center items-center ${focused ? 'bg-general-400' : ''}`}>
            <Image
            source={source}
            tintColor="while"
            resizeMode="contain"
            className="w-7 h-7"
            />
        </View>
    </View>
)

const layout = () => (
    <Tabs
        initialRouteName="index"
        screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarInactiveBackgroundColor: "white",
            tabBarShowLabel: false,
            tabBarStyle:{
                backgroundColor: "#333333",
                borderRadius:50,
                paddingBottom: 0,
                overflow: "hidden",
                marginHorizontal:20,
                marginBottom:20,
                height:78,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                position: "absolute",
            }
        }}
    >
        <Tabs.Screen
            name="Home"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} source={icons.home} />
                ),
            }}
        />
        <Tabs.Screen
            name="History"
            options={{
                title: "History",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} source={icons.list} />
                ),
            }}
        />
        <Tabs.Screen
            name="Chat"
            options={{
                title: "Chat",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} source={icons.chat} />
                ),
            }}
        />
        <Tabs.Screen
            name="Profile"
            options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} source={icons.profile} />
                ),
            }}
        />
    </Tabs>
)
export default layout;