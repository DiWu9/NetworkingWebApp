/*
 * Test suite for profile.js
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;

describe('Validate User Info Update and Retrieval', async () => {

    it('get headline', (done) => {
        let regUser = {username: 'dw58', password: '123456'};
        fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regUser)
        }).then(res => { 
            return res.json()
        }).then(res => {
            done();
        });
        fetch(url('/headline/dw58'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => { 
            return res.json()
        }).then(res => {
            expect(res.username).toEqual('dw58');
            expect(res.headline).toEqual('default status');
            done();
        });
        done();
    });

    it('update headline', (done) => {
        let regUser = {username: 'dw58', password: '123456'};
        let newHeadline = {headline: "new headline"};
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regUser)
        }).then(res => { 
            return res.json()
        }).then(res => {
            done();
        });
        fetch(url('/headline'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newHeadline)
        }).then(res => { 
            return res.json()
        }).then(res => {
            expect(res.username).toEqual('dw58');
            expect(res.headline).toEqual('new headline');
            done();
        });
        done();
    });


});