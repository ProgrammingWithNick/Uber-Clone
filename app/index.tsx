import { Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    return (
        <SafeAreaView className='items-center justify-center flex-1'>
            <Text className='text-5xl text-red-900'>index</Text>
        </SafeAreaView>
    )
}

export default Home;