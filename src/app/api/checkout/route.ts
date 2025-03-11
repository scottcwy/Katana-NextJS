import { getUserEmail, getUserUuid } from "@/services/user";
import { insertOrder, updateOrderSession } from "@/models/order";
import { respData, respErr } from "@/lib/resp";

import { Order } from "@/types/order";
import Stripe from "stripe";
import { findUserByUuid } from "@/models/user";
import { getSnowId } from "@/lib/hash";

export async function POST(req: Request) {
  try {
    let {
      credits,
      currency,
      amount,
      interval,
      product_id,
      product_name,
      valid_months,
      cancel_url,
    } = await req.json();

    if (!cancel_url) {
      cancel_url = `${
        process.env.NEXT_PUBLIC_PAY_CANCEL_URL ||
        process.env.NEXT_PUBLIC_WEB_URL
      }`;
    }

    if (!amount || !interval || !currency || !product_id) {
      return respErr("invalid_params", req.headers.get('Accept-Language')?.startsWith('zh') ? 'zh' : 'en');
    }

    if (!["year", "month", "one-time"].includes(interval)) {
      return respErr("invalid_interval", req.headers.get('Accept-Language')?.startsWith('zh') ? 'zh' : 'en');
    }

    const is_subscription = interval === "month" || interval === "year";

    if (interval === "year" && valid_months !== 12) {
      return respErr("invalid_valid_months", req.headers.get('Accept-Language')?.startsWith('zh') ? 'zh' : 'en');
    }

    if (interval === "month" && valid_months !== 1) {
      return respErr("invalid_valid_months", req.headers.get('Accept-Language')?.startsWith('zh') ? 'zh' : 'en');
    }

    const user_uuid = await getUserUuid();
    if (!user_uuid) {
      return respErr("no_auth", req.headers.get('Accept-Language')?.startsWith('zh') ? 'zh' : 'en');
    }

    let user_email = await getUserEmail();
    if (!user_email) {
      const user = await findUserByUuid(user_uuid);
      if (user && user.email) {
        user_email = user.email;
      }
    }
    if (!user_email) {
      return respErr("invalid_user", req.headers.get('Accept-Language')?.startsWith('zh') ? 'zh' : 'en');
    }

    const order_no = getSnowId();

    const currentDate = new Date();
    const created_at = currentDate.toISOString();

    let expired_at = "";

    const timePeriod = new Date(currentDate);
    timePeriod.setMonth(currentDate.getMonth() + valid_months);

    const timePeriodMillis = timePeriod.getTime();
    let delayTimeMillis = 0;

    // subscription
    if (is_subscription) {
      delayTimeMillis = 24 * 60 * 60 * 1000; // delay 24 hours expired
    }

    const newTimeMillis = timePeriodMillis + delayTimeMillis;
    const newDate = new Date(newTimeMillis);

    expired_at = newDate.toISOString();

    const order: Order = {
      order_no: order_no,
      created_at: created_at,
      user_uuid: user_uuid,
      user_email: user_email,
      amount: amount,
      interval: interval,
      expired_at: expired_at,
      status: "created",
      credits: credits,
      currency: currency,
      product_id: product_id,
      product_name: product_name,
      valid_months: valid_months,
    };
    await insertOrder(order);

    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "");

    let options: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: product_name,
            },
            unit_amount: amount,
            recurring: is_subscription
              ? {
                  interval: interval,
                }
              : undefined,
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      metadata: {
        project: process.env.NEXT_PUBLIC_PROJECT_NAME || "",
        product_name: product_name,
        order_no: order_no.toString(),
        user_email: user_email,
        credits: credits,
        user_uuid: user_uuid,
      },
      mode: is_subscription ? "subscription" : "payment",
      success_url: `${process.env.NEXT_PUBLIC_WEB_URL}/pay-success/{CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url,
    };

    if (user_email) {
      options.customer_email = user_email;
    }

    if (is_subscription) {
      options.subscription_data = {
        metadata: options.metadata,
      };
    }

    if (currency === "cny") {
      options.payment_method_types = ["wechat_pay", "alipay", "card"];
      options.payment_method_options = {
        wechat_pay: {
          client: "web",
        },
        alipay: {},
      };
    }

    const order_detail = JSON.stringify(options);

    const session = await stripe.checkout.sessions.create(options);

    const stripe_session_id = session.id;
    await updateOrderSession(order_no, stripe_session_id, order_detail);

    return respData({
      public_key: process.env.STRIPE_PUBLIC_KEY,
      order_no: order_no,
      session_id: stripe_session_id,
    });
  } catch (e: any) {
    console.log("checkout failed: ", e);
    return respErr("checkout failed", req.headers.get('Accept-Language')?.startsWith('zh') ? 'zh' : 'en');
  }
}
