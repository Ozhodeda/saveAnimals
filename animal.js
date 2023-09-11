import { fileService } from "./service/file.service.js";
import { imgService } from './service/img.service.js'
import { utilService } from "./service/util.service.js"

fileService.loadCSV('./data/animals.csv')
    .then(animals => {

        const animalImgPrm = animals.map(animal => imgService.suggestImgs(animal[' name']))

        return Promise.all(animalImgPrm).then(animalImgUrls => {
            animals.forEach((animal, index) => {
                animal.imgURL = animalImgUrls[index]
            })
            return animals
        })
    })

    .then(animalsWithImgUrls => {

        const urlPrms = animalsWithImgUrls.map(animal => utilService.download(animal.imgURL[0], `data/${animal[' name']}.jpg`))

        return Promise.all(urlPrms).then(() => animalsWithImgUrls)
    })

    .then(animalsWithImgUrls => console.log('res:', animalsWithImgUrls))