"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabView = TabView;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Pager = require("./Pager");
var _SceneView = require("./SceneView");
var _TabBar = require("./TabBar");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TabView({
  onIndexChange,
  navigationState,
  renderScene,
  initialLayout,
  keyboardDismissMode = 'auto',
  lazy = false,
  lazyPreloadDistance = 0,
  onSwipeStart,
  onSwipeEnd,
  renderLazyPlaceholder = () => null,
  renderTabBar = props => /*#__PURE__*/React.createElement(_TabBar.TabBar, props),
  sceneContainerStyle,
  pagerStyle,
  style,
  swipeEnabled = true,
  tabBarPosition = 'top',
  animationEnabled = true,
  overScrollMode
}) {
  const [layout, setLayout] = React.useState({
    width: 0,
    height: 0,
    ...initialLayout
  });
  const jumpToIndex = index => {
    if (index !== navigationState.index) {
      onIndexChange(index);
    }
  };
  const handleLayout = e => {
    const {
      height,
      width
    } = e.nativeEvent.layout;
    setLayout(prevLayout => {
      if (prevLayout.width === width && prevLayout.height === height) {
        return prevLayout;
      }
      return {
        height,
        width
      };
    });
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    onLayout: handleLayout,
    style: [styles.pager, style]
  }, /*#__PURE__*/React.createElement(_Pager.Pager, {
    layout: layout,
    navigationState: navigationState,
    keyboardDismissMode: keyboardDismissMode,
    swipeEnabled: swipeEnabled,
    onSwipeStart: onSwipeStart,
    onSwipeEnd: onSwipeEnd,
    onIndexChange: jumpToIndex,
    animationEnabled: animationEnabled,
    overScrollMode: overScrollMode,
    style: pagerStyle
  }, ({
    position,
    render,
    addEnterListener,
    jumpTo
  }) => {
    // All of the props here must not change between re-renders
    // This is crucial to optimizing the routes with PureComponent
    const sceneRendererProps = {
      position,
      layout,
      jumpTo
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, tabBarPosition === 'top' && renderTabBar({
      ...sceneRendererProps,
      navigationState
    }), render(navigationState.routes.map((route, i) => {
      return /*#__PURE__*/React.createElement(_SceneView.SceneView, _extends({}, sceneRendererProps, {
        addEnterListener: addEnterListener,
        key: route.key,
        index: i,
        lazy: typeof lazy === 'function' ? lazy({
          route
        }) : lazy,
        lazyPreloadDistance: lazyPreloadDistance,
        navigationState: navigationState,
        style: sceneContainerStyle
      }), ({
        loading
      }) => loading ? renderLazyPlaceholder({
        route
      }) : renderScene({
        ...sceneRendererProps,
        route
      }));
    })), tabBarPosition === 'bottom' && renderTabBar({
      ...sceneRendererProps,
      navigationState
    }));
  }));
}
const styles = _reactNative.StyleSheet.create({
  pager: {
    flex: 1,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=TabView.js.map