var superagent = require('superagent')
var expect = require('expect.js')

describe('express rest api server', function(){
  var id;
  var english = 'new English part of the sentence';
  var chinese = '句子新的中文部分';
    
  it('create(post) object', function(done){
    superagent.post('http://localhost:3000/api/v1/sentences/')
      .send({ chinese: 'chinese',
              english: 'english'
      })
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.id).not.to.eql(null);
        id = res.body.id;
        done()
      })
  })

  it('retrieves(get) an object', function(done){
    superagent.get('http://localhost:3000/api/v1/sentences/' + id)
      .end(function(e, res){
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.id).to.eql(id)
        done()
      })
  })

  it('retrieves(get) a collection', function(done){
    superagent.get('http://localhost:3000/api/v1/sentences/')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.rows.length).to.be.above(0)
        done()
      })
  })

  it('updates(put) an object', function(done){
    superagent.put('http://localhost:3000/api/v1/sentences/' + id)
      .send({english: english
        , chinese: chinese})
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object');
        expect(res.body.english).to.eql(english);
        expect(res.body.chinese).to.eql(chinese);
        done()
      })
  })

  it('checks an updated object', function(done){
    superagent.get('http://localhost:3000/api/v1/sentences/' + id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.english).to.eql(english);
        expect(res.body.chinese).to.eql(chinese);
        done()
      })
  })
  it('removes(delete) an object', function(done){
    superagent.del('http://localhost:3000/api/v1/sentences/' + id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.message).to.eql('success');        
        done()
      })
  })
})
