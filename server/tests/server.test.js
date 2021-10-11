/**
 * @jest-environment node
 */

const supertest = require('supertest')
const app = require('../app')
var fs = require('fs');

const testImage = `${__dirname}/../../assets/mqlogo.png`

const api = supertest(app)

describe('Upload endpoint', () => {

  test('Successfully uploads an image', (done) => {
      api.post(`/images/`)
         .attach("imageFile",testImage,
                { contentType: 'application/octet-stream' })
         .expect(200)
         .expect('/images/mqlogo.png')
         .then(() => {
           api.get('/images/mqlogo.png')
              .expect(200)
              .then(() => {
                done()
             })
         })
  })

  afterEach( () => {
     fs.unlinkSync(`${__dirname}/../../images/mqlogo.png`)
  })

})