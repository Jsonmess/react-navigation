function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
export default function HeaderTitle({
  tintColor,
  style,
  ...rest
}) {
  const {
    colors
  } = useTheme();
  return /*#__PURE__*/React.createElement(Animated.Text, _extends({
    accessibilityRole: "header",
    "aria-level": "1",
    numberOfLines: 1
  }, rest, {
    style: [styles.title, {
      color: tintColor === undefined ? colors.text : tintColor
    }, style]
  }));
}
const styles = StyleSheet.create({
  title: Platform.select({
    ios: {
      fontSize: 17,
      fontWeight: '600'
    },
    android: {
      fontSize: 20,
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal'
    },
    default: {
      fontSize: 18,
      fontWeight: '500'
    }
  })
});
//# sourceMappingURL=HeaderTitle.js.map