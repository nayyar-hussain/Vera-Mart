import { Button } from "@/components/ui/button";

export function Footer() {
return (
<footer className="bg-muted mt-16">
<div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
{/* Brand */}
<div>
<h2 className="text-xl font-bold">MyShop</h2>
<p className="text-sm text-muted-foreground mt-2">
Best quality products at affordable prices.
</p>
</div>


{/* Links */}
<div>
<h3 className="font-semibold mb-3">Quick Links</h3>
<ul className="space-y-2 text-sm text-muted-foreground">
<li>Home</li>
<li>Products</li>
<li>About Us</li>
<li>Contact</li>
</ul>
</div>


{/* Support */}
<div>
<h3 className="font-semibold mb-3">Support</h3>
<ul className="space-y-2 text-sm text-muted-foreground">
<li>Help Center</li>
<li>Privacy Policy</li>
<li>Terms & Conditions</li>
</ul>
</div>


{/* Newsletter */}
<div>
<h3 className="font-semibold mb-3">Newsletter</h3>
<p className="text-sm text-muted-foreground mb-3">
Subscribe for latest updates
</p>
<Button className="w-full">Subscribe</Button>
</div>
</div>


<div className="border-t text-center py-4 text-sm text-muted-foreground">
© {new Date().getFullYear()} MyShop. All rights reserved.
</div>
</footer>
);
}

