import { Store, Package, Truck, RefreshCcw, HeadphonesIcon, CheckCircle2, Sparkles } from "lucide-react";

function page() {
  return (
    <div className="min-h-screen bg-[#07070f] px-4 py-16">

      {/* Ambient glows */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Page Header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-white/50 tracking-widest uppercase">Our Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Our Store
            </span>
          </h1>
          <p className="mt-4 text-white/35 text-base max-w-md mx-auto leading-relaxed">
            Trusted by thousands of happy customers across the country.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="flex flex-col gap-4">

          {/* Who We Are */}
          <AboutCard
            icon={<Store className="w-5 h-5" />}
            iconColor="from-violet-600 to-violet-400"
            title="Who We Are"
          >
            <p className="text-white/45 text-sm leading-relaxed">
              We are a trusted ecommerce platform providing high-quality products at
              affordable prices. Our goal is to give customers a smooth, secure, and
              satisfying online shopping experience.
            </p>
          </AboutCard>

          {/* Our Products */}
          <AboutCard
            icon={<Package className="w-5 h-5" />}
            iconColor="from-fuchsia-600 to-pink-400"
            title="Our Products"
          >
            <p className="text-white/45 text-sm leading-relaxed">
              We offer a wide range of products including fashion, electronics, and
              daily-use items. All products are carefully selected and quality-checked
              before delivery.
            </p>
          </AboutCard>

          {/* Delivery */}
          <AboutCard
            icon={<Truck className="w-5 h-5" />}
            iconColor="from-cyan-600 to-cyan-400"
            title="Delivery Information"
          >
            <ul className="space-y-2.5">
              {[
                "Nationwide delivery available",
                "Orders are processed within 24–48 hours",
                "Delivery time: 3–7 working days",
                "Cash on Delivery & Online Payment supported",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-white/45 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </AboutCard>

          {/* Refund */}
          <AboutCard
            icon={<RefreshCcw className="w-5 h-5" />}
            iconColor="from-emerald-600 to-emerald-400"
            title="Refund & Return Policy"
          >
            <ul className="space-y-2.5">
              {[
                "Return accepted within 7 days of delivery",
                "Product must be unused and in original packaging",
                "Refunds processed within 5–7 working days",
                "Damaged or wrong items are fully refundable",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-white/45 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </AboutCard>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-2" />

          {/* Support */}
          <AboutCard
            icon={<HeadphonesIcon className="w-5 h-5" />}
            iconColor="from-amber-500 to-orange-400"
            title="Customer Support"
          >
            <p className="text-white/45 text-sm leading-relaxed">
              Our support team is always ready to help you. For any questions related
              to orders, delivery, or refunds, feel free to contact us via email or
              WhatsApp.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-medium text-amber-400">
                📧 Email Support
              </span>
              <span className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-medium text-emerald-400">
                💬 WhatsApp
              </span>
              <span className="px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-xl text-xs font-medium text-violet-400">
                🕐 24/7 Available
              </span>
            </div>
          </AboutCard>

        </div>
      </div>
    </div>
  );
}

/* ── Reusable Card Component ── */
function AboutCard({
  icon,
  iconColor,
  title,
  children,
}: {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group bg-[#0f0f1c] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] hover:shadow-[0_0_40px_rgba(139,92,246,0.07)] transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${iconColor} flex items-center justify-center text-white shrink-0 shadow-lg`}>
          {icon}
        </div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default page;