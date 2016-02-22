var should = require("should");
var server = require("supertest").agent("http://localhost:" + process.env.PORT);

describe('pledges api', function() {
    var pledgeId;
    
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
                
                pledgeId = res.body[0]._id;
                done();
            });
    });

    it('should add me to a pledge', function(done) {
        server
            .post('/api/my/pledge/' + pledgeId)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                if(err) throw err;
                res.status.should.equal(200);
                done();
            });
    });

    it('should return the pledge I was added to', function(done) {
        server
            .get('/api/my/pledges')
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                if(err) throw err;
                res.status.should.equal(200);
                res.body.length.should.equal(1);
                done();
            });
    });

    it('should remove me from a pledge', function(done) {
        server
            .delete('/api/my/pledge/' + pledgeId)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                if(err) throw err;
                res.status.should.equal(200);
                done();
            });
    });

    it('should check the pledge was removed', function(done) {
        server
            .get('/api/my/pledges')
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                if(err) throw err;
                res.status.should.equal(200);
                res.body.length.should.equal(0);
                done();
            });
    });
});
