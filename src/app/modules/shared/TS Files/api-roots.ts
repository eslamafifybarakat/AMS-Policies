export const roots = {
  homeData: '/api/EnSetting',
  homeDataAr: '/api/ArSetting',
  home: {
    getHomeData: '/api/site/get-home-data',
    exportFile: 'api/site/export_policies',
    getNotifications: '/api/all-notifications',
    markNotification: '/api/markNotification',
    markAllNotifications: '/api/markAllNotifications'
  },
  payments: {
    getPayments: '/api/site/payments',
    payNow: '/api/site/pay-for-policy',
    checkPaymentStatus: '/api/site/update-policy-payment-status'
  }
}
