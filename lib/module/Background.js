function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
export default function Background({
  style,
  ...rest
}) {
  const {
    colors
  } = useTheme();
  return /*#__PURE__*/React.createElement(View, _extends({}, rest, {
    style: [{
      flex: 1,
      backgroundColor: colors.background
    }, style]
  }));
}
//# sourceMappingURL=Background.js.map