"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Screen;
var _native = require("@react-navigation/native");
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Background = _interopRequireDefault(require("./Background"));
var _getDefaultHeaderHeight = _interopRequireDefault(require("./Header/getDefaultHeaderHeight"));
var _HeaderHeightContext = _interopRequireDefault(require("./Header/HeaderHeightContext"));
var _HeaderShownContext = _interopRequireDefault(require("./Header/HeaderShownContext"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Screen(props) {
  const dimensions = (0, _reactNativeSafeAreaContext.useSafeAreaFrame)();
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const isParentHeaderShown = React.useContext(_HeaderShownContext.default);
  const parentHeaderHeight = React.useContext(_HeaderHeightContext.default);
  const {
    focused,
    modal = false,
    header,
    headerShown = true,
    headerTransparent,
    headerStatusBarHeight = isParentHeaderShown ? 0 : insets.top,
    navigation,
    route,
    children,
    style
  } = props;
  const [headerHeight, setHeaderHeight] = React.useState(() => (0, _getDefaultHeaderHeight.default)(dimensions, modal, headerStatusBarHeight));
  return /*#__PURE__*/React.createElement(_Background.default, {
    accessibilityElementsHidden: !focused,
    importantForAccessibility: focused ? 'auto' : 'no-hide-descendants',
    style: [styles.container, style]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.content
  }, /*#__PURE__*/React.createElement(_HeaderShownContext.default.Provider, {
    value: isParentHeaderShown || headerShown !== false
  }, /*#__PURE__*/React.createElement(_HeaderHeightContext.default.Provider, {
    value: headerShown ? headerHeight : parentHeaderHeight ?? 0
  }, children))), headerShown ? /*#__PURE__*/React.createElement(_native.NavigationContext.Provider, {
    value: navigation
  }, /*#__PURE__*/React.createElement(_native.NavigationRouteContext.Provider, {
    value: route
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    onLayout: e => {
      const {
        height
      } = e.nativeEvent.layout;
      setHeaderHeight(height);
    },
    style: headerTransparent ? styles.absolute : null
  }, header))) : null);
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  // This is necessary to avoid applying 'column-reverse' to screen content
  content: {
    flex: 1
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});
//# sourceMappingURL=Screen.js.map