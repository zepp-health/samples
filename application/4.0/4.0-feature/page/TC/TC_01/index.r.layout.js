import { align, text_style } from '@zos/ui';

export const TEXT_LAYOUT_INFO_STYLE = {
  x: 0,
  y: 60,
  w: "100vw".toPixel(),
  h: "120".toPixel(),
  text: "flex layout information:",
  color: 0x34e073,
  align_h: align.CENTER_H,
  align_v: align.TOP,
  text_style: text_style.WRAP,
}

export const BUTTON_ROOT_CONTAINER_STYLE = {
  "x": "10vw",
  "y": "10vh",
  "width": "80vw",
  "height": "50vh"
}

export const BACKGROUND_FILL_STYLE = {
  color: 0xFFFFFF,
  alpha: 100,
  layout: { "width": "100%", "height": "100%" },
}

export const GROUP_BUTTON_ROOT_STYLE = {
  "display": "flex",
  "flex-flow": "row wrap",
  "column-gap": "20",
  "row-gap": "10",
  "justify-content": "start",
  "align-items": "space-evenly",
  "width": "100%",
  "height": "100%",
  "align-content": "center",
}

export const ORIGINAL_BUTTON_POS_STYLE = {
  "width": "70",
  "height": "40",
  "radius": "2.5vw",
  "font-size": "swdpi(25)",
}

export const ORINGAL_BUTTON_STYLE = {
  press_color: 0x1976d2,
  normal_color: 0x0000FF,
  layout: ORIGINAL_BUTTON_POS_STYLE,
}

export const BIGGER_BUTTON_POS_STYLE = {
  "width": "80",
  "height": "60",
  "radius": "2.6vw",
  "font-size": "swdpi(25)",
}

export const BIGGER_BUTTON_STYLE = {
  press_color: 0x1976d2,
  normal_color: 0x0000FF,
  layout: BIGGER_BUTTON_POS_STYLE,
}



export const TEST_BUTTON_ROOT_CONTAINER_STYLE = {
  "x": "15vw",
  "y": "60vh",
  "width": "70vw",
  "height": "35vh"
}

export const TEST_BUTTON_SUB_ROOT_CONTAINER_STYLE = {
  "width": "100%",
  "height": "100%",
  "display": "flex",
  "flex-flow": "row wrap",
  "column-gap": "5",
  "row-gap": "10",
  "justify-content": "space-evenly",
  "align-content": "start",
  "align-items": "start",
  "padding-top": "10",
}

export const TEST_BUTTON_ITEM_STYLE = {
  layout: {
    "width": "30%",
    "height": "20%",
    "radius": "2.6vw",
    "font-size": "10",
  },
  press_src: "images/test/normalbtn_h.png",
  normal_src: "images/test/normalbtn_n.png",
  press_color: 0x1976d2,
  normal_color: 0x0000FF,
}







