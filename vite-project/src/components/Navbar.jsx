import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, List, ShoppingCart, User } from "lucide-react";

export default function BottomNav() {
  const { pathname } = useLocation();

  const menu = [
    { to: "/", icon: <Home size={22} />, label: "Home" },
    { to: "/chat", icon: <MessageCircle size={22} />, label: "Chat" },
    { to: "/orders", icon: <List size={22} />, label: "Orders" },
    { to: "/cart", icon: <ShoppingCart size={22} />, label: "Cart" },
    { to: "/profile", icon: <User size={22} />, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0d0d0d] text-white border-t border-gray-700 flex justify-around py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.5)] z-50">

      {menu.map((item) => {
        const active = pathname === item.to;

        return (
          <Link
            key={item.to}
            to={item.to}
            className="relative group flex flex-col items-center"
          >
            <div
              className={`transition-all duration-300 ${
                active ? "text-blue-400 scale-110" : "text-gray-300"
              }`}
            >
              {item.icon}
            </div>

            {/* Tooltip on hover */}
            <span className="absolute bottom-10 bg-black px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
