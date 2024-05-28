const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const tracer = require('tracer');

const { expect } = chai;

chai.should();
chai.use(chaiHttp);
tracer.setLevel('warn');

const endpointToTest = '/api/workshop';

//TODO: Needs finishing later when there is authentication

describe('Workshop create endpoint', () => {
    beforeEach((done) => {
        console.log('Running test');
        done();
    });

    it('should return 400 status code when creating a workshop without a name', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .send({
                category: 'Test Category',
                description: 'Test Description',
                picture: 'Test Picture',
                materials: 'Test Materials',
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Name is required and must be a string.');
                done();
            });
    });

    
    it.skip('should return 200 status code when creating a workshop', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .send({
                name: 'Test Workshop',
                category: 'Test Category',
                description: 'Test Description',
                picture: 'Test Picture',
                materials: 'Test Materials',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});