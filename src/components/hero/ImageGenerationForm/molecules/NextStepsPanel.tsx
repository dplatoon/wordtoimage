
import React from "react";

export const NextStepsPanel = () => {
  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">Next Steps &amp; Implementation</h3>
      <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
        <li>Wireframe the New Section in your design tool, sketching the input, controls, button, and gallery</li>
        <li>Update Your Lovable Spec with the above components and copy, then generate the React UI</li>
        <li>Test Edge Cases: Very long prompts, network failures, and unauthenticated clicks</li>
        <li>Gather Feedback: Roll out to a beta group or use Hotjar to watch interactions</li>
        <li>Iterate &amp; Polish: Refine styling, tweak animations, and A/B test messaging</li>
      </ol>
      <p className="mt-4 text-sm text-blue-600">
        By layering these proven UX patterns into your WordToImage "Image Generate" section, you'll boost engagement, clarity, and conversion—turning casual visitors into enthusiastic creators.
      </p>
    </div>
  );
};
