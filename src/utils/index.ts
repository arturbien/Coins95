//returns how much time passed since date/timestamp
import { css } from "styled-components";

// TODO: why this thingy doesn't work?
// type Currency = Intl.NumberFormatOptions.currency;

export const formatCurrency = (amount: number, currency?: string) =>
  amount.toLocaleString(
    "en-US",
    currency
      ? {
          style: "currency",
          // currencyDisplay: "code",
          currency,
        }
      : undefined
  );

export const timeSince = (timestamp: number) => {
  var seconds = Math.floor(new Date().getTime() / 1000 - timestamp);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

// TODO: handle properly all types (bottom)
type MaterialModes = "top" | "bottom" | "full";
// top / bottom/ full
export const createMaterialStyles = (mode: MaterialModes = "top") => css`
  position: relative;
  box-sizing: border-box;
  /* width: 100%;
  padding: 0.5rem; */
  background: ${({ theme }) => theme.material};
  border-top: ${({ theme }) =>
    ["top", "full"].includes(mode) ? `2px solid ${theme.borderLight}` : "none"};
  padding: 2px;
  border-bottom: ${({ theme }) =>
    mode === "top" ? "none" : `2px solid ${theme.borderDarkest}`};
  border-left: 2px solid ${({ theme }) => theme.borderLight};
  border-right: 2px solid ${({ theme }) => theme.borderDarkest};
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - ${mode === "full" ? "4px" : "2px"});
    ${["top", "full"].includes(mode) ? "bottom: 0px" : "top: 0px"};
    left: 0;
    pointer-events: none;
    border-left: 2px solid ${({ theme }) => theme.borderLightest};
    border-right: 2px solid ${({ theme }) => theme.borderDark};
    border-top: ${({ theme }) =>
      ["top", "full"].includes(mode)
        ? `2px solid ${theme.borderLightest}`
        : "none"};
    border-bottom: ${({ theme }) =>
      mode === "top" ? "none" : `2px solid ${theme.borderDark}`};
  }
`;

export const createDisabledTextStyles = () => css`
  -webkit-text-fill-color: ${({ theme }) => theme.materialTextDisabled};
  color: ${({ theme }) => theme.materialTextDisabled};
  text-shadow: 1px 1px ${({ theme }) => theme.materialTextDisabledShadow};
`;

export function copyToClipboard(str: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(str);
  } else {
    let textarea = document.createElement("textarea") as HTMLTextAreaElement;
    try {
      textarea.setAttribute("readonly", "true");
      textarea.setAttribute("contenteditable", "true");
      // prevent scroll from jumping to the bottom when focus is set.
      textarea.style.position = "fixed";
      textarea.value = str;

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const range = document.createRange();
      range.selectNodeContents(textarea);

      const sel = window.getSelection() as Selection;
      sel.removeAllRanges();
      sel.addRange(range);

      textarea.setSelectionRange(0, textarea.value.length);
      document.execCommand("copy");
    } catch (err) {
      console.error(err);
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
