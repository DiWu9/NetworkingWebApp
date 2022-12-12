/*
 * Test suite for auth.js
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;

describe('Validate Registration and Login functionality', async () => {

    it('register new user', (done) => {
        let regUser = {username: 'dw58', password: '123456'};
        fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regUser)
        }).then(res => { 
            return res.json()
        }).then(res => {
            expect(res.username).toEqual('dw58');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('login user', (done) => {
        let loginUser = {username: 'dw58', password: '123456'};
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser)
        }).then(res => {
            return res.json()
        }).then(res => {
            expect(res.username).toEqual('dw58');
            expect(res.result).toEqual('success');
            done();
        });
        done();
    });

    it('logout user', (done) => {
        let loginUser = {username: 'dw58', password: '123456'};
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser)
        }).then(res => {
            return res.json()
        }).then(res => {
            expect(res.username).toEqual('dw58');
            expect(res.result).toEqual('success');
            done();
        });
        fetch(url('/logout'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            return res.json()
        }).then(res => {
            expect(res.statusCode).toBe(200);
            done();
        });
        done();
    });


});