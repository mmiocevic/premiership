import LocalizedStrings from 'react-localization';

export type Locales = 'en' | 'hr';
export const locales = [ 'en', 'hr' ];

export const localization = new LocalizedStrings({
   en: {
      round: 'Round',
      home: 'Home',
      away: 'Away',
      rank: 'Rank',
      club: 'Club',
      mp: 'MP',
      w: 'W',
      d: 'D',
      l: 'L',
      gs: 'GS',
      ga: 'GA',
      gd: 'GD',
      pts: 'Pts',
      lastFive: 'Last 5',
      loss: 'Loss',
      draw: 'Draw',
      win: 'Win',
      notPlayed: 'Not played'
   },
   hr: {
      round: 'Runda',
      home: 'Domaćin',
      away: 'Gosti',
      rank: 'Rang',
      club: 'Klub',
      mp: 'UT',
      w: 'P',
      d: 'N',
      l: 'I',
      gs: 'DG',
      ga: 'PG',
      gd: 'Raz.',
      pts: 'Bod',
      lastFive: 'Zadnjih 5',
      loss: 'Poraz',
      draw: 'Neriješeno',
      win: 'Pobjeda',
      notPlayed: 'Ne odigrano'
   }
});

export const setLocaleToStorage = (locale: Locales) =>
   window.localStorage && window.localStorage.setItem('premiership-locale', locale);

export const getLocaleFromStorageOrDefaultLocale = (): Locales =>
   window.localStorage && (window.localStorage.getItem('premiership-locale') as Locales) || locales[0];