"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagerViewAdapter = PagerViewAdapter;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativePagerView = _interopRequireDefault(require("@react-native-oh-tpl/react-native-pager-view"));
var _useAnimatedValue = require("react-native-tab-view/src/useAnimatedValue");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const AnimatedViewPager = _reactNative.Animated.createAnimatedComponent(_reactNativePagerView.default);
function PagerViewAdapter({
  keyboardDismissMode = 'auto',
  swipeEnabled = true,
  navigationState,
  onIndexChange,
  onSwipeStart,
  onSwipeEnd,
  children,
  style,
  animationEnabled,
  ...rest
}) {
  const {
    index
  } = navigationState;
  const listenersRef = React.useRef([]);
  const pagerRef = React.useRef();
  const indexRef = React.useRef(index);
  const navigationStateRef = React.useRef(navigationState);
  const position = (0, _useAnimatedValue.useAnimatedValue)(index);
  const offset = (0, _useAnimatedValue.useAnimatedValue)(0);
  React.useEffect(() => {
    navigationStateRef.current = navigationState;
  });
  const jumpTo = React.useCallback(key => {
    const index = navigationStateRef.current.routes.findIndex(route => route.key === key);
    if (animationEnabled) {
      var _pagerRef$current;
      (_pagerRef$current = pagerRef.current) === null || _pagerRef$current === void 0 || _pagerRef$current.setPage(index);
    } else {
      var _pagerRef$current2;
      (_pagerRef$current2 = pagerRef.current) === null || _pagerRef$current2 === void 0 || _pagerRef$current2.setPageWithoutAnimation(index);
      position.setValue(index);
    }
  }, [animationEnabled, position]);
  React.useEffect(() => {
    if (keyboardDismissMode === 'auto') {
      _reactNative.Keyboard.dismiss();
    }
    if (indexRef.current !== index) {
      if (animationEnabled) {
        var _pagerRef$current3;
        (_pagerRef$current3 = pagerRef.current) === null || _pagerRef$current3 === void 0 || _pagerRef$current3.setPage(index);
      } else {
        var _pagerRef$current4;
        (_pagerRef$current4 = pagerRef.current) === null || _pagerRef$current4 === void 0 || _pagerRef$current4.setPageWithoutAnimation(index);
        position.setValue(index);
      }
    }
  }, [keyboardDismissMode, index, animationEnabled, position]);
  const onPageScrollStateChanged = state => {
    const {
      pageScrollState
    } = state.nativeEvent;
    switch (pageScrollState) {
      case 'idle':
        onSwipeEnd === null || onSwipeEnd === void 0 || onSwipeEnd();
        return;
      case 'dragging':
        {
          const subscription = offset.addListener(({
            value
          }) => {
            const next = index + (value > 0 ? Math.ceil(value) : Math.floor(value));
            if (next !== index) {
              listenersRef.current.forEach(listener => listener(next));
            }
            offset.removeListener(subscription);
          });
          onSwipeStart === null || onSwipeStart === void 0 || onSwipeStart();
          return;
        }
    }
  };
  const addEnterListener = React.useCallback(listener => {
    listenersRef.current.push(listener);
    return () => {
      const index = listenersRef.current.indexOf(listener);
      if (index > -1) {
        listenersRef.current.splice(index, 1);
      }
    };
  }, []);
  const memoizedPosition = React.useMemo(() => _reactNative.Animated.add(position, offset), [offset, position]);
  return children({
    position: memoizedPosition,
    addEnterListener,
    jumpTo,
    render: children => /*#__PURE__*/React.createElement(AnimatedViewPager, _extends({}, rest, {
      ref: pagerRef,
      style: [styles.container, style],
      initialPage: index,
      keyboardDismissMode: keyboardDismissMode === 'auto' ? 'on-drag' : keyboardDismissMode,
      onPageScroll: _reactNative.Animated.event([{
        nativeEvent: {
          position: position,
          offset: offset
        }
      }], {
        useNativeDriver: true
      }),
      onPageSelected: e => {
        const index = e.nativeEvent.position;
        indexRef.current = index;
        onIndexChange(index);
      },
      onPageScrollStateChanged: onPageScrollStateChanged,
      scrollEnabled: swipeEnabled
    }), children)
  });
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=PagerViewAdapter.js.map