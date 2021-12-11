const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const BlueBird = require('bluebird');
const Trades = require('../models/trades');

chai.use(chaiHttp);

const setup = (...userObjects) => {
    return BlueBird.mapSeries(userObjects, user => {
        return chai.request(server)
            .post('/trades')
            .send(user)
            .then(response => {
                return response.body;
            })
    })
}

describe('stock_trades_api_medium', () => {
    const user23_buy_ABX = {
        "type": "buy",
        "user_id": 23,
        "symbol": "ABX",
        "shares": 30,
        "price": 134,
        "timestamp": 1531522701000
    }

    const user23_sell_AAC = {
        "type": "sell",
        "user_id": 23,
        "symbol": "AAC",
        "shares": 12,
        "price": 133,
        "timestamp": 1521522701000
    }

    const user24_sell_AAC = {
        "type": "sell",
        "user_id": 24,
        "symbol": "AAC",
        "shares": 12,
        "price": 133,
        "timestamp": 1511522701000
    }

    const user25_sell_AAC = {
        "type": "sell",
        "user_id": 25,
        "symbol": "AAC",
        "shares": 12,
        "price": 111,
        "timestamp": 1501522701000
    }



    beforeEach(async () => {
        await Trades.sync();
    })

    afterEach(async () => {
        await Trades.drop();
    })

    it('should create a new trade of buy type', async () => {
        const response = await chai.request(server).post('/trades').send(user23_buy_ABX)
        response.should.have.status(201);
        delete response.body.id;
        response.body.should.eql(user23_buy_ABX)
    });

    it('should create a new trade of sell type', async () => {
        const response = await chai.request(server).post('/trades').send(user23_sell_AAC)
        response.should.have.status(201);
        delete response.body.id;
        response.body.should.eql(user23_sell_AAC)
    });

    it('should fetch all the trades', async () => {
        const results = await setup(user25_sell_AAC, user24_sell_AAC, user23_sell_AAC, user23_buy_ABX);
        const response = await chai.request(server).get('/trades')
        response.should.have.status(200);
        response.body.should.eql(results);
    })

    it('should fetch no trades if the type filter value does not exist', async () => {
        await setup(user25_sell_AAC, user24_sell_AAC, user23_sell_AAC, user23_buy_ABX);
        const response = await chai.request(server).get('/trades?type=test')
        response.should.have.status(200);
        response.body.should.eql([]);
    })

    it('should fetch all trades for a user', async () => {
        const trades = await setup(user25_sell_AAC, user24_sell_AAC, user23_sell_AAC, user23_buy_ABX);
        const response = await chai.request(server).get('/trades?user_id=23')
        response.should.have.status(200);
        response.body.should.eql([trades[2], trades[3]]);
    })

    it('should fetch no trades if user filter value does not exist', async () => {
        await setup(user25_sell_AAC, user24_sell_AAC, user23_sell_AAC, user23_buy_ABX);
        const response = await chai.request(server).get('/trades?user_id=3233')
        response.should.have.status(200);
        response.body.should.eql([]);
    })

    it('should fetch all buy trades for a user',  async () => {
        const trades = await setup(user25_sell_AAC, user24_sell_AAC, user23_sell_AAC, user23_buy_ABX);
        const response = await chai.request(server).get('/trades?user_id=23&type=buy')
        response.should.have.status(200);
        response.body.should.eql([trades[3]]);
    })

    it('should fetch all sell trades for a user',  async () => {
        const trades = await setup(user25_sell_AAC, user24_sell_AAC, user23_sell_AAC, user23_buy_ABX);
        const response = await chai.request(server).get('/trades?user_id=23&type=sell')
        response.should.have.status(200);
        response.body.should.eql([trades[2]]);
    })

    it('should fetch a single trade', async () => {
        const [trade] = await setup(user23_buy_ABX);
        const response = await chai.request(server).get(`/trades/${trade.id}`)
        response.should.have.status(200);
        response.body.should.eql(trade);
    })

    it('should get 404 if the trade ID does not exist', async () => {
        const response = await chai.request(server).get(`/trades/32323`)
        response.should.have.status(404);
        response.text.should.eql('ID not found');
    })

    it('should get 405 for a put request to /trades/:id', async () => {
        const [trade] = await setup(user23_buy_ABX);
        const response = await chai.request(server).put(`/trades/${trade.id}`).send(user23_buy_ABX)
        response.should.have.status(405);
    })

    it('should get 405 for a patch request to /trades/:id', async () => {
        const [trade] = await setup(user23_buy_ABX);
        const response = await chai.request(server).patch(`/trades/${trade.id}`).send(user23_buy_ABX)
        response.should.have.status(405);
    })

    it('should get 405 for a delete request to /trades/:id', async () => {
        const [trade] = await setup(user23_buy_ABX);
        const response = await chai.request(server).delete(`/trades/${trade.id}`)
        response.should.have.status(405);
    })
});
