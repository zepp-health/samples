import * as Styles from 'zosLoader:./index.[pf].layout.js'
import { createWidget, widget, updateLayout } from '@zos/ui';
import { push, exit, replace, } from '@zos/router';
import { sysUIFocusIsEnable } from './index.r.layout';

const page_list = [
  { name: "4.0 Flex Layout" },
  { number: "01", name: "Functional Test" },
  { number: "02", name: "FillRect & Button" },
  { number: "03", name: "Text & Image" },
]

let common_focus_flag = false;

Page({

  state: {
    scroll_list
  },
  build() {
    if (sysUIFocusIsEnable) {
      common_focus_flag = true;
    }
    this.state.scroll_list = createWidget(widget.SCROLL_LIST, {
      ...Styles.SCROLL_LIST_CONFIG_STYLE,
      data_array: page_list,
      data_count: page_list.length,
      item_common_focus: common_focus_flag,
      data_type_config: [
        {
          start: 0,
          end: 0,
          type_id: 0,
        },
        {
          start: 1,
          end: page_list.length - 1,
          type_id: 1,
        },
      ],
      data_type_config_count: 2,
      item_click_func: (list, index, data_key) => {
        if (index > 0) {
          push({
            url: "page/TC/TC_" + String(index).padStart(2, '0') + "/index"
          });
        }

      },
    });
    // updateLayout(); no need call by user when screen load
  }
})
