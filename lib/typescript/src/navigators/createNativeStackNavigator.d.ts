import { ParamListBase, StackNavigationState } from '@react-navigation/native';
import * as React from 'react';
import type { NativeStackNavigationEventMap, NativeStackNavigationOptions, NativeStackNavigatorProps } from '../types';
declare function NativeStackNavigator({ id, initialRouteName, children, screenListeners, screenOptions, ...rest }: NativeStackNavigatorProps): React.JSX.Element;
declare const _default: <ParamList extends ParamListBase>() => import("@react-navigation/native").TypedNavigator<ParamList, StackNavigationState<ParamListBase>, NativeStackNavigationOptions, NativeStackNavigationEventMap, typeof NativeStackNavigator>;
export default _default;
//# sourceMappingURL=createNativeStackNavigator.d.ts.map