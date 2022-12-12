/*
 * Test suite for article.js
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;

describe('Validate Article/Post Functionalities', async () => {

    it('post article', (done) => {
        let regUser = {username: 'dw58', password: '123456'};
        let article = {text: "post content"};
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
        fetch(url('/article'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(article)
        }).then(res => { 
            return res.json()
        }).then(res => {
            expect(res.articles.length).toEqual(1);
            done();
        });
        done();
    });

    it('get articles', (done) => {
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
        fetch(url('/articles/1'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => { 
            return res.json()
        }).then(res => {
            expect(res.articles.length).toEqual(1);
            done();
        });
        fetch(url('/articles/2'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => { 
            return res.json()
        }).then(res => {
            expect(res.articles.length).toEqual(0);
            done();
        });
        done();
    });

    it('get article by id', (done) => {
        let regUser = {username: 'dw58', password: '123456'};
        let article = {text: "post content"};
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
        fetch(url('/articles'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => { 
            return res.json()
        }).then(res => {
            expect(res.articles.length).toEqual(1);
            done();
        });
        done();
    });


});