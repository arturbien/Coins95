// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    anchor: string;
    anchorVisited: string;
    borderDark: string;
    borderDarkest: string;
    borderLight: string;
    borderLightest: string;
    canvas: string;
    canvasText: string;
    canvasTextDisabled: string;
    canvasTextDisabledShadow: string;
    canvasTextInvert: string;
    checkmark: string;
    checkmarkDisabled: string;
    flatDark: string;
    flatLight: string;
    focusSecondary: string;
    headerBackground: string;
    headerNotActiveBackground: string;
    headerNotActiveText: string;
    headerText: string;
    hoverBackground: string;
    material: string;
    materialDark: string;
    materialText: string;
    materialTextDisabled: string;
    materialTextDisabledShadow: string;
    materialTextInvert: string;
    progress: string;
    tooltip: string;
  }
}
