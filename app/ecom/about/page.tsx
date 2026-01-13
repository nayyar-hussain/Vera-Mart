import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'

function page() {
  return (
     <div className="container mx-auto px-4 py-10 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        About Our Store
      </h1>

      {/* About Us */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Who We Are</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          We are a trusted ecommerce platform providing high-quality products at
          affordable prices. Our goal is to give customers a smooth, secure, and
          satisfying online shopping experience.
        </CardContent>
      </Card>

      {/* Products */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Our Products</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          We offer a wide range of products including fashion, electronics, and
          daily-use items. All products are carefully selected and quality-checked
          before delivery.
        </CardContent>
      </Card>

      {/* Delivery Policy */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Delivery Information</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          <ul className="list-disc pl-5 space-y-2">
            <li>Nationwide delivery available</li>
            <li>Orders are processed within 24–48 hours</li>
            <li>Delivery time: 3–7 working days</li>
            <li>Cash on Delivery & Online Payment supported</li>
          </ul>
        </CardContent>
      </Card>

      {/* Refund Policy */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Refund & Return Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          <ul className="list-disc pl-5 space-y-2">
            <li>Return accepted within 7 days of delivery</li>
            <li>Product must be unused and in original packaging</li>
            <li>Refunds processed within 5–7 working days</li>
            <li>Damaged or wrong items are fully refundable</li>
          </ul>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Support</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          Our support team is always ready to help you.  
          For any questions related to orders, delivery, or refunds, feel free to
          contact us via email or WhatsApp.
        </CardContent>
      </Card>
    </div>
  )
}

export default page