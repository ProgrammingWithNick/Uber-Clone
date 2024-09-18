import { View, Text, Image } from 'react-native'
import CustomBtn from './CustomBtn'
import { icons } from '@/constants'

const OAuth = () => {
    const handleGoogleSignIn = async () => { };
    return (
        <View>
            <View className='flex flex-row items-center justify-center mt-4 gap-x-3'>
                <View className='flex-1 h-[2px] bg-general-100' />
                <Text className='text-lg font-JakartaSemiBold'>Or</Text>
                <View className='flex-1 h-[2px] bg-general-100' />
            </View>
            <CustomBtn
                title='Log In Google'
                className='w-full mt-5 shadow-none'
                IconLeft={() => (
                    <Image source={icons.google}
                        resizeMode='contain'
                        className='w-5 h-5 mx-2'
                    />
                )}
                bgVariant='primary'
                textVariant='primary'
                onPress={handleGoogleSignIn}
            />
        </View>
    )
}


export default OAuth