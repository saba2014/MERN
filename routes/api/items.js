const express    = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model
const Item = require('../../models/Item');


//@route GET api/items
//@desc Get All Items
//@access Public
router.get('/', (req, res) => {
   Item.find()
       .sort({date: -1})
       .then(items => res.json(items))
});

//@route Post api/items
//@desc Add item to DB
//@access Protected
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        price:req.body.price
    });
    newItem.save()
        .then(item => res.json(item));
});

//@route Delete api/items:id
//@desc Delete item
//@access Public
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success:false}) )
});

//@route Edit api/items:id
//@desc Edit item
//@access Public
router.put('/:id', auth, (req, res) => {
   Item.findByIdAndUpdate(req.params.id, {
       $set: {
           name: req.body.name,
           price:req.body.price
       }
   })
       .then(item => res.json(item))
       .catch(err => res.status(404).json({success:false}))
});


module.exports = router;