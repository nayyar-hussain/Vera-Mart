import { Users, ShoppingBag, PoundSterling } from "lucide-react";

interface IDashboardProps {
  resLength: number;
  orderLength: number;
  orderTotal: number;
}

function DashboardCard({ resLength, orderLength, orderTotal }: IDashboardProps) {
  const cards = [
    {
      title: "Total Users",
      value: resLength,
      prefix: "",
      icon: <Users className="w-5 h-5" />,
      iconColor: "from-violet-600 to-violet-400",
      glowColor: "rgba(139,92,246,0.15)",
      borderHover: "hover:border-violet-500/30",
    },
    {
      title: "Total Orders",
      value: orderLength,
      prefix: "",
      icon: <ShoppingBag className="w-5 h-5" />,
      iconColor: "from-cyan-600 to-cyan-400",
      glowColor: "rgba(6,182,212,0.15)",
      borderHover: "hover:border-cyan-500/30",
    },
    {
      title: "Total Earnings",
      value: orderTotal,
      prefix: "£",
      icon: <PoundSterling className="w-5 h-5" />,
      iconColor: "from-emerald-600 to-emerald-400",
      glowColor: "rgba(16,185,129,0.15)",
      borderHover: "hover:border-emerald-500/30",
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <div
          key={card.title}
          className={`group relative bg-[#0f0f1c] border border-white/[0.07] rounded-3xl p-6 ${card.borderHover} hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] transition-all duration-300`}
        >
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-white/40">{card.title}</p>
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.iconColor} flex items-center justify-center text-white shadow-lg`}>
              {card.icon}
            </div>
          </div>

          {/* Value */}
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            {card.prefix}{card.value}
          </p>

          {/* Bottom glow line */}
          <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent`} />
        </div>
      ))}
    </>
  );
}

export default DashboardCard;