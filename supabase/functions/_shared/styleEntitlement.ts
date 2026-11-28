export interface StyleSubscription {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
}

export function hasPaidStyleAccess(
  subscription: StyleSubscription | null,
  now = Date.now(),
): boolean {
  return subscription?.subscribed === true &&
    ["standard", "pro", "business"].includes(subscription.subscription_tier?.toLowerCase() ?? "") &&
    Date.parse(subscription.subscription_end ?? "") > now;
}