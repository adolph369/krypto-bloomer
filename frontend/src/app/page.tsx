'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Flower, Shield, Users, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function HomePage() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user.username}!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ready to continue your CryptoBloom journey?
            </p>
            <Link href="/dashboard" className="btn-primary inline-flex items-center">
              Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Crypto<span className="text-secondary-300">Bloom</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              The revolutionary SaaS platform that combines cryptocurrency trading 
              with premium flower delivery services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
                Start Trading & Blooming
              </Link>
              <Link href="/auth/login" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-secondary-400/30 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-24 h-24 bg-primary-400/30 rounded-full blur-xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CryptoBloom?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of financial innovation and natural beauty
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Advanced Crypto Trading',
                description: 'Trade Bitcoin, Ethereum, and other cryptocurrencies with professional-grade tools and real-time analytics.',
                gradient: 'gradient-crypto'
              },
              {
                icon: Flower,
                title: 'Premium Flower Delivery',
                description: 'Send beautiful, fresh flowers worldwide with same-day delivery and personalized arrangements.',
                gradient: 'gradient-flower'
              },
              {
                icon: Shield,
                title: 'Bank-Level Security',
                description: 'Your funds and personal data are protected with military-grade encryption and multi-factor authentication.',
                gradient: 'gradient-primary'
              },
              {
                icon: Users,
                title: 'Community Driven',
                description: 'Join thousands of traders and flower enthusiasts in our vibrant, supportive community.',
                gradient: 'gradient-secondary'
              },
              {
                icon: BarChart3,
                title: 'Real-Time Analytics',
                description: 'Make informed decisions with comprehensive market data, charts, and AI-powered insights.',
                gradient: 'gradient-crypto'
              },
              {
                icon: ArrowRight,
                title: 'Seamless Integration',
                description: 'Use your crypto profits to send flowers, or earn rewards through our unique loyalty program.',
                gradient: 'gradient-flower'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                <div className={`w-12 h-12 ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who are already trading crypto and sending flowers
            </p>
            <Link href="/auth/register" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}