function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
const FAR_FAR_AWAY = 30000; // this should be big enough to move the whole view out of its container

export default function ResourceSavingScene({
  visible,
  children,
  style,
  ...rest
}) {
  if (Platform.OS === 'web') {
    return /*#__PURE__*/React.createElement(View
    // @ts-expect-error: hidden exists on web, but not in React Native
    , _extends({
      hidden: !visible,
      style: [{
        display: visible ? 'flex' : 'none'
      }, styles.container, style],
      pointerEvents: visible ? 'auto' : 'none'
    }, rest), children);
  }
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, style]
    // box-none doesn't seem to work properly on Android
    ,
    pointerEvents: visible ? 'auto' : 'none'
  }, /*#__PURE__*/React.createElement(View, {
    collapsable: false,
    removeClippedSubviews:
    // On iOS & macOS, set removeClippedSubviews to true only when not focused
    // This is an workaround for a bug where the clipped view never re-appears
    Platform.OS === 'ios' || Platform.OS === 'macos' ? !visible : true,
    pointerEvents: visible ? 'auto' : 'none',
    style: visible ? styles.attached : styles.detached
  }, children));
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  attached: {
    flex: 1
  },
  detached: {
    flex: 1,
    top: FAR_FAR_AWAY
  }
});
//# sourceMappingURL=ResourceSavingView.js.map