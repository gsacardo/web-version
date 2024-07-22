"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuArchive,
  LuClipboardList,
  LuHome,
  LuMenu,
  LuSettings,
} from "react-icons/lu";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div
      className="w-full h-20 bg-zinc-50 dark:bg-zinc-900 fixed bottom-0 flex justify-between py-3 px-5 items-center text-xs
    sm:h-full sm:w-20 sm:flex-col sm:justify-start sm:gap-5"
    >
      <div className="hidden sm:flex items-center justify-center w-14 h-14">
        <img src="/logo.png" alt="logo" className="w-12 h-12 self-center" />
      </div>

      <Link href="/">
        <div className="flex flex-col items-center gap-2">
          <div
            className={
              pathname === "/"
                ? "flex items-center justify-center w-14 h-14 bg-primary rounded-full -mt-6 font-bold sm:border-l-5 sm:border-primary sm:bg-transparent sm:rounded-none sm:mt-0 text-white sm:text-current"
                : ""
            }
          >
            <LuHome size={32} className="hover:sm:text-primary" />
          </div>
          <div className="sm:hidden">
            <span className={pathname === "/" ? "font-bold" : ""}>Home</span>
          </div>
        </div>
      </Link>

      <Link href="/products">
        <div className="flex flex-col items-center gap-2">
          <div
            className={
              pathname === "/products"
                ? "flex items-center justify-center w-14 h-14 bg-primary rounded-full -mt-6 font-bold sm:border-l-5 sm:border-primary sm:bg-transparent sm:rounded-none sm:mt-0 text-white sm:text-current"
                : ""
            }
          >
            <LuClipboardList size={32} className="hover:sm:text-primary" />
          </div>
          <div className="sm:hidden">
            <span className={pathname === "/products" ? "font-bold" : ""}>
              Produtos
            </span>
          </div>
        </div>
      </Link>

      <Link href="/stock">
        <div className="flex flex-col items-center gap-2">
          <div
            className={
              pathname === "/stock"
                ? "flex items-center justify-center w-14 h-14 bg-primary rounded-full -mt-6 font-bold sm:border-l-5 sm:border-primary sm:bg-transparent sm:rounded-none sm:mt-0 text-white sm:text-current"
                : ""
            }
          >
            <LuArchive size={32} className="hover:sm:text-primary" />
          </div>
          <div className="sm:hidden">
            <span className={pathname === "/stock" ? "font-bold" : ""}>
              Estoque
            </span>
          </div>
        </div>
      </Link>

      <Link href="/settings">
        <div className="flex flex-col items-center gap-2">
          <div
            className={
              pathname === "/settings"
                ? "flex items-center justify-center w-14 h-14 bg-primary rounded-full -mt-6 font-bold sm:border-l-5 sm:border-primary sm:bg-transparent sm:rounded-none sm:mt-0 text-white sm:text-current"
                : ""
            }
          >
            <LuSettings size={32} className="hover:sm:text-primary" />
          </div>
          <div className="sm:hidden">
            <span className={pathname === "/settings" ? "font-bold" : ""}>
              Configurações
            </span>
          </div>
        </div>
      </Link>

      <Link href="/menu">
        <div className="flex flex-col items-center gap-2">
          <div
            className={
              pathname === "/menu"
                ? "flex items-center justify-center w-14 h-14 bg-primary rounded-full -mt-6 font-bold sm:border-l-5 sm:border-primary sm:bg-transparent sm:rounded-none sm:mt-0 text-white sm:text-current"
                : ""
            }
          >
            <LuMenu size={32} className="hover:sm:text-primary" />
          </div>
          <div className="sm:hidden">
            <span className={pathname === "/menu" ? "font-bold" : ""}>
              Menu
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
