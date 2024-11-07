import * as Styles from 'zosLoader:./index.[pf].layout.js'
import { createWidget, widget, updateLayout, dumpLayout, deleteWidget, align } from '@zos/ui';

var fill_rect_list = new Array(20);

Page({
  build() {

    let root_container = createWidget(widget.VIRTUAL_CONTAINER, { layout: Styles.FILL_RECT_ROOT_CONTAINER_STYLE });

    createWidget(widget.FILL_RECT, { parent: root_container, ...Styles.BACKGROUND_FILL_STYLE });

    let group_root = createWidget(widget.GROUP, {
      parent: root_container,
      layout: Styles.GROUP_FILL_RECT_ROOT_STYLE,
    })

    for (let i = 0; i < 5; i++) {
      let fill_rect_widget = group_root.createWidget(widget.IMG, {
        src: "images/icons/ic_moon.png",
        layout: Styles.IMAGE_ITEM_STYLE,
      });
      fill_rect_list.push(fill_rect_widget);
    }

    for (let i = 0; i < 3; i++) {
      let text_widget = group_root.createWidget(widget.TEXT, {
        text: "hello zepp os",
        color: 0x34e073,
        align_v: align.CENTER_V,
        layout: Styles.TEXT_ITEM_STYLE,
      });
      fill_rect_list.push(text_widget);
    }

    var button_container = createWidget(widget.VIRTUAL_CONTAINER, {
      layout: Styles.TEST_BUTTON_ROOT_CONTAINER_STYLE
    });

    createWidget(widget.FILL_RECT, {
      parent: button_container,
      ...Styles.BACKGROUND_FILL_STYLE,
      color: 0x333333,
    });

    var button_sub_container = createWidget(widget.VIRTUAL_CONTAINER, {
      parent: button_container,
      layout: Styles.TEST_BUTTON_SUB_ROOT_CONTAINER_STYLE
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "add widget",
      click_func: () => {
        let img_widget = group_root.createWidget(widget.IMG, {
          src: "images/icons/ic_moon.png",
          layout: Styles.IMAGE_ITEM_STYLE,
        });
        fill_rect_list.push(img_widget);
        updateLayout();
      },
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "delete widget",
      click_func: () => {
        let fill_rect_widget = fill_rect_list.pop();
        deleteWidget(fill_rect_widget);
        updateLayout();
      },
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "zoom in",
      click_func: () => {
        root_container.updateLayoutStyle({ "x": "0", "y": "0", "width": "100vw", "height": "50vh" });
        updateLayout(root_container);
      },
    });

    createWidget(widget.BUTTON, {
      parent: button_sub_container,
      ...Styles.TEST_BUTTON_ITEM_STYLE,
      text: "zoom out",
      click_func: () => {
        root_container.updateLayoutStyle({ "x": "20vw", "y": "10vh", "width": "60vw", "height": "25vh" });
        updateLayout(root_container);
        dumpLayout("layout.txt");
      },
    });
    // updateLayout(); no need call by user when screen load updateLayout();
  }
})
