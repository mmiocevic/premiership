import LocalizedStrings from 'react-localization';

export type Locales = 'en' | 'hr';
export const locales: [ Locales, Locales ] = [ 'en', 'hr' ];

export const localization = new LocalizedStrings({
   en: {
      away: 'Away',
      close: 'Close',
      club: 'Club',
      d: 'D',
      draw: 'Draw',
      ga: 'GA',
      gd: 'GD',
      gs: 'GS',
      home: 'Home',
      l: 'L',
      lastFive: 'Last 5',
      loss: 'Loss',
      mostRecentMatch: 'Most recent match',
      mp: 'MP',
      notPlayed: 'Not played',
      pts: 'Pts',
      rank: 'Rank',
      round: 'Round',
      w: 'W',
      win: 'Win'
   },
   hr: {
      away: 'Gosti',
      close: 'Zatvori',
      club: 'Klub',
      d: 'N',
      draw: 'Neriješeno',
      ga: 'PG',
      gd: 'Raz.',
      gs: 'DG',
      home: 'Domaćin',
      l: 'I',
      lastFive: 'Zadnjih 5',
      loss: 'Poraz',
      mostRecentMatch: 'Najnovija utakmica',
      mp: 'UT',
      notPlayed: 'Neodigrano',
      pts: 'Bod',
      rank: 'Rang',
      round: 'Kolo',
      w: 'P',
      win: 'Pobjeda'
   }
});

export const localeKey: string = 'premiership-locale';

export const setLocaleToStorage = (locale: Locales) =>
   window.localStorage && window.localStorage.setItem(localeKey, locale);

export const getLocaleFromStorageOrDefaultLocale = (): Locales =>
   (window.localStorage && (window.localStorage.getItem(localeKey) as Locales)) || locales[0];