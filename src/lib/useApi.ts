import type { SpeakApi, LoadLive2d, LoadChat, SaveChat, DeleteChat, ChatApi } from './types.ts'
import { create } from 'zustand'
import { 
  chat as chat_ollama 
} from './api.ollama.ts'
import { 
  loadChat as loadChat_browser, 
  saveChat as saveChat_browser, 
  deleteChat as deleteChat_browser,
  speak as speak_browser,
} from './api.browser.ts'
import {
  xyz as live2d_xyz,
} from './api.live2d.ts'

type API = {
  chat: ChatApi
  speak: SpeakApi | null
  loadLive2d: LoadLive2d
  loadChat: LoadChat
  saveChat: SaveChat
  deleteChat: DeleteChat
}

type ApiState = {
  getSpeakApiList: () => string[]
  getStoreApiList: () => string[]
  getChatApiList: () => string[]
  getLive2dList: () => string[]
  setSpeakApi: (name: string) => void
  setStoreApi: (name: string) => void
  setChatApi: (name: string) => void
  setLive2d: (name: string) => void
  getCurrentSpeakApi: () => string
  getCurrentStoreApi: () => string
  getCurrentChatApi: () => string
  getCurrentLive2d: () => string
} & API

const speakApiList: { name: string, api: SpeakApi | null }[] = [
  { name: '关闭', api: null },
  { name: 'Web Speech API', api: speak_browser },
]
const storeApiList: { name: string, load: LoadChat, save: SaveChat, delete: DeleteChat }[] = [
  { name: 'IndexedDB', load: loadChat_browser, save: saveChat_browser, delete: deleteChat_browser },
]
const chatApiList: { name: string, api: ChatApi }[] = [
  { name: 'Ollama', api: chat_ollama },
]
const live2dList: { name: string, api: LoadLive2d }[] = [
  { name: '小叶子', api: live2d_xyz },
]

export const useApi = create<ApiState>()((set, get) => ({
  speak: speakApiList[0].api,
  loadChat: storeApiList[0].load,
  saveChat: storeApiList[0].save,
  deleteChat: storeApiList[0].delete,
  chat: chatApiList[0].api,
  loadLive2d: live2dList[0].api,
  getSpeakApiList: () => speakApiList.map(({ name }) => name),
  getStoreApiList: () => storeApiList.map(({ name }) => name),
  getChatApiList: () => chatApiList.map(({ name }) => name),
  getLive2dList: () => live2dList.map(({ name }) => name),
  setSpeakApi: (name) => {
    const api = speakApiList.find(api => api.name === name)?.api
    if (api) set({ speak: api })
  },
  setStoreApi: (name) => {
    const api = storeApiList.find(api => api.name === name)
    if (api) set({ loadChat: api.load, saveChat: api.save, deleteChat: api.delete })
  },
  setChatApi: (name) => {
    const api = chatApiList.find(api => api.name === name)?.api
    if (api) set({ chat: api })
  },
  setLive2d: (name) => {
    const api = live2dList.find(api => api.name === name)?.api
    if (api) set({ loadLive2d: api })
  },  
  getCurrentSpeakApi: () => speakApiList.find(({ api }) => api === get().speak)!.name,
  getCurrentStoreApi: () => storeApiList.find(({ load }) => load === get().loadChat)!.name,
  getCurrentChatApi: () => chatApiList.find(({ api }) => api === get().chat)!.name,
  getCurrentLive2d: () => live2dList.find(({ api }) => api === get().loadLive2d)!.name,
}))