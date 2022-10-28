import { DefaultTheme } from "styled-components";

import original from "react95/dist/themes/original";
import rose from "react95/dist/themes/rose";
import rainyDay from "react95/dist/themes/rainyDay";
import travel from "react95/dist/themes/travel";
import marine from "react95/dist/themes/marine";
import olive from "react95/dist/themes/olive";
import theSixtiesUSA from "react95/dist/themes/theSixtiesUSA";
import candy from "react95/dist/themes/candy";
import tokyoDark from "react95/dist/themes/tokyoDark";
import vaporTeal from "react95/dist/themes/vaporTeal";

const themes = {
  original: original as DefaultTheme,
  rose: rose as DefaultTheme,
  rainyDay: rainyDay as DefaultTheme,
  travel: travel as DefaultTheme,
  marine: marine as DefaultTheme,
  olive: olive as DefaultTheme,
  theSixtiesUSA: theSixtiesUSA as DefaultTheme,
  candy: candy as DefaultTheme,
  tokyoDark: tokyoDark as DefaultTheme,
  vaporTeal: vaporTeal as DefaultTheme,
};

export default themes;

export type ThemeName = keyof typeof themes;

// making sure every theme has a label assigned
export const themesLabels: {
  [swag in ThemeName]: string;
} = {
  original: "original",
  rose: "🌹 Rose",
  rainyDay: "☔️ Rainy Day",
  travel: "🧳 Travel",
  marine: "🛳 Marine",
  olive: "🍸 Olive",
  theSixtiesUSA: "🌷 The 60's USA",
  candy: "🍭 Candy",
  tokyoDark: "📟 Tokyo Dark",
  vaporTeal: "💨 Vapor Teal",
};
