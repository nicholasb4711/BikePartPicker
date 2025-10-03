import { Button } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-6 tracking-tight">
            BikePartPicker 🚴‍♂️
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Professional-grade part selection, pricing, and compatibility
            guidance for performance-focused bicycle builders.
          </p>
          <Link href="/builder">
            <Button variant="primary">Start your build</Button>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 font-medium">
            Ready to build your dream machine? Let&apos;s engineer your perfect
            setup.
          </p>
        </div>
      </div>
    </div>
  );
}
