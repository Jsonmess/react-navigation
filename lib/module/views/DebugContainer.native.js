function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Platform, View } from 'react-native';
// @ts-ignore Getting private component
import AppContainer from 'react-native/Libraries/ReactNative/AppContainer';
/**
 * This view must *not* be flattened.
 * See https://github.com/software-mansion/react-native-screens/pull/1825
 * for detailed explanation.
 */
let DebugContainer = props => {
  return /*#__PURE__*/React.createElement(View, _extends({}, props, {
    collapsable: false
  }));
};
if (process.env.NODE_ENV !== 'production') {
  DebugContainer = props => {
    const {
      stackPresentation,
      ...rest
    } = props;
    if (Platform.OS === 'ios' && stackPresentation !== 'push') {
      // This is necessary for LogBox
      return /*#__PURE__*/React.createElement(AppContainer, null, /*#__PURE__*/React.createElement(View, _extends({}, rest, {
        collapsable: false
      })));
    }
    return /*#__PURE__*/React.createElement(View, _extends({}, rest, {
      collapsable: false
    }));
  };
}
export default DebugContainer;
//# sourceMappingURL=DebugContainer.native.js.map