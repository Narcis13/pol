- eveniment si pentru adaugare interval (restanta)

- posibilitatea ca adminul sa anuleze programari (cu trimitere de email de rigoare) daca intervine ceva
- vizionarea de indisponibilitati doar la medicii arondati.... 


===== DEPLOYMENT ======

 - 0.9.6 - vizualizare, sortare, cautare solicitari
 - 0.9.7 - configurabilitate, parametrii generali....
 - 0.9.8 - finisaje aspect (modul tableta)
 - 0.9.9 - buguri si validari suplimentare
 - 1.0.0 - versiune finala buna de impachetat!!!!! Doamne ajuta!


 ==== BUGURI ======

 - nu prea merge editarea serviciilor
 - la adaugarea indisponibilitatilor chiar daca nu salveaza cu interval incorect iti da mesaj verde .....


 ==== SQL =====

 CREATE TABLE `pols`.`sarbatori` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `detalii` VARCHAR(45) NULL DEFAULT 'Sarbatoare legala',
  `zi` INT NOT NULL,
  `luna` INT NOT NULL,
  PRIMARY KEY (`id`));

