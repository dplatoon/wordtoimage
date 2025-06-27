
// Performance reporting utilities
export class PerformanceReporter {
  private performanceMetrics: Map<string, number>;

  constructor(performanceMetrics: Map<string, number>) {
    this.performanceMetrics = performanceMetrics;
  }

  // Generate performance report
  generatePerformanceReport(): {
    timestamp: string;
    metrics: { [key: string]: number };
    recommendations: string[];
    overallScore: number;
  } {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: Object.fromEntries(this.performanceMetrics),
      recommendations: this.getPerformanceRecommendations(),
      overallScore: this.calculateOverallScore()
    };
    
    console.log('📊 Performance Report:', report);
    return report;
  }

  private getPerformanceRecommendations(): string[] {
    const recommendations: string[] = [];
    
    const lcp = this.performanceMetrics.get('LCP') || 0;
    const fid = this.performanceMetrics.get('FID') || 0;
    const cls = this.performanceMetrics.get('CLS') || 0;
    
    if (lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint (LCP)');
    }
    if (fid > 100) {
      recommendations.push('Reduce First Input Delay (FID)');
    }
    if (cls > 0.1) {
      recommendations.push('Minimize Cumulative Layout Shift (CLS)');
    }
    
    return recommendations;
  }

  private calculateOverallScore(): number {
    const lcp = this.performanceMetrics.get('LCP') || 0;
    const fid = this.performanceMetrics.get('FID') || 0;
    const cls = this.performanceMetrics.get('CLS') || 0;
    
    let score = 100;
    
    // LCP scoring (0-40 points)
    if (lcp > 4000) score -= 40;
    else if (lcp > 2500) score -= 20;
    
    // FID scoring (0-30 points)
    if (fid > 300) score -= 30;
    else if (fid > 100) score -= 15;
    
    // CLS scoring (0-30 points)
    if (cls > 0.25) score -= 30;
    else if (cls > 0.1) score -= 15;
    
    return Math.max(0, score);
  }
}
