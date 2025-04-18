
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for trying out our platform",
    features: [
      "5 AI image generations per month",
      "Access to basic templates",
      "Standard image resolution",
      "Community support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    price: "19",
    description: "Great for individuals and small teams",
    features: [
      "100 AI image generations per month",
      "Access to all templates",
      "High resolution images",
      "Priority support",
      "Brand kit (1 brand)",
      "Remove watermarks"
    ],
    cta: "Subscribe",
    popular: true
  },
  {
    name: "Business",
    price: "49",
    description: "For teams and growing businesses",
    features: [
      "Unlimited AI image generations",
      "Access to all templates and premium content",
      "Highest resolution images",
      "Priority support with dedicated manager",
      "Multiple brand kits (5 brands)",
      "Team collaboration features",
      "API access"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      
      <main className="pt-8 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-3 bg-blue-100 hover:bg-blue-100 text-blue-800 border-none">
              Pricing
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 font-poppins mb-6">
              Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Pricing</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Choose the plan that works best for your needs. All plans include access to our core features.
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`border ${plan.popular ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : 'border-gray-200'} rounded-xl overflow-hidden`}>
                  {plan.popular && (
                    <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="pb-0">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                      <div className="mb-2 flex items-end justify-center">
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="text-gray-500 ml-1">/month</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">Find answers to common questions about our plans and pricing.</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "Can I switch plans later?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, PayPal, and certain regional payment methods. Contact us for enterprise billing options."
                },
                {
                  q: "Do you offer refunds?",
                  a: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team within this period."
                },
                {
                  q: "What happens when I reach my monthly generation limit?",
                  a: "You can purchase additional generation credits or upgrade to a higher plan to continue using the service."
                },
                {
                  q: "Do you offer custom enterprise plans?",
                  a: "Yes, we offer tailored solutions for enterprise customers with custom needs. Please contact our sales team for details."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Start transforming your words into stunning visuals today with our no-risk free trial.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
