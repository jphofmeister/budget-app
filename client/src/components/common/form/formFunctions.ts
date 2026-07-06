import { parse } from "../../../utilities/sharedFunctions";
import type { OptionText } from "@/types/Form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOptionDisplayText = (optionDataItem: any, optionTextItem: OptionText) => {
  let displayOptionText: string = "";

  if (optionTextItem.type === "property") {
    displayOptionText = optionDataItem[optionTextItem.text];
  } else if (optionTextItem.type === "string") {
    displayOptionText = parse(optionTextItem.text);
  }

  return displayOptionText;
};
