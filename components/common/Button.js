import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
    const marginValues = props.margin ? props.margin.split(' ').map(val => Number(val)) : [0, 0, 0, 0];

    const buttonStyle = {
        width: 353,
        height: 62,
        borderRadius: 30,
        backgroundColor: props.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: marginValues[0],
        marginRight: marginValues[1],
        marginBottom: marginValues[2],
        marginLeft: marginValues[3],
    };

    const buttonTextStyle = {
        color: props.color,
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 36,
        letterSpacing: -0.3,
    };

    return (
        <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
            <Text style={buttonTextStyle}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export default Button;