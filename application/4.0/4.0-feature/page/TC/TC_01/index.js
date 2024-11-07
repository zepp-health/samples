import * as Styles from 'zosLoader:./index.[pf].layout.js'
import { createWidget, widget, updateLayout, dumpLayout, align, prop, deleteWidget, text_style } from '@zos/ui';
import { push, exit, replace, } from '@zos/router';

var fill_rect_list = new Array(20);
let text = null
let global_number = 0;
let flex_dir = ["row", "row-reverse", "column", "column-reverse"];
let flex_wrap = ["nowrap", "wrap", "wrap-reverse"];
let justify_content = ["start", "end", "center", "space-between", "space-around", "space-evenly"];
let align_items = ["start", "end", "center"];
let align_content = ["start", "end", "center"];
let style_height = 50;
let flex_grow_number = 1;
let layout_show = null

Page({
  build() {

    let root_container = createWidget(widget.VIRTUAL_CONTAINER, { layout: Styles.BUTTON_ROOT_CONTAINER_STYLE });

    createWidget(widget.FILL_RECT, { parent: root_container, ...Styles.BACKGROUND_FILL_STYLE });

    let group_root = createWidget(widget.GROUP, {
      parent: root_container,
      layout: Styles.GROUP_BUTTON_ROOT_STYLE,
    })

    for (let i = 0; i < 4; i++) {
      let btn = group_root.createWidget(widget.BUTTON, Styles.ORINGAL_BUTTON_STYLE);
      btn.text = global_number.toString()
      global_number += 1;
      fill_rect_list.push(btn);
    }

    let button_container = createWidget(widget.VIRTUAL_CONTAINER, { layout: Styles.TEST_BUTTON_ROOT_CONTAINER_STYLE });

    createWidget(widget.FILL_RECT, {
      parent: button_container,
      ...Styles.BACKGROUND_FILL_STYLE,
      color: 0x00FFFF,
      alpha: 255,
    });

    let button_sub_container = createWidget(widget.VIRTUAL_CONTAINER, {
      parent: button_container,
      layout: Styles.TEST_BUTTON_SUB_ROOT_CONTAINER_STYLE,
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "add widget",
      click_func: () => {
        let btn = group_root.createWidget(widget.BUTTON, Styles.BIGGER_BUTTON_STYLE);
        global_number += 1;
        btn.text = global_number.toString();
        fill_rect_list.push(btn);
        updateLayout();
      },
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "delete widget",
      click_func: () => {
        let btn = fill_rect_list.pop();
        global_number -= 1;
        deleteWidget(btn);
        updateLayout();
      },
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "zoom view change",
      click_func: () => {
        style_height -= 3;
        if (style_height < 30) {
          style_height = 50;
        }
        root_container.updateLayoutStyle({ x: "0", y: "9vh", width: "100vw", height: String(style_height) + "vh" });
        updateLayout(root_container);
      },
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "change flex layout",
      click_func: () => {
        let random_flex_dir = flex_dir[Math.floor(Math.random() * flex_dir.length)]
        let random_flex_wrap = flex_wrap[Math.floor(Math.random() * flex_wrap.length)]
        let random_justify_content = justify_content[Math.floor(Math.random() * justify_content.length)]
        let random_align_items = align_items[Math.floor(Math.random() * align_items.length)]
        let random_align_content = align_content[Math.floor(Math.random() * align_content.length)]

        let flex_layout = {
          "display": "flex",
          "flex-flow": random_flex_dir + " " + random_flex_wrap,
          "column-gap": "20",
          "row-gap": "10",
          "justify-content": random_justify_content,
          "align-items": random_align_items,
          "width": "100%",
          "height": "100%",
          "align-content": random_align_content,
        };
        group_root.updateLayoutStyle(flex_layout);
        updateLayout(group_root);
        dumpLayout("layout.txt");
        let text_show = "flex_layout: flex-flow:[" + random_flex_dir + " " + random_flex_wrap + "] " +
          "justify-content:[" + random_justify_content + "] " +
          "align-items:[" + random_align_items + "] " +
          "align-content:[" + random_align_content + "] "
        layout_show.setProperty(prop.TEXT, text_show);
      },
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "new_track",
      click_func: () => {
        let btn = group_root.createWidget(widget.BUTTON, {
          press_color: 0x1976d2,
          normal_color: 0x0000FF,
          text: String(global_number),
          layout: {
            ...Styles.BIGGER_BUTTON_POS_STYLE,
            "tags": "newtrack"
          },
        });
        global_number += 1;
        fill_rect_list.push(btn);
        updateLayout();
        layout_show.setProperty(prop.TEXT, "tags:newtrack");
      },
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "align button",
      click_func: () => {
        let btn = group_root.createWidget(widget.BUTTON, {
          press_color: 0x1976d2,
          normal_color: 0x0000FF,
          text: String(global_number),
          layout: {
            ...Styles.BIGGER_BUTTON_POS_STYLE,
            "tags": "ignore-layout",
            "align": "right bottom",
          },
        });
        global_number += 1;
        fill_rect_list.push(btn);
        updateLayout();
        layout_show.setProperty(prop.TEXT, "tags:ignore-layout  align:right bottom");
      },
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "padding button",
      click_func: () => {
        let padding_layout = {
          ...Styles.BUTTON_ROOT_CONTAINER_STYLE,
          "padding": "20",
        };
        root_container.updateLayoutStyle(padding_layout);
        updateLayout();
        layout_show.setProperty(prop.TEXT, "setting padding[top,bottom,left,right] to 20");
      },
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "flex_grow",
      click_func: () => {
        let btn = group_root.createWidget(widget.BUTTON, {
          press_color: 0x1976d2,
          normal_color: 0x0000FF,
          text: String(global_number),
          layout: {
            ...Styles.BIGGER_BUTTON_POS_STYLE,
            "flex-grow": String(flex_grow_number)
          },
        });
        global_number += 1;
        flex_grow_number += 1;
        fill_rect_list.push(btn);
        updateLayout();
        layout_show.setProperty(prop.TEXT, "setting flex-grow value:" + String(flex_grow_number - 1));
      },
    });

    layout_show = createWidget(widget.TEXT, Styles.TEXT_LAYOUT_INFO_STYLE);
    // updateLayout(); no need call by user when screen load
  }
})
