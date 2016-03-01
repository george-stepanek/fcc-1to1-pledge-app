var should = require("should");
var server = require("supertest").agent("http://localhost:" + process.env.PORT);

describe('pledges api', function() {
    var category, pledgeId;
    
    it('should get some categories', function(done) {
        server
            .get('/api/all/categories')
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                if(err) throw err;
                res.status.should.equal(200);
                res.body.length.should.be.above(0);
                category = res.body[0].title;
                done();
            });
    });
    
    it('should get pledges for a category', function(done) {
        server
            .get('/api/category/pledges/' + category)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                if(err) throw err;
                res.status.should.equal(200);
                res.body.length.should.be.above(0);
                pledgeId = res.body[0].title.toLowerCase().replace(/\s/g, "-");
                done();
            });
    });

    it('should get a specific pledge', function(done) {
        server
            .get('/api/pledge/' + pledgeId)
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                if(err) throw err;
                res.status.should.equal(200);
                res.body.title.should.be.String;
                done();
            });
    });

    it('should search a pledge', function(done) {
        server
            .get('/api/search/pledges?q=straws+suck')
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                if(err) throw err;
                res.status.should.equal(200);
                res.body.length.should.equal(1);
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
