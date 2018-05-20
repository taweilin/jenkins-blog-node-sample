var request = require('supertest');
var mocha = require('mocha');
var chai = require('chai');
chai.should();

describe('Posts Route', () => {
    var server;
    var db;
    beforeEach(function () {
        server = require('../../index');
        db = require('../../models');
    });

    afterEach(function (done) {
        server.close(done);
    });

    after(function () {
        db.sequelize.close();
    });

    it('respond to /posts', function (done) {
        request(server)
            .get('/posts')
            .expect(200, done);
    });
});