import { getUserValidCredits, insertCredit } from "@/models/credit";
import { Credit } from "@/types/credit";
import { UserCredits } from "@/types/user";
import { getFirstPaidOrderByUserUuid } from "@/models/order";
import { getIsoTimestr } from "@/lib/time";
import { getSnowId } from "@/lib/hash";

export enum CreditsTransType {
  NewUser = "new_user", // initial credits for new user
  OrderPay = "order_pay", // user pay for credits
  SystemAdd = "system_add", // system add credits
  Ping = "ping", // cost for ping api
}

export enum CreditsAmount {
  NewUserGet = 10,
  PingCost = 1,
}

// 操作类型枚举
export enum OperationType {
  IMAGE_GENERATION = 'image.generate',
  TEXT_GENERATION = 'text.generate',
  // 可以添加更多操作类型
}

// 是否启用积分检查
// 从环境变量中读取配置，若未配置则默认禁用
export const ENABLE_CREDIT_CHECK = process.env.ENABLE_CREDIT_CHECK === 'true';

// 在控制台输出积分检查状态
console.log(`Credit check is ${ENABLE_CREDIT_CHECK ? 'enabled' : 'disabled'}`);

// 积分消费配置
const creditCosts: Record<string, number> = {
  [OperationType.IMAGE_GENERATION]: 10,
  [OperationType.TEXT_GENERATION]: 5,
};

// Provider特定的积分消费配置
const providerCreditCosts: Record<string, Record<string, number>> = {
  'flux': {
    [OperationType.IMAGE_GENERATION]: 10,
  },
  // 可以添加更多Provider的配置
};

/**
 * 获取操作的积分消耗
 * @param operation 操作类型
 * @param provider 可选的Provider名称
 * @returns 需要消耗的积分数量
 */
export function getCreditCost(operation: string, provider?: string): number {
  // 如果指定了Provider，优先查找Provider特定的配置
  if (provider && providerCreditCosts[provider]) {
    const cost = providerCreditCosts[provider][operation];
    if (cost !== undefined) {
      return cost;
    }
  }
  
  // 回退到默认配置
  return creditCosts[operation] || 10; // 默认消耗10积分
}

export async function getUserCredits(user_uuid: string): Promise<UserCredits> {
  let user_credits: UserCredits = {
    left_credits: 0,
  };

  try {
    const first_paid_order = await getFirstPaidOrderByUserUuid(user_uuid);
    if (first_paid_order) {
      user_credits.is_recharged = true;
    }

    const credits = await getUserValidCredits(user_uuid);
    if (credits) {
      credits.forEach((v: Credit) => {
        user_credits.left_credits += v.credits;
      });
    }

    if (user_credits.left_credits < 0) {
      user_credits.left_credits = 0;
    }

    if (user_credits.left_credits > 0) {
      user_credits.is_pro = true;
    }

    return user_credits;
  } catch (e) {
    console.log("get user credits failed: ", e);
    return user_credits;
  }
}

/**
 * 检查用户积分是否足够
 * @param user_uuid 用户ID
 * @param operation 操作类型
 * @param provider 可选的Provider名称
 * @throws 如果积分不足，抛出错误
 */
export async function checkCredits(user_uuid: string, operation: string, provider?: string): Promise<void> {
  // 如果积分检查被禁用，直接返回
  if (!ENABLE_CREDIT_CHECK) {
    return;
  }
  
  const requiredCredits = getCreditCost(operation, provider);
  const userCredits = await getUserCredits(user_uuid);
  
  if (userCredits.left_credits < requiredCredits) {
    throw new Error(`积分不足: 需要${requiredCredits}积分，但只有${userCredits.left_credits}积分`);
  }
}

export async function decreaseCredits({
  user_uuid,
  trans_type,
  credits,
}: {
  user_uuid: string;
  trans_type: CreditsTransType;
  credits: number;
}) {
  // 如果积分检查被禁用，不记录积分消费
  if (!ENABLE_CREDIT_CHECK) {
    return;
  }
  
  try {
    let order_no = "";
    let expired_at = "";
    let left_credits = 0;

    const userCredits = await getUserValidCredits(user_uuid);
    if (userCredits) {
      for (let i = 0, l = userCredits.length; i < l; i++) {
        const credit = userCredits[i];
        left_credits += credit.credits;

        // credit enough for cost
        if (left_credits >= credits) {
          order_no = credit.order_no;
          expired_at = credit.expired_at || "";
          break;
        }

        // look for next credit
      }
    }

    const new_credit: Credit = {
      trans_no: getSnowId(),
      created_at: getIsoTimestr(),
      user_uuid: user_uuid,
      trans_type: trans_type,
      credits: 0 - credits,
      order_no: order_no,
      expired_at: expired_at,
    };
    await insertCredit(new_credit);
  } catch (e) {
    console.log("decrease credits failed: ", e);
    // 如果积分检查被禁用，不抛出错误
    if (ENABLE_CREDIT_CHECK) {
      throw e;
    }
  }
}

/**
 * 根据操作类型扣除用户积分
 * @param user_uuid 用户ID
 * @param operation 操作类型
 * @param provider 可选的Provider名称
 */
export async function consumeCredits(user_uuid: string, operation: string, provider?: string): Promise<void> {
  // 如果积分检查被禁用，直接返回
  if (!ENABLE_CREDIT_CHECK) {
    return;
  }
  
  const credits = getCreditCost(operation, provider);
  await decreaseCredits({
    user_uuid,
    trans_type: CreditsTransType.Ping,
    credits
  });
}

/**
 * 检查并扣除用户积分（原子操作）
 * @param user_uuid 用户ID
 * @param operation 操作类型
 * @param provider 可选的Provider名称
 * @throws 如果积分不足，抛出错误
 */
export async function checkAndConsumeCredits(user_uuid: string, operation: string, provider?: string): Promise<void> {
  // 如果积分检查被禁用，直接返回
  if (!ENABLE_CREDIT_CHECK) {
    return;
  }
  
  // 先检查积分
  await checkCredits(user_uuid, operation, provider);
  
  // 再扣除积分
  await consumeCredits(user_uuid, operation, provider);
}

export async function increaseCredits({
  user_uuid,
  trans_type,
  credits,
  expired_at,
  order_no,
}: {
  user_uuid: string;
  trans_type: string;
  credits: number;
  expired_at?: string;
  order_no?: string;
}) {
  // 如果积分检查被禁用，不记录积分增加
  if (!ENABLE_CREDIT_CHECK) {
    return;
  }
  
  try {
    const new_credit: Credit = {
      trans_no: getSnowId(),
      created_at: getIsoTimestr(),
      user_uuid: user_uuid,
      trans_type: trans_type,
      credits: credits,
      order_no: order_no || "",
      expired_at: expired_at || "",
    };
    await insertCredit(new_credit);
  } catch (e) {
    console.log("increase credits failed: ", e);
    // 如果积分检查被禁用，不抛出错误
    if (ENABLE_CREDIT_CHECK) {
      throw e;
    }
  }
}

/**
 * 为测试用户添加积分
 * @param user_uuid 用户ID
 * @param credits 积分数量
 */
export async function addCreditsForTestUser(user_uuid: string, credits: number = 100): Promise<void> {
  // 如果积分检查被禁用，不添加测试积分
  if (!ENABLE_CREDIT_CHECK) {
    return;
  }
  
  // 设置一年后过期
  const expireDate = new Date();
  expireDate.setFullYear(expireDate.getFullYear() + 1);
  
  await increaseCredits({
    user_uuid,
    trans_type: CreditsTransType.SystemAdd,
    credits,
    expired_at: expireDate.toISOString(),
  });
}
