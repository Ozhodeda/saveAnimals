import cheerio from 'cheerio'
import axios from 'axios'
import { utilService } from './util.service.js'

export const imgService = {
    suggestImgs
}



function suggestImgs(term) {
    const url = `http://www.istockphoto.com/il/photos/${term}`
    return axios.get(url).then(res => {
        const $ = cheerio.load(res.data)
        const topImg = Array.from($('[class*="bOaTkZcdqgXxzJCZECTz"]')).slice(0, 1)
        const imgUrls = topImg.map(img => img.attribs.src)
        return imgUrls
    })
}