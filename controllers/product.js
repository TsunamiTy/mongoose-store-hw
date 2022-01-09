// ====DEPENDENCIES====
const express = require('express');
const productRouter = express.Router();
const Product = require('../models/products')
const productSeed = require('../models/productSeed.js')

// ====routes====

// ====seed====
productRouter.get('/products/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});
    Product.create(productSeed, (err, data) => {
            res.redirect('/products');
        }
    );
});

// ====index====
productRouter.get('/', (req, res) => {
    Product.find({}, (err, products) => {
    res.render('index.ejs', { products });
    });
});

// ====new====
productRouter.get('/new', (req, res) => {
    res.render('new');
});
// ====show====
productRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
         });
    });
});

// ====create====
productRouter.post('/', (req, res) => {
    Product.create(req.body, (err, product) => {
        res.redirect('/products');
    });
});


// ====edit====
productRouter.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        })
    })
})

// ====updtate====
productRouter.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedProduct) => {
            res.redirect(`/products/${req.params.id}`)
        }
    )
})

// ====delete====
productRouter.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/products')
    })
})

// ====buy====
productRouter.post('/:id', (req, res) => 
    Product.findByIdAndUpdate(req.params.id, (err, data) => {
        if (req.body.qty > '0' ) {
            req.body.buy = true
        } else {
            req.body.buy = false
        }
    }))

// ====EXPORTS====
module.exports = productRouter; 
