import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_IDS ={
    'seeker_pro': 'price_1Tt9hmQu5J3pPKXACbs1SHzS',
    'seeker_premium':'price_1TtRapQu5J3pPKXAbYYEMfQE',
    'recruiter_pro':'price_1TtRbuQu5J3pPKXAUob96mPn',
    'recruiter_enterprise':'price_1TtRcuQu5J3pPKXATKoqo932'
}