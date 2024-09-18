import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomBtn from '@/components/CustomBtn'
import { Link, router } from 'expo-router'
import OAuth from '@/components/OAuth'
import { useSignUp } from '@clerk/clerk-expo'
import ReactNativeModal from 'react-native-modal'

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [form, setform] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });
    const onSignUpPress = async () => {
        if (!isLoaded) {
            return
        }

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            setVerification({
                ...verification,
                state: "pending"
            })
        } catch (err: any) {
            // console.error(JSON.stringify(err, null, 2))
            Alert.alert('Error', err.errors[0].longMessage);
        }
    }

    const onPressVerify = async () => {
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            })

            if (completeSignUp.status === 'complete') {
                // TODO: create a database user
                await setActive({ session: completeSignUp.createdSessionId })
                setVerification({ ...verification, state: "success" })
            } else {
                setVerification({
                    ...verification,
                    error: "Verification failed.",
                    state: "failed"
                })
            }
        } catch (err: any) {
            setVerification({
                ...verification,
                error: err.errors[0].longmessage,
                state: "failed"
            })
        }
    }

    return (
        <ScrollView className='flex-1 bg-white'>
            <View className='flex-1 bg-white'>
                <View className='relative w-full h-[250px]'>
                    <Image
                        source={images.signUpCar}
                        className='z-0 w-full h-[250px]'
                    />
                    <Text className='absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5'>
                        Create Your Account
                    </Text>
                </View>
                <View className='p-5'>
                    <InputField
                        label="Name"
                        placeholder="Enter Your Name"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) => setform({ ...form, name: value })}
                    />
                    <InputField
                        label="Email"
                        placeholder="Enter Your Email"
                        icon={icons.email}
                        value={form.email}
                        onChangeText={(value) => setform({ ...form, email: value })}
                    />
                    <InputField
                        label="Password"
                        placeholder="Enter Your Password"
                        icon={icons.lock}
                        secureTextEntry={true}
                        value={form.password}
                        onChangeText={(value) => setform({ ...form, password: value })}
                    />
                    <CustomBtn
                        title="Sign Up"
                        onPress={onSignUpPress}
                        className='mt-6'
                    />
                    <OAuth />
                    <Link href="/Sign-In" className='mt-10 text-lg text-center text-general-200'>
                        <Text>Already have account? </Text>
                        <Text className='text-primary-500'>Log In</Text>
                    </Link>
                </View>

                <ReactNativeModal isVisible={verification.state === "pending"}
                    onModalHide={() =>{
                        // setVerification({ ...verification, state: "success" })
                        if (verification.state === "success") setShowSuccessModal(true)
                    }}
                >
                    <View className='bg-white px-9 py-9 rounded-2xl min-h-[300px]'>
                        <Text className='mb-2 text-2xl font-JakartaExtraBold'>Verification</Text>
                        <Text className='mb-5 font-Jakarta'>
                            We've verified code to {form.email}
                        </Text>
                        <InputField
                            label='Code'
                            icon={icons.lock}
                            placeholder='12345'
                            value={verification.code}
                            keyboardType='numeric'
                            onChangeText={(code) =>
                                setVerification({ ...verification, code })
                            }
                        />
                        {verification.error && (
                            <Text className='mt-1 text-sm text-red-700'>
                                {verification.error}
                            </Text>
                        )}
                        <CustomBtn 
                        title='Verify Email Address'
                        onPress={onPressVerify}
                        className='mt-5 bg-success-600'
                        />
                    </View>
                </ReactNativeModal>

                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className='min-h-[300px] bg-white rounded-2xl px-7 py-9'>
                        <Image
                            source={images.check}
                            className='w-[110px] h-[110px] mx-auto my-5'
                        />
                        <Text className='text-3xl text-center font-JakartaBold'>
                            Verified
                        </Text>
                        <Text className='text-base text-center text-gray-400 font-Jakarta'>
                            You Have Successfully Verified Your Account.
                        </Text>
                        <CustomBtn
                            title='Browse Home'
                            onPress={() =>{ 
                                setShowSuccessModal(false);
                                router.push('/(root)/(tabs)/Home')
                            }}
                            className='mt-5'
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    )
}

export default SignUp;