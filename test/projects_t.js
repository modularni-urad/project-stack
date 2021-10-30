/* global describe it */
import _ from 'underscore'
const chai = require('chai')
chai.should()

module.exports = (g) => {
  //
  const r = chai.request(g.baseurl)

  const p = {
    nazev: 'proj1',
    popis: 'popis proj1',
    poloha: '47;31',
    zanr: 'zivpros'
  }

  return describe('projects', () => {
    //
    it('must not create a new item without auth', async () => {
      const res = await r.post(`/`).send(p)
      res.should.have.status(400)
    })

    it('shall create a new item without mandatory item', async () => {
      const res = await r.post(`/`).send(_.omit(p, 'nazev'))
        .set('Authorization', 'Bearer f')
      res.should.have.status(400)
    })

    // it('must not create a new item without appropriate group', async () => {
    //   const res = await r.post(`/`).send(p)
    //     .set('Authorization', 'Bearer f')
    //   res.should.have.status(400)
    // })

    it('shall create a new item pok1', async () => {
      g.mockUser.groups = [ 'admins' ]
      const res = await r.post(`/`).send(p).set('Authorization', 'Bearer f')
      res.should.have.status(200)
      res.should.have.header('content-type', /^application\/json/)
      const all = await r.get(`/`)
      p.id = all.body[0].id
    })

    it('shall update the item pok1', async () => {
      const change = {
        nazev: 'pok1changed'
      }
      const res = await r.put(`/${p.id}`)
        .send(change).set('Authorization', 'Bearer f')
      res.should.have.status(200)
    })

    it('shall get all items', async () => {
      const res = await r.get(`/`)
      res.body.length.should.eql(1)
      res.body[0].nazev.should.eql('pok1changed')
      res.should.have.status(200)
    })
  })
}
