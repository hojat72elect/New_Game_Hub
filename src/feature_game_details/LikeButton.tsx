import React, {useCallback, useEffect, useRef} from "react";
import {TouchableWithoutFeedback, View} from "react-native";
import {useLikes} from "@/src/shared/contexts/LikesContext";
import LottieView from "lottie-react-native";

export function LikeButton({gameId}: {
    gameId: string;

}) {
    const {getLikedGames, toggleLikedGames} = useLikes();
    const isLiked = getLikedGames(gameId);
    const animationRef = useRef<LottieView>(null);

    useEffect(() => {
        if (isLiked) {
            animationRef.current?.play(0, 74);
        } else {
            animationRef.current?.reset();
        }
    }, [isLiked]);

    const handlePress = useCallback(() => {
        toggleLikedGames(gameId);
    }, [gameId, toggleLikedGames]);

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={{
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: 32
            }}>
                <LottieView
                    style={{
                        width: 90,
                        height: 90,
                    }}
                    ref={animationRef}
                    source={require("@/assets/animations/like_animation.json")}
                    autoPlay={false}
                    loop={false}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}
