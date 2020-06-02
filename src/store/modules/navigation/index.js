import links from './data/links.json'
import languages from './data/languages.json'
import { isMobile, osName } from 'mobile-device-detect'

import { i18n } from '@/plugins/i18n'
languages.forEach((item, index) => {
  if (typeof i18n.messages[item.locale].language === undefined) {
    languages[index].translation = languages[index].locale
  } else {
    languages[index].translation = i18n.messages[item.locale].language
  }
  languages[index].active = item.locale === i18n.locale ? true : false
})

// Detects if device is in standalone mode

// return (window.matchMedia('(display-mode: standalone)').matches);

const isInWebAppiOS = window.navigator.standalone == true
const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches

// const isInStandaloneMode = isInWebAppiOS || isInWebAppChrome
// console.info('isInStandaloneMode', isInStandaloneMode)

export const namespaced = true

export const state = {
  links,
  languages,
  popup: false,
  history: [],
  back: {},
  backLabel: '',
  isBack: false,
  isMobile: isMobile,
  system: osName,
  declinedAppInstall: false,
  standAlone: isInWebAppiOS || isInWebAppChrome,
}

export const mutations = {
  SET_POPUP(state, result) {
    state.popup = result
  },
  SET_HISTORY(state, location) {
    state.history.push(location)
  },
  SET_LANGUAGE(state, lang) {
    state.languages.forEach((item, index) => {
      state.languages[index].active = lang === item.locale ? true : false
    })
  },
  SET_BACK(state, back) {
    if (Object.keys(back).length === 0) {
      state.isBack = false
    } else {
      state.isBack = true
    }
    state.back = back
  },
  SET_BACKLABEL(state, backLabel) {
    state.backLabel = backLabel
  },
  SET_STANDALONE(state, standAlone) {
    state.standAlone = standAlone
  },
  SET_DECLINEDAPPINSTALL(state, declinedAppInstall) {
    state.declinedAppInstall = declinedAppInstall
  },
  REMOVE_HISTORY(state) {
    state.history.pop()
  },
}

export const actions = {
  navigate({ commit, state }, location) {
    if (state.history[state.history.length - 1] !== location) {
      commit('SET_HISTORY', location)
    }
  },
  goHistory({ commit, state }) {
    commit('REMOVE_HISTORY')
    return state.history[state.history.length - 1]
  },
}

export const getters = {
  links: state => {
    return state.links
  },
  languages: state => {
    return state.languages
  },
  popup: state => {
    return state.popup
  },
  back: state => {
    return state.back
  },
  backLabel: state => {
    return state.backLabel
  },
  isStandAlone: state => {
    return state.standAlone
  },
  isMobile: state => {
    return state.isMobile
  },
  isAndroid: state => {
    return state.system === 'Android'
  },
  isIos: state => {
    return state.system === 'iOS'
  },
  hasBack: state => {
    return state.isBack
  },
  hasHistory: state => {
    if (state.history.length <= 1) {
      return false
    }
    return true
  },
  hasDeclinedAppInstall: state => {
    if (state.declinedAppInstall === true) {
      return true
    }
    return false
  },
}
