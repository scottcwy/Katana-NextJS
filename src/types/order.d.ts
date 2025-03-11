export interface Order {
  order_no: string;
  created_at: string;
  user_uuid: string;
  user_email: string;
  amount: number;
  interval: string;
  expired_at: string;
  status: string;
  stripe_session_id?: string;
  credits: number;
  currency: string;
  sub_id?: string;
  sub_interval_count?: number;
  sub_cycle_anchor?: number;
  sub_period_end?: number;
  sub_period_start?: number;
  sub_times?: number;
  product_id?: string;
  product_name?: string;
  valid_months?: number;
  order_detail?: string;
  paid_at?: string;
  paid_email?: string;
  paid_detail?: string;
}
