"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NativeStackView;
var _elements = require("@react-navigation/elements");
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const TRANSPARENT_PRESENTATIONS = ['transparentModal', 'containedTransparentModal'];
function NativeStackView({
  state,
  descriptors
}) {
  const parentHeaderBack = React.useContext(_elements.HeaderBackContext);
  return /*#__PURE__*/React.createElement(_elements.SafeAreaProviderCompat, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.container
  }, state.routes.map((route, i) => {
    var _state$routes, _state$routes2;
    const isFocused = state.index === i;
    const previousKey = (_state$routes = state.routes[i - 1]) === null || _state$routes === void 0 ? void 0 : _state$routes.key;
    const nextKey = (_state$routes2 = state.routes[i + 1]) === null || _state$routes2 === void 0 ? void 0 : _state$routes2.key;
    const previousDescriptor = previousKey ? descriptors[previousKey] : undefined;
    const nextDescriptor = nextKey ? descriptors[nextKey] : undefined;
    const {
      options,
      navigation,
      render
    } = descriptors[route.key];
    const headerBack = previousDescriptor ? {
      title: (0, _elements.getHeaderTitle)(previousDescriptor.options, previousDescriptor.route.name)
    } : parentHeaderBack;
    const canGoBack = headerBack !== undefined;
    const {
      header,
      headerShown,
      headerTintColor,
      headerBackImageSource,
      headerLeft,
      headerRight,
      headerTitle,
      headerTitleAlign,
      headerTitleStyle,
      headerStyle,
      headerShadowVisible,
      headerTransparent,
      headerBackground,
      headerBackTitle,
      presentation,
      contentStyle
    } = options;
    const nextPresentation = nextDescriptor === null || nextDescriptor === void 0 ? void 0 : nextDescriptor.options.presentation;
    return /*#__PURE__*/React.createElement(_elements.Screen, {
      key: route.key,
      focused: isFocused,
      route: route,
      navigation: navigation,
      headerShown: headerShown,
      headerTransparent: headerTransparent,
      header: header !== undefined ? header({
        back: headerBack,
        options,
        route,
        navigation
      }) : /*#__PURE__*/React.createElement(_elements.Header, {
        title: (0, _elements.getHeaderTitle)(options, route.name),
        headerTintColor: headerTintColor,
        headerLeft: typeof headerLeft === 'function' ? ({
          tintColor
        }) => headerLeft({
          tintColor,
          canGoBack,
          label: headerBackTitle
        }) : headerLeft === undefined && canGoBack ? ({
          tintColor
        }) => /*#__PURE__*/React.createElement(_elements.HeaderBackButton, {
          tintColor: tintColor,
          backImage: headerBackImageSource !== undefined ? () => /*#__PURE__*/React.createElement(_reactNative.Image, {
            source: headerBackImageSource,
            style: [styles.backImage, {
              tintColor
            }]
          }) : undefined,
          onPress: navigation.goBack,
          canGoBack: canGoBack
        }) : headerLeft,
        headerRight: typeof headerRight === 'function' ? ({
          tintColor
        }) => headerRight({
          tintColor,
          canGoBack
        }) : headerRight,
        headerTitle: typeof headerTitle === 'function' ? ({
          children,
          tintColor
        }) => headerTitle({
          children,
          tintColor
        }) : headerTitle,
        headerTitleAlign: headerTitleAlign,
        headerTitleStyle: headerTitleStyle,
        headerTransparent: headerTransparent,
        headerShadowVisible: headerShadowVisible,
        headerBackground: headerBackground,
        headerStyle: headerStyle
      }),
      style: [_reactNative.StyleSheet.absoluteFill, {
        display: isFocused || nextPresentation != null && TRANSPARENT_PRESENTATIONS.includes(nextPresentation) ? 'flex' : 'none'
      }, presentation != null && TRANSPARENT_PRESENTATIONS.includes(presentation) ? {
        backgroundColor: 'transparent'
      } : null]
    }, /*#__PURE__*/React.createElement(_elements.HeaderBackContext.Provider, {
      value: headerBack
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [styles.contentContainer, contentStyle]
    }, render())));
  })));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  backImage: {
    height: 24,
    width: 24,
    margin: 3,
    resizeMode: 'contain'
  }
});
//# sourceMappingURL=NativeStackView.harmony.js.map