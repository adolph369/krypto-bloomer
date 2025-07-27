import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../src/models/User'
import Flower from '../src/models/Flower'
import Trade from '../src/models/Trade'
import Order from '../src/models/Order'

dotenv.config()

const flowers = [
  {
    name: 'Red Roses Bouquet',
    description: 'Classic red roses perfect for expressing love and passion. Hand-picked and arranged by our expert florists.',
    price: 49.99,
    category: 'Roses',
    image: '🌹',
    stock: 25,
    rating: 4.8
  },
  {
    name: 'Spring Tulips Mix',
    description: 'Colorful tulips that bring the freshness of spring to any occasion. Available in multiple colors.',
    price: 34.99,
    category: 'Tulips',
    image: '🌷',
    stock: 30,
    rating: 4.6
  },
  {
    name: 'Elegant White Orchids',
    description: 'Sophisticated white orchids that symbolize luxury and strength. Perfect for special occasions.',
    price: 79.99,
    category: 'Orchids',
    image: '🌺',
    stock: 15,
    rating: 4.9
  },
  {
    name: 'Bright Sunflowers',
    description: 'Cheerful sunflowers that bring sunshine and happiness to any room. Symbol of loyalty and adoration.',
    price: 39.99,
    category: 'Sunflowers',
    image: '🌻',
    stock: 20,
    rating: 4.7
  },
  {
    name: 'Pink Lilies Arrangement',
    description: 'Delicate pink lilies arranged beautifully. Perfect for expressing admiration and gratitude.',
    price: 54.99,
    category: 'Lilies',
    image: '🌸',
    stock: 18,
    rating: 4.5
  },
  {
    name: 'Mixed Seasonal Bouquet',
    description: 'A beautiful mix of seasonal flowers carefully selected and arranged by our florists.',
    price: 44.99,
    category: 'Mixed',
    image: '💐',
    stock: 22,
    rating: 4.6
  },
  {
    name: 'Exotic Bird of Paradise',
    description: 'Stunning exotic flowers that make a bold statement. Perfect for modern and contemporary settings.',
    price: 89.99,
    category: 'Exotic',
    image: '🌺',
    stock: 10,
    rating: 4.8
  },
  {
    name: 'Purple Lavender Bundle',
    description: 'Fragrant lavender bundles that provide relaxation and tranquility. Great for aromatherapy.',
    price: 29.99,
    category: 'Mixed',
    image: '🌾',
    stock: 35,
    rating: 4.4
  }
]

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/cryptobloom')
    console.log('Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Flower.deleteMany({})
    await Trade.deleteMany({})
    await Order.deleteMany({})
    console.log('Cleared existing data')

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@cryptobloom.com',
      password: 'admin123',
      role: 'admin',
      wallet: 10000,
      emailVerified: true
    })
    await adminUser.save()

    // Create moderator user
    const moderatorUser = new User({
      username: 'moderator',
      email: 'moderator@cryptobloom.com',
      password: 'mod123',
      role: 'moderator',
      wallet: 5000,
      emailVerified: true
    })
    await moderatorUser.save()

    // Create test users
    const testUsers = []
    for (let i = 1; i <= 5; i++) {
      const user = new User({
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: 'password123',
        role: 'user',
        wallet: Math.floor(Math.random() * 5000) + 1000,
        emailVerified: true
      })
      await user.save()
      testUsers.push(user)
    }

    console.log('Created users')

    // Seed flowers
    await Flower.insertMany(flowers)
    console.log('Seeded flowers')

    // Create sample trades
    const sampleTrades = []
    const currencies = ['BTC', 'ETH', 'ADA', 'DOT']
    const types = ['buy', 'sell']
    const statuses = ['completed', 'pending', 'cancelled']

    for (let i = 0; i < 20; i++) {
      const randomUser = testUsers[Math.floor(Math.random() * testUsers.length)]
      const trade = new Trade({
        userId: randomUser._id,
        type: types[Math.floor(Math.random() * types.length)],
        currency: currencies[Math.floor(Math.random() * currencies.length)],
        amount: Math.random() * 10,
        price: Math.random() * 50000 + 1000,
        status: statuses[Math.floor(Math.random() * statuses.length)]
      })
      sampleTrades.push(trade)
    }

    await Trade.insertMany(sampleTrades)
    console.log('Created sample trades')

    // Create sample orders
    const sampleOrders = []
    const orderStatuses = ['pending', 'processing', 'shipped', 'delivered']
    const flowerDocs = await Flower.find()

    for (let i = 0; i < 15; i++) {
      const randomUser = testUsers[Math.floor(Math.random() * testUsers.length)]
      const randomFlower = flowerDocs[Math.floor(Math.random() * flowerDocs.length)]
      const quantity = Math.floor(Math.random() * 3) + 1
      
      const order = new Order({
        userId: randomUser._id,
        items: [{
          flowerId: randomFlower._id,
          name: randomFlower.name,
          price: randomFlower.price,
          quantity
        }],
        total: randomFlower.price * quantity,
        status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
        shippingAddress: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          country: 'USA'
        },
        paymentMethod: 'wallet',
        trackingNumber: Math.random() > 0.5 ? `CB${Date.now()}${i}` : undefined
      })
      sampleOrders.push(order)
    }

    await Order.insertMany(sampleOrders)
    console.log('Created sample orders')

    console.log('✅ Database seeded successfully!')
    console.log('Admin credentials: admin@cryptobloom.com / admin123')
    console.log('Moderator credentials: moderator@cryptobloom.com / mod123')
    console.log('Test user credentials: user1@example.com / password123 (user1-user5)')

  } catch (error) {
    console.error('❌ Seeding failed:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

seedDatabase()