import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'


const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 2.2
const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 10

export default function BottomSheet({ children }) {
    const translateY = useSharedValue(SCREEN_HEIGHT);
    const context = useSharedValue({ y: 10 })

    const gesture = Gesture.Pan()
    .onStart(e => {
        context.value = { y: translateY.value }
    })
    .onUpdate(e => {
        translateY.value = Math.min(
            Math.max(e.translationY + context.value.y, -MAX_TRANSLATE_Y),
            0
        );
    })
    .onEnd(e => {
        const currentY = translateY.value;
        const threshold = -MIN_TRANSLATE_Y / 2; 
        
 
        if (currentY < threshold) {
            translateY.value = -MAX_TRANSLATE_Y
                
        } 

        else {
            translateY.value = -MIN_TRANSLATE_Y;
        }
    });

    /**
     * Animated style for the bottom sheet
     */
    const reanimatedBottomStyle = useAnimatedStyle(e => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    })

    /**
     * Scrolls to a specific destination
     * @param {number} destination - The destination to scroll to
     */
    const scrollTo = (destination) => {
        'worklet'
        translateY.value = withSpring(destination, { damping: 80 })
    }

    useEffect(() => {

        scrollTo(-SCREEN_HEIGHT / 3)
    }, [])

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomsheet_container, reanimatedBottomStyle]}>
                <View style={styles.line}>
                    {children}
                </View>

            </Animated.View>
        </GestureDetector>
    )

}

const styles = StyleSheet.create({
    bottomsheet_container: {
        position: 'absolute',
        top: SCREEN_HEIGHT,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5, // sombra en Android
        shadowColor: '#000', // sombra en iOS
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    line: {
        width: '100%',
        height: '100%',
        padding:20,
        
  
        
}
})