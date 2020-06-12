import shuffle from 'lodash/shuffle'
import toneConvert from 'pinyin-tone-convert'
import categories from './data/categories.json'
import groups from './data/groups.json'
import lessons from './data/lessons.json'
import content from './data/content.json'
// import startsWith from 'lodash/startsWith'
import lowerCase from 'lodash/lowerCase'

function compare_type(a, b) {
  const bandA = a.type.toLowerCase()
  const bandB = b.type.toLowerCase()
  let comparison = 0
  if (bandA > bandB) {
    comparison = -1
  } else if (bandA < bandB) {
    comparison = 1
  }
  return comparison
}
function compare_pinyin(a, b) {
  const bandA = a.pinyin.toLowerCase()
  const bandB = b.pinyin.toLowerCase()
  let comparison = 0
  if (bandA > bandB) {
    comparison = 1
  } else if (bandA < bandB) {
    comparison = -1
  }
  return comparison
}
content.sort(compare_pinyin)

content.forEach(item => {
  item['pinyin_search'] = item['pinyin'].replace(/[0-9]/g, '')
  item['pinyin'] = toneConvert(item['pinyin'])
})

categories.sort()
groups.sort()

export const namespaced = true

export const state = {
  content,
  categories,
  groups,
  lessons,
  direction: 'chinese-2-language',
}

export const mutations = {
  SWITCH_DIRECTION(state, direction) {
    state.direction = direction
  },
}

export const actions = {
  switchLanguageDirection({ commit, state }) {
    let direction = ''
    if (state.direction === 'chinese-2-language') {
      direction = 'language-2-chinese'
    } else {
      direction = 'chinese-2-language'
    }
    commit('SWITCH_DIRECTION', direction)
  },
}

export const getters = {
  contentId: state => content_id => {
    return state.content.find(item => item.id === content_id)
  },
  contentFilter: state => (filter, value) => {
    return state.content.filter(item => {
      if (Array.isArray(item[filter])) {
        return item[filter].includes(value)
      }
      return item[filter] === value
    })
  },
  contentSearch: state => value => {
    const result = state.content.filter(item => lowerCase(item.pinyin_search).indexOf(lowerCase(value)) !== -1)
    return result.sort(compare_type)
  },
  contentIndex: state => (filter, value, content_id, element = 'words') => {
    var filteredItems = state.content.filter(item => {
      if (Array.isArray(item[filter])) {
        return item[filter].includes(value) && item.type === element
      }
      return item[filter] === value && item.type === element
    })
    return filteredItems.findIndex(item => item.id === content_id)
  },
  contentCount: state => (filter, value, element = 'words') => {
    return state.content.filter(item => {
      if (Array.isArray(item[filter])) {
        return item[filter].includes(value) && item.type === element
      }
      return item[filter] === value && item.type === element
    }).length
  },
  contentNext: state => (filter, value, content_id, type = 'words') => {
    var filteredItems = state.content.filter(item => {
      if (Array.isArray(item[filter])) {
        return item[filter].includes(value) && item.type === type
      }
      return item[filter] === value && item.type === type
    })
    var sentenceIndex = filteredItems.findIndex(item => item.id === content_id)
    if (sentenceIndex < filteredItems.length - 1) {
      sentenceIndex++
    }
    return filteredItems[sentenceIndex].id
  },
  contentPrevious: state => (filter, value, content_id, type = 'words') => {
    var filteredItems = state.content.filter(item => {
      if (Array.isArray(item[filter])) {
        return item[filter].includes(value) && item.type === type
      }
      return item[filter] === value && item.type === type
    })
    var sentenceIndex = filteredItems.findIndex(item => item.id === content_id)
    if (sentenceIndex > 0) {
      sentenceIndex--
    }
    return filteredItems[sentenceIndex].id
  },
  trainingCardRandom: state => (filter, value) => {
    var filteredItems = state.content.filter(item => {
      if (Array.isArray(item[filter])) {
        return item[filter].includes(value) && item.type === 'words'
      }
      return item.type === 'words' && item[filter] === value
    })
    var random = Math.round(Math.random() * (filteredItems.length - 1))
    return filteredItems[random]
  },
  trainingCardAnswers: state => (filter, value, content_id) => {
    var cards = []
    var filteredItems = state.content.filter(item => {
      if (Array.isArray(item[filter])) {
        return item[filter].includes(value) && item.type === 'words'
      }
      return item.type === 'words' && item[filter] === value
    })
    var wordIndex = filteredItems.findIndex(item => item.id === content_id)
    cards.push(filteredItems[wordIndex])
    filteredItems.splice(wordIndex, 1)
    for (let index = 0; index < 3; index++) {
      var random = Math.round(Math.random() * (filteredItems.length - 1))
      cards.push(filteredItems[random])
      filteredItems.splice(random, 1)
    }
    return shuffle(cards)
  },
  trainingCardNext: state => (filter, value, word_id) => {
    var filteredItems = state.content.filter(item => {
      if (Array.isArray(item[filter])) {
        return item[filter].includes(value) && item.type === 'words'
      }
      return item.type === 'words' && item[filter] === value
    })
    var wordIndex = filteredItems.findIndex(item => item.id === word_id)
    filteredItems.splice(wordIndex, 1)
    var random = Math.round(Math.random() * (filteredItems.length - 1))
    return filteredItems[random]
  },
  isC2L: state => {
    if (state.direction === 'chinese-2-language') {
      return true
    }
    return false
  },
}
