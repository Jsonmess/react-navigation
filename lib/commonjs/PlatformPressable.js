"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PlatformPressable;
var _native = require("@react-navigation/native");
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const AnimatedPressable = _reactNative.Animated.createAnimatedComponent(_reactNative.Pressable);
const ANDROID_VERSION_LOLLIPOP = 21;
const ANDROID_SUPPORTS_RIPPLE = _reactNative.Platform.OS === 'android' && _reactNative.Platform.Version >= ANDROID_VERSION_LOLLIPOP;

/**
 * PlatformPressable provides an abstraction on top of Pressable to handle platform differences.
 */
function PlatformPressable({
  onPressIn,
  onPressOut,
  android_ripple,
  pressColor,
  pressOpacity = 0.3,
  style,
  ...rest
}) {
  const {
    dark
  } = (0, _native.useTheme)();
  const [opacity] = React.useState(() => new _reactNative.Animated.Value(1));
  const animateTo = (toValue, duration) => {
    if (ANDROID_SUPPORTS_RIPPLE) {
      return;
    }
    _reactNative.Animated.timing(opacity, {
      toValue,
      duration,
      easing: _reactNative.Easing.inOut(_reactNative.Easing.quad),
      useNativeDriver: true
    }).start();
  };
  const handlePressIn = e => {
    animateTo(pressOpacity, 0);
    onPressIn === null || onPressIn === void 0 || onPressIn(e);
  };
  const handlePressOut = e => {
    animateTo(1, 200);
    onPressOut === null || onPressOut === void 0 || onPressOut(e);
  };
  return /*#__PURE__*/React.createElement(AnimatedPressable, _extends({
    onPressIn: handlePressIn,
    onPressOut: handlePressOut,
    android_ripple: ANDROID_SUPPORTS_RIPPLE ? {
      color: pressColor !== undefined ? pressColor : dark ? 'rgba(255, 255, 255, .32)' : 'rgba(0, 0, 0, .32)',
      ...android_ripple
    } : undefined,
    style: [{
      opacity: !ANDROID_SUPPORTS_RIPPLE ? opacity : 1
    }, style]
  }, rest));
}
//# sourceMappingURL=PlatformPressable.js.map