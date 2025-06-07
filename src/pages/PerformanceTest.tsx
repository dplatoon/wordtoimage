
import { PerformanceTestPanel } from '@/components/testing/PerformanceTestPanel';
import { PerformanceComparison } from '@/components/testing/PerformanceComparison';
import { MobilePerformanceIndicator } from '@/components/testing/MobilePerformanceIndicator';

export default function PerformanceTest() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Performance Testing Dashboard
          </h1>
          <p className="text-gray-600">
            Measure and track your app's mobile performance improvements
          </p>
        </div>

        <div className="space-y-8">
          <PerformanceComparison />
          <PerformanceTestPanel />
        </div>
      </div>

      <MobilePerformanceIndicator />
    </div>
  );
}
