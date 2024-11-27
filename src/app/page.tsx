import Image from "next/image";
import {DiscoverWalletProvidersComponent} from "@/components/discover-wallet-providers";
import { ElectricProductGrid } from "@/components/electric-product-grid";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen justify-center sm:font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 gap-8 sm:items-start">
        <DiscoverWalletProvidersComponent />
        <ElectricProductGrid />
      </main>
      <footer className="flex flex-wrap items-center justify-center row-start-3 gap-6">
      </footer>
    </div>
  );
}
