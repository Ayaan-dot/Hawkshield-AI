// app/pricing/page.js
'use client';

import { Check, X, Zap, Users, Building, Shield, HelpCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'For individuals and small projects',
      price: billingCycle === 'monthly' ? '$49' : '$490',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      icon: Zap,
      color: 'orange',
      features: [
        { included: true, text: '100 media analyses per month' },
        { included: true, text: 'Image & video detection' },
        { included: true, text: 'Basic API access' },
        { included: true, text: 'Email support' },
        { included: false, text: 'Audio deepfake detection' },
        { included: false, text: 'Batch processing' },
        { included: false, text: 'Priority support' },
        { included: false, text: 'Custom AI models' },
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'For teams and growing businesses',
      price: billingCycle === 'monthly' ? '$299' : '$2,990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      icon: Users,
      color: 'black',
      features: [
        { included: true, text: '1,000 media analyses per month' },
        { included: true, text: 'Image, video & audio detection' },
        { included: true, text: 'Advanced API access' },
        { included: true, text: 'Priority email support' },
        { included: true, text: 'Batch processing (up to 10 files)' },
        { included: true, text: 'Custom webhook integration' },
        { included: false, text: 'Dedicated AI models' },
        { included: false, text: 'SLA guarantee' },
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: 'Custom',
      period: '',
      icon: Building,
      color: 'orange',
      features: [
        { included: true, text: 'Unlimited media analyses' },
        { included: true, text: 'All detection modalities' },
        { included: true, text: 'Full API access with whitelabel' },
        { included: true, text: '24/7 phone & chat support' },
        { included: true, text: 'Unlimited batch processing' },
        { included: true, text: 'Dedicated AI models' },
        { included: true, text: '99.9% SLA guarantee' },
        { included: true, text: 'Custom integration support' },
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'How accurate is Hawkshield AI?',
      answer: 'Our platform achieves 99.7% accuracy in controlled testing environments across 2.1M+ media samples. Real-world accuracy varies based on content quality and type.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. For annual plans, we offer pro-rated refunds for unused months.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'The Professional plan includes a 14-day free trial. The Starter plan has a free tier with 10 analyses per month.',
    },
    {
      question: 'Do you offer discounts for non-profits?',
      answer: 'Yes, we offer special pricing for educational institutions, non-profits, and government agencies. Contact our sales team for details.',
    },
    {
      question: 'How is my data protected?',
      answer: 'All media is encrypted in transit and at rest. We do not store your analysis data after processing unless explicitly requested.',
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'You can upgrade at any time. Downgrades take effect at the next billing cycle. All changes are prorated.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Real-time deepfake detection for every organization. All plans include sub-second latency.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white border border-gray-300 rounded-xl p-1 mb-12">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-black text-white shadow'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-black text-white shadow'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Yearly <span className="ml-2 text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                  plan.popular
                    ? 'border-black shadow-2xl transform scale-105'
                    : 'border-gray-200'
                } transition-all duration-300 hover:shadow-2xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-orange-600 to-black text-white px-6 py-1.5 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-xl ${
                      plan.color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'
                    } mr-4`}>
                      <Icon className={`h-7 w-7 ${
                        plan.color === 'orange' ? 'text-orange-600' : 'text-gray-700'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-xl text-gray-600 ml-2">{plan.period}</span>
                    </div>
                    {plan.price !== 'Custom' && (
                      <p className="text-gray-500 mt-2">
                        {billingCycle === 'yearly' ? 'Billed annually' : 'Billed monthly'}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-10">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                        )}
                        <span
                          className={feature.included ? 'text-gray-800' : 'text-gray-400'}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-orange-600 to-black text-white hover:shadow-2xl hover:-translate-y-1'
                        : plan.color === 'orange'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-orange-500 to-orange-600 text-white hover:shadow-xl'
                        : 'bg-black text-white hover:shadow-xl'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Compare All Features
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 font-semibold text-gray-900">Starter</th>
                  <th className="text-center py-4 font-semibold text-gray-900">Professional</th>
                  <th className="text-center py-4 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Media Analyses per Month', '100', '1,000', 'Unlimited'],
                  ['Image Detection', '✓', '✓', '✓'],
                  ['Video Detection', '✓', '✓', '✓'],
                  ['Audio Detection', '✗', '✓', '✓'],
                  ['Batch Processing', '✗', '✓ (10 files)', '✓ (Unlimited)'],
                  ['API Rate Limit', '10/min', '100/min', 'Custom'],
                  ['Support', 'Email', 'Priority Email', '24/7 Phone & Chat'],
                  ['SLA Guarantee', '✗', '✗', '99.9%'],
                  ['Custom AI Models', '✗', '✗', '✓'],
                  ['Data Retention', '24 hours', '7 days', 'Custom'],
                  ['Real-time Latency', '< 2s', '< 1s', '< 48ms'],
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium text-gray-900">{row[0]}</td>
                    <td className="text-center py-4">
                      <span className={row[1].includes('✓') ? 'text-orange-600 font-bold' : 'text-gray-400'}>
                        {row[1]}
                      </span>
                    </td>
                    <td className="text-center py-4">
                      <span className={row[2].includes('✓') ? 'text-orange-600 font-bold' : 'text-gray-400'}>
                        {row[2]}
                      </span>
                    </td>
                    <td className="text-center py-4">
                      <span className={row[3].includes('✓') ? 'text-orange-600 font-bold' : 'text-gray-400'}>
                        {row[3]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">SOC2 Type II</div>
            <div className="text-gray-600 text-sm">Certified Security</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">99.7%</div>
            <div className="text-gray-600 text-sm">Detection Accuracy</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
            <Clock className="h-8 w-8 text-orange-500 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">48ms</div>
            <div className="text-gray-600 text-sm">Avg. Response Time</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
            <div className="text-2xl font-bold text-gray-900">2.1M+</div>
            <div className="text-gray-600 text-sm">Media Analyzed</div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <HelpCircle className="h-6 w-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 to-bg-gradient-to-r from-orange-500 to-orange-600 from-black to-gray-900 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready for Real-Time Protection?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join 1,000+ companies trusting Hawkshield AI for sub-second deepfake detection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg">
              Start 14-Day Free Trial
            </button>
            <button className="px-10 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-lg">
              Schedule a Demo
            </button>
          </div>
          <p className="text-gray-400 mt-8">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}