import { SCROLL_LIST, align } from '@zos/ui';
import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from '@zos/device';

export const SCROLL_LIST_POS_STYLE = {
  layout: {
    "x": "10vw",
    "y": "0",
    "width": "80vw",
    "height": "100vh",
  }
}

export const SCROLL_LIST_CONFIG_STYLE = {
  ...SCROLL_LIST_POS_STYLE,
  item_space: "8".toPixel(),
  snap_type: SCROLL_LIST.snap_type.SNAPCENTER_EXCEPTTITLE,
  enable_scroll_bar: true,
  item_config: [
    {
      type_id: 0,
      item_bg_color: 0x00000,
      item_bg_radius: 0,
      text_view: [{
        x: "10vw".toPixel(),
        y: 0,
        w: "60vw".toPixel(),
        h: "180".toPixel(),
        key: "name",
        color: 0xFFFFFF,
        text_size: "45".toPixel(),
        align_h: align.CENTER_H,
        align_v: align.CENTER_V,
      },],
      text_view_count: 1,
      item_height: "180".toPixel(),
    },
    {
      type_id: 1,
      item_bg_color: 0x383838,
      item_bg_radius: 20,
      item_press_effect: true,
      text_view: [
        {
          x: 0,
          y: 0,
          w: "10vw".toPixel(),
          h: "80".toPixel(),
          key: "number",
          color: 0xFFFFFF,
          text_size: "20".toPixel(),
          action: true,
          align_h: align.CENTER_H,
          align_v: align.CENTER_V,
        },
        {
          x: "10vw".toPixel(),
          y: 0,
          w: "70vw".toPixel(),
          h: "80".toPixel(),
          key: "name",
          color: 0xFFFFFF,
          text_size: "20".toPixel(),
          action: true,
        },
      ],
      text_view_count: 2,
      item_height: "80".toPixel(),
    }

  ],
  item_config_count: 2,
}

export const sysUIFocusIsEnable = ((getDeviceInfo().keyType.indexOf('sport') !== -1) || (getDeviceInfo().keyNumber === 4));
export const sysScreenIsSquare = (getDeviceInfo().screenShape == SCREEN_SHAPE_SQUARE)
