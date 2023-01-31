const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Prerolls' },
    { name: 'Edibles' },
    { name: 'Flower' },
    { name: 'Extracts' },
    { name: 'Tinctures' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Pink Cookies',
      description:
        'Also known as wedding cake. Pepper, sweet, spicy, and earthy',
      image: 'flower-picture.jpeg',
      category: categories[2]._id,
      price: 6.00,
      quantity: 50,
      denomination: 'Indica'
    },
    {
      name: 'Safety Meeting',
      description:
        'Helps revieve stress. As a strong smell with skucky, melon, and earthy flavors.',
      image: 'flower-picture.jpeg',
      category: categories[2]._id,
      price: 10.00,
      quantity: 50,
      denomination: 'Hybrid' 
    },
    {
      name: 'Mimosa',
      category: categories[2]._id,
      description:
        '',
      image: 'flower-picture.jpeg',
      price: 12.00,
      quantity: 20,
      denomination: "Sativa"
    },
    {
      name: 'Bonkers',
      category: categories[3]._id,
      description:
        'Cross between lemon tree and cookies and cream. Very strong lemon taste.',
      image: 'cart.jpeg',
      price: 40.00,
      quantity: 50,
      denomination: 'Hybrid' 
    },
    {
      name: '1:1 Lifted Sative',
      category: categories[4]._id,
      description:
        'Supports memory, focus and mood.',
      image: 'tincture.jpeg',
      price: 25.00,
      quantity: 10,
      denomination: 'Sativa'
    },
    {
      name: '1:1 Lifted Indica',
      category: categories[4]._id,
      description:
        'Supports relaxation, pain relief and sleep.',
      image: 'tincture.jpeg',
      price: 25.00,
      quantity: 30,
      denomination: 'Indica' 
    },
    {
      name: 'Deep Sleep',
      category: categories[4]._id,
      description:
        'Srrong indica. Contains THC, CDB, and CBN. CBN promotes sleep at cannibinoid receptors',
      image: 'tincture.jpeg',
      price: 45.00,
      quantity: 30,
      denomination: 'Indica' 
    },
    {
      name: 'Dutch Treat',
      category: categories[0]._id,
      description:
        'Pine flavors. Cross between northern lights and haze. Focuses on reducing stress and relaxation. Leaves user with an uplifting and euphoric high.',
      image: 'preroll.jpeg',
      price: 5.00,
      quantity: 10,
      denomination: 'Hybrid'
    },
    {
      name: 'Grand Daddy Purple',
      category: categories[0]._id,
      description: 'Most popular indica strain that promotes sleep. Flower has a deep purple bud with orange hairs. Helps with insomnia, stress, pain and muscle spasms.',
      image: 'preroll.jpeg',
      price: 6.00,
      quantity: 10,
      denomination: 'Indica' 
    },
    {
      name: 'Cheetah Piss',
      category: categories[2]._id,
      description:
        'This strain gives an arousing, giggly and uplifting high. Cross between lemonnade, gelato 42 and london pound cake 97.',
      image: 'flower-picture.jpeg',
      price: 30.00,
      quantity: 10,
      denomination: 'Hybrid' 
    },
    {
      //If possible i want to do a dropdown menu of flavors.
      name: 'Drinks',
      category: categories[1]._id,
      description:
        '',
      image: 'edibles.jpeg',
      price: 12.00,
      quantity: 100,
      denomination: 'Hybrid'
    },
    {
      name: 'Chocolates',
      category: categories[1]._id,
      description:
        '',
      image: 'edibles.jpeg',
      price: 25.00,
      quantity: 60,
      denomination: 'Hybrid' 
    },
    {
      name: 'Gummies',
      category: categories[1]._id,
      description:
        '',
      image: 'edibles.jpeg',
      price: 20.00,
      quantity: 60,
      denomination: 'Hybrid' 
    },
    {
      name: 'Hard Candy',
      category: categories[1]._id,
      description:
        '',
      image: 'edibles.jpeg',
      price: 15.00,
      quantity: 60,
      denomination: 'Hybrid' 
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
