- eveniment si pentru adaugare interval (restanta)

- posibilitatea ca adminul sa anuleze programari (cu trimitere de email de rigoare) daca intervine ceva
- vizionarea de indisponibilitati doar la medicii arondati.... 


===== DEPLOYMENT ======


 - 0.9.8 - configurabilitate, parametrii generali....,finisaje aspect (modul tableta)
   {
    - de adaugat pret la servicii...
   }
 - 0.9.9 - buguri si validari suplimentare
 - 1.0.0 - versiune finala buna de impachetat!!!!! Doamne ajuta!


 ==== BUGURI ======

 - pt diaCRITICE CHARSET=utf8mb4 eventual unicode_ci;
 - la administrarea programarilor daca derulez la o anumita saptamina si apoi schimb cabinetul ramine default saptamina aceea de dinainte....


 ==== SQL =====

 CREATE TABLE `pols`.`sarbatori` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `detalii` VARCHAR(45) NULL DEFAULT 'Sarbatoare legala',
  `zi` INT NOT NULL,
  `luna` INT NOT NULL,
  PRIMARY KEY (`id`));


xcodebuild -runFirstLaunch

test github