import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { TEXT_STYLE } from "zosLoader:./index.page.[pf].layout.js";

const logger = Logger.getLogger("helloworld");
Page({
  onInit() {
    logger.debug("page onInit invoked");
  },
  build() {
    logger.debug("page build invoked");
    hmUI.createWidget(hmUI.widget.TEXT, TEXT_STYLE);
  },
  onDestroy() {
    logger.debug("page onDestroy invoked");
  },
});
