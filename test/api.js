var should = require("should");
var server = require("supertest").agent("http://localhost:8080");

describe('all pledges api', function() {
  it('should return some pledges', function(done) {
    server
        .get('/api/all/pledges')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            if(err) throw err;
            res.status.should.equal(200);
            res.body.length.should.be.above(0);
            res.body[0].title.should.be.String;
            done();
        });
    });
});