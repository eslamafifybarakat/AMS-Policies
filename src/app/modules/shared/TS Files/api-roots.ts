export const roots = {
  homeData: '../data/data.json',
  home: {
    getHomeData: '/api/site/get-home-data',
    exportFile: 'export_policies',
    getNotifications: '/all-notifications'
  },
  payments: {
    getPayments: '/api/site/payments',
    payNow: '/api/site/pay-for-policy',
    checkPaymentStatus: '/api/site/update-policy-payment-status'
  }
}
