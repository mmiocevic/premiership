You can check it here
http://eng-premiership.000webhostapp.com/ 
  ( sorry if it is not there anymore :( )

# Autor
Mislav Miočević

# Zadatak
Izraditi Single Page aplikaciju za prikaz rezultata utakmica i poretka klubova po kolima za sezonu
2016/2017 engleske nogometne lige.

### Specifikacije
Aplikacija treba sadržavati sljedeće elemente:
 1. Padajući izbornik za odabir kola za koje će se prikazivati rezultati
 2. Rezultate svih utakmica odabranog kola (s tim da se inicijalno prikazuju rezultati zadnjeg kola)
 3. Ljestvicu sa poretkom klubova nakon zadanog kola
 
Ljestvica treba sadržavati sljedeće elemente:
 1. Poziciju kluba na ljestvici
 2. Naziv kluba
 3. Broj odigranih utakmica
 4. Broj dobivenih utakmica
 5. Broj nerješenih utakmica
 6. Broj izgubljenih utakmica
 7. Broj postignutih golova
 8. Broj primljenih golova
 9. Gol razliku
 10. Broj bodova
  
Broj bodova se izračunava po sljedećem ključu:
 1. Svaka pobjeda donosi 3 boda
 2. Svaka nerješena utakmica donosi 1 bod
 3. Porazi ne donose bodove

Ljestvica treba biti sortirana silazno po broju bodova. Prvorangirani tim na ljestvici je onaj sa najvećim
brojem bodova. Ukoliko 2 tima imaju isti broj bodova, bolje rangirani tim je onaj koji ima bolju gol razliku.
Ako je i gol razlika jednaka, tim sa većim brojem postignutih golova će biti bolje rangiran.

### Tehnologije
Tehnologije koje treba koristiti pri izradi aplikacije:
 1. React
 2. Redux
 3. Typescript
 
Radi lakše i brže izrade zadataka, preporuča se korištenje TypeScript React Startera kao i njegove
dokumentacije. Podaci sa rezultatima utakmica u json formatu mogu se preuzeti ovdje.
Nije dozvoljeno mijenjanje strukture podataka.

### Dodatno
Bonus bodove možeš dobiti za:
 1. Prikaz trenda posljednjih pet utakmica za svaki tim (npr. W W D L W)
 2. Dizajn
