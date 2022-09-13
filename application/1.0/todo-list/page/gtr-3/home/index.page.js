import { TITLE_TEXT_STYLE, TIPS_TEXT_STYLE, SCROLL_LIST, ADD_BUTTON } from './index.style'
import { readFileSync, writeFileSync } from './../../../utils/fs'
import { getScrollListDataConfig } from './../../../utils/index'

const logger = DeviceRuntimeCore.HmLogger.getLogger('todo-list-page')
const { messageBuilder } = getApp()._options.globalData

Page({
  state: {
    scrollList: null,
    tipText: null,
    refreshText: null,
    addButton: null,
    dataList: readFileSync()
  },
  onInit() {
    logger.debug('page onInit invoked')
    this.onMessage()
    this.getTodoList()
  },
  build() {
    logger.debug('page build invoked')
    if (hmSetting.getDeviceInfo().screenShape !== 0) {
      this.state.title = hmUI.createWidget(hmUI.widget.TEXT, {
        ...TITLE_TEXT_STYLE
      })
    }

    this.state.addButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...ADD_BUTTON,
      click_func: () => {
        this.addRandomTodoItem()
      }
    })

    this.createAndUpdateList()
  },
  onDestroy() {
    logger.debug('page onDestroy invoked')
    writeFileSync(this.state.dataList, false)
  },
  onMessage() {
    messageBuilder.on('call', ({ payload: buf }) => {
      const data = messageBuilder.buf2Json(buf)
      const dataList = data.map((i) => ({ name: i }))
      logger.log('call dataList', dataList)
      this.refreshAndUpdate(dataList)
    })
  },
  getTodoList() {
    messageBuilder
      .request({
        method: 'GET_TODO_LIST'
      })
      .then(({ result }) => {
        this.state.dataList = result.map((d) => ({ name: d }))
        logger.log('GET_TODO_LIST dataList', this.state.dataList)
        this.createAndUpdateList()
      })
      .catch((res) => {})
  },
  addRandomTodoItem() {
    messageBuilder
      .request({
        method: 'ADD'
      })
      .then(({ result }) => {
        this.state.dataList = result.map((d) => ({ name: d }))
        this.createAndUpdateList()
      })
      .catch((res) => {})
  },
  deleteTodoItem(index) {
    messageBuilder
      .request({
        method: 'DELETE',
        params: { index }
      })
      .then(({ result }) => {
        const dataList = result.map((d) => ({ name: d }))

        this.refreshAndUpdate(dataList)
      })
      .catch((res) => {})
  },
  changeUI(showEmpty) {
    const { dataList } = this.state

    if (showEmpty) {
      if (dataList.length === 0) {
        !this.state.tipText &&
          (this.state.tipText = hmUI.createWidget(hmUI.widget.TEXT, {
            ...TIPS_TEXT_STYLE
          }))
      }
      const isTip = dataList.length === 0

      this.state.refreshText && this.state.refreshText.setProperty(hmUI.prop.VISIBLE, false)
      this.state.tipText && this.state.tipText.setProperty(hmUI.prop.VISIBLE, isTip)
      this.state.scrollList && this.state.scrollList.setProperty(hmUI.prop.VISIBLE, !isTip)
    } else {
      // 占位刷新
      !this.state.refreshText &&
        (this.state.refreshText = hmUI.createWidget(hmUI.widget.TEXT, {
          ...TIPS_TEXT_STYLE,
          text: ' '
        }))

      this.state.tipText && this.state.tipText.setProperty(hmUI.prop.VISIBLE, false)
      this.state.refreshText.setProperty(hmUI.prop.VISIBLE, true)
      this.state.scrollList && this.state.scrollList.setProperty(hmUI.prop.VISIBLE, false)
    }
  },
  createAndUpdateList(showEmpty = true) {
    const _scrollListItemClick = (list, index) => {
      this.deleteTodoItem(index)
    }
    const { scrollList, dataList } = this.state
    this.changeUI(showEmpty)
    const dataTypeConfig = getScrollListDataConfig(dataList.length === 0 ? -1 : 0, dataList.length)
    if (scrollList) {
      scrollList.setProperty(hmUI.prop.UPDATE_DATA, {
        data_array: dataList,
        data_count: dataList.length,
        data_type_config: [{ start: 0, end: dataList.length, type_id: 2 }],
        data_type_config_count: dataTypeConfig.length,
        on_page: 1
      })
    } else {
      this.state.scrollList = hmUI.createWidget(hmUI.widget.SCROLL_LIST, {
        ...(SCROLL_LIST || {}),
        data_array: dataList,
        data_count: dataList.length,
        data_type_config: dataTypeConfig,
        data_type_config_count: dataTypeConfig.length,
        on_page: 1,
        item_click_func: _scrollListItemClick
      })
    }
  },
  refreshAndUpdate(dataList = []) {
    this.state.dataList = []
    this.createAndUpdateList(false)

    setTimeout(() => {
      this.state.dataList = dataList
      this.createAndUpdateList()
    }, 20)
  }
})
