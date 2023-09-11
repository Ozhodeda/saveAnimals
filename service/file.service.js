import csv from 'csv-parser'
import fs from 'fs'


export const fileService = {
    loadCSV
}

function loadCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            // .on('error', (err) => reject(err))
    })

}