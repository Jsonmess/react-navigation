import * as React from 'react';
const SceneComponent = /*#__PURE__*/React.memo(({
  component,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement(component, rest);
});
export function SceneMap(scenes) {
  return ({
    route,
    jumpTo,
    position
  }) => /*#__PURE__*/React.createElement(SceneComponent, {
    key: route.key,
    component: scenes[route.key],
    route: route,
    jumpTo: jumpTo,
    position: position
  });
}
//# sourceMappingURL=SceneMap.js.map