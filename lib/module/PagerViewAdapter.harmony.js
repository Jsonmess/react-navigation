function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import * as React from 'react';
import { Animated, Keyboard, StyleSheet } from 'react-native';
import ViewPager from '@react-native-oh-tpl/react-native-pager-view';
import { useAnimatedValue } from 'react-native-tab-view/src/useAnimatedValue';
const AnimatedViewPager = Animated.createAnimatedComponent(ViewPager);
export function PagerViewAdapter({
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
  const position = useAnimatedValue(index);
  const offset = useAnimatedValue(0);
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
      Keyboard.dismiss();
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
  const memoizedPosition = React.useMemo(() => Animated.add(position, offset), [offset, position]);
  return children({
    position: memoizedPosition,
    addEnterListener,
    jumpTo,
    render: children => /*#__PURE__*/React.createElement(AnimatedViewPager, _extends({}, rest, {
      ref: pagerRef,
      style: [styles.container, style],
      initialPage: index,
      keyboardDismissMode: keyboardDismissMode === 'auto' ? 'on-drag' : keyboardDismissMode,
      onPageScroll: Animated.event([{
        nativeEvent: {
          position: position,
          offset: offset
        }
      }], {
        useNativeDriver: false
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
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=PagerViewAdapter.harmony.js.map