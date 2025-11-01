import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ja: {
    translation: {
      dashboard: 'ダッシュボード',
      vehicles: '車両管理',
      inspections: '車両点検管理',
      maintenance: 'メンテナンス管理',
      documents: '請求書管理',
      data: 'データ管理',
      reports: 'レポート',
      search: '検索',
      users: 'ユーザー管理',
      settings: '設定',
      logout: 'ログアウト'
    }
  },
  en: {
    translation: {
      dashboard: 'Dashboard',
      vehicles: 'Vehicles',
      inspections: 'Inspections',
      maintenance: 'Maintenance',
      documents: 'Documents',
      data: 'Data',
      reports: 'Reports',
      search: 'Search',
      users: 'Users',
      settings: 'Settings',
      logout: 'Logout'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ja',
  fallbackLng: 'ja',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
