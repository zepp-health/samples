import { log } from "@zos/utils";
import { EventBus } from "@zos/utils";

const logger = log.getLogger("app");

App({
  globalData: {
    devEvent: new EventBus(),
  },
  onCreate(options) {
    logger.log("app onCreate");
  },
  onDestroy(options) {
    logger.log("app onDestroy");
  },
});
