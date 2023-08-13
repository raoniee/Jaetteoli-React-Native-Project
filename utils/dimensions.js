import Constants from "expo-constants";
import {Dimensions, Platform} from "react-native";

export const statusBarHeight = Constants.statusBarHeight;
export const windowHeight = Dimensions.get('window').height

export const totalHeight = Platform.OS === 'ios' ? windowHeight - statusBarHeight : windowHeight;