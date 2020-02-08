import 'jest';
import {
   getLocaleFromStorageOrDefaultLocale,
   localeKey,
   locales,
   setLocaleToStorage
} from '../LocalizationConfiguration';

describe('locales', () => {
   it('should have specific locales supported', () => {
      expect(locales)
         .toEqual([ 'en', 'hr' ]);
   });
});

describe('getLocaleFromStorageOrDefaultLocale', () => {
   beforeEach(() => {
      window.localStorage.clear();
   });

   it('should return locale from locale storage if set', () => {
      window.localStorage.setItem(localeKey, 'test');

      expect(getLocaleFromStorageOrDefaultLocale())
         .toEqual('test');
   });

   it('should return default locale if not set in local storage', () => {
      expect(getLocaleFromStorageOrDefaultLocale())
         .toEqual('en');
   });
});

describe('setLocaleToStorage', () => {
   it('should set locale to locale storage', () => {
      window.localStorage.clear();

      setLocaleToStorage('hr');

      expect(window.localStorage.getItem(localeKey))
         .toEqual('hr');
   });
});