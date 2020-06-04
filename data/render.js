const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const _ = require('lodash')

const DATA_SRC_FOLDER = './data'
const DATA_DST_FOLDER = './src/store/modules/vocabulary/data'
const DATA_DST_FILE = 'content.json'
const GROUPS_DST_FILE = 'groups.json'
const CATEGORIES_DEST_FILE = 'categories.json'
const LESSONS_DEST_FILE = 'lessons.json'
const VOCABULARY_FOLDER = 'vocabulary'
const AUDIO_FOLDER = 'audio'
const AUDIO_DST_FOLDER = './public/assets/audio'
const WORDS_FOLDER = 'words'
const SENTENCES_FOLDER = 'sentences'
const LANGUAGES = ['de', 'en']

const hyphen = {}
LANGUAGES.forEach(lang => {
  hyphen[lang] = require('hyphen/' + lang)
})

var folders = _.remove(fs.readdirSync(DATA_SRC_FOLDER + '/' + VOCABULARY_FOLDER), function(n) {
  return fs.lstatSync(DATA_SRC_FOLDER + '/' + VOCABULARY_FOLDER + '/' + n).isDirectory()
})

const audio = []
const files = []
const data = []
const categories = []
const groups = []
const lessons = []
const translations = {
  de: { categories: {}, vocabulary: {}, groups: {} },
  en: { categories: {}, vocabulary: {}, groups: {} },
}
folders.forEach(item => {
  let tmpFolder = fs.readdirSync(DATA_SRC_FOLDER + '/' + VOCABULARY_FOLDER + '/' + item)
  tmpFolder.forEach(file => {
    let extension = path.extname(file)
    let category = path.basename(file, extension)
    files.push({
      path: DATA_SRC_FOLDER + '/' + VOCABULARY_FOLDER + '/' + item + '/' + file,
      category: category,
      type: item,
    })
    if (item === WORDS_FOLDER) {
      if (categories.findIndex((element, category) => element === category) === -1) {
        categories.push(category)
      }
    } else if (item === SENTENCES_FOLDER) {
      if (groups.findIndex((element, category) => element === category) === -1) {
        groups.push(category)
      }
    }
  })
})

files.forEach(item => {
  let tmpRawData = fs.readFileSync(item.path)
  let tmpData = JSON.parse(tmpRawData)
  LANGUAGES.forEach(lang => {
    if (item.type === SENTENCES_FOLDER) {
      translations[lang]['groups'][tmpData.category] = {
        name: hyphen[lang].hyphenateSync(tmpData.translations[lang].name),
        description: hyphen[lang].hyphenateSync(tmpData.translations[lang].description),
      }
    } else if (item.type === WORDS_FOLDER) {
      translations[lang]['categories'][tmpData.category] = hyphen[lang].hyphenateSync(tmpData.translations[lang])
    }
  })
  tmpData.vocabulary.forEach(element => {
    let source_path =
      DATA_SRC_FOLDER + '/' + AUDIO_FOLDER + '/' + item.type + '/' + item.category + '/' + element.id + '.mp3'
    let destination_path = AUDIO_DST_FOLDER + '/' + item.type + '/' + item.category + '/' + element.id + '.mp3'
    if (fs.existsSync(source_path)) {
      audio.push({
        id: item.id,
        source_path: source_path,
        destination_path: destination_path,
        category: item.category,
        type: item.type,
      })
      element['audio'] = element.id + '.mp3'
    } else {
      element['audio'] = ''
    }
    if (typeof element.translations !== 'undefined') {
      LANGUAGES.forEach(lang => {
        if (typeof element.translations[lang] !== 'undefined') {
          translations[lang]['vocabulary'][element.id] = hyphen[lang].hyphenateSync(element.translations[lang])
        }
      })
    }

    if (typeof element.lesson !== 'undefined') {
      if (lessons.indexOf(element.lesson) === -1 && element.lesson !== '') {
        lessons.push(element.lesson)
      }
    } else {
      element['lesson'] = ''
    }
    _.unset(element, 'translations')
    element['type'] = item.type
    element['category'] = item.category
    data.push(element)
  })
})

LANGUAGES.forEach(lang => {
  let rawLang = JSON.parse(fs.readFileSync('./src/lang/' + lang + '.json'))
  rawLang = _.merge(rawLang, translations[lang])
  fs.writeFileSync('./src/lang/' + lang + '.json', JSON.stringify(rawLang), {
    encoding: 'utf8',
    flag: 'w',
    mode: 0o666,
  })
  console.info('File written: ' + './src/lang/' + lang + '.json')
})
const rawData = JSON.stringify(data)
fs.writeFileSync(DATA_DST_FOLDER + '/' + DATA_DST_FILE, rawData, {
  encoding: 'utf8',
  flag: 'w',
  mode: 0o666,
})
console.info('File written: ' + DATA_DST_FOLDER + '/' + DATA_DST_FILE)

const rawDataCategories = JSON.stringify(categories)
fs.writeFileSync(DATA_DST_FOLDER + '/' + CATEGORIES_DEST_FILE, rawDataCategories, {
  encoding: 'utf8',
  flag: 'w',
  mode: 0o666,
})
console.info('File written: ' + DATA_DST_FOLDER + '/' + CATEGORIES_DEST_FILE)

const rawDataGroups = JSON.stringify(groups)
fs.writeFileSync(DATA_DST_FOLDER + '/' + GROUPS_DST_FILE, rawDataGroups, {
  encoding: 'utf8',
  flag: 'w',
  mode: 0o666,
})
console.info('File written: ' + DATA_DST_FOLDER + '/' + GROUPS_DST_FILE)

const rawDataLessons = JSON.stringify(lessons)
fs.writeFileSync(DATA_DST_FOLDER + '/' + LESSONS_DEST_FILE, rawDataLessons, {
  encoding: 'utf8',
  flag: 'w',
  mode: 0o666,
})
console.info('File written: ' + DATA_DST_FOLDER + '/' + LESSONS_DEST_FILE)

// copying audio files
fse.emptyDirSync(AUDIO_DST_FOLDER)
audio.forEach(item => {
  fse.copySync(item.source_path, item.destination_path)
})
console.info('Audio files are copied to: ' + AUDIO_DST_FOLDER)
