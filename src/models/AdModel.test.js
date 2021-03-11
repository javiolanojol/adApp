const mongoose = require('mongoose');
const Ad = require("./Ad")
const {getAllAds,createAd,deleteSingleAd} = require("../utils/adsUtils")
const path = require('../../globalConfig.json')

const title = "title";
const description = "description";

describe('Ad model',()=>{

    beforeAll(async () => {
        await mongoose.connect(path.mongoUri,
            { useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false },
            (err) => {if (err) {
                console.error(err);
                process.exit(1);
            }
            });
    });


    describe ('Ad Model Read', () => {

        it('should return the correct number of ads succesfully', async () => {

            const validAd = await createAd(title,description);
            await validAd.save();
            const adList = await getAllAds();

            expect(adList).toHaveLength(1);

        })


    })

    describe('Ad model creation', ()=>{

        it('should create an Ad succesfully', async ()=> {

            let validAd = await createAd(title,description);
            validAd = await validAd.save();

            expect(validAd._id).toBeDefined();
            expect(validAd.title).toBe(title);
            expect(validAd.description).toBe(description);
            expect(validAd.publicationDate).toBeDefined();

        })

    })
    describe ('Ad Model Delete', ()=>{

        it('should delete an Ad succesfully', async () => {

            let validAd = await createAd(title,description) ;
            validAd = await validAd.save();
            await deleteSingleAd({_id:validAd._id});
            const result = await Ad.findById({_id:validAd._id});

            expect(result).toBeNull();

        })

    })



    afterAll(done => {
        mongoose.connection.close()
        done();
    })



})