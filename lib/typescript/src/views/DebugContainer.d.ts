import * as React from 'react';
import { ViewProps } from 'react-native';
import type { StackPresentationTypes } from 'react-native-screens';
type ContainerProps = ViewProps & {
    stackPresentation: StackPresentationTypes;
    children: React.ReactNode;
};
export default function Container(props: ContainerProps): React.JSX.Element;
export {};
//# sourceMappingURL=DebugContainer.d.ts.map