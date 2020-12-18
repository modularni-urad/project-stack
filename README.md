# project-stack-api - Zásobník projektů

Slouží pro správu a prezentaci investičních i neinvestičních projektů organizace. 
Každá [aktivita má svou kartu](http://www.projektmanazer.cz/sites/default/files/dokumenty/1-4projektovyzamer.pdf) se standardními atributy alá [projektová fiše](https://www.infoz.cz/projektova-fise/) + info o stavu.
Pro občany vizualizace v mapě pomocí špendliků (barva dle žánru) a po nákliku zobrazení karty s detaily projektu. + možnost filtrovat.

### Části: 
- Backend = tento repositář, poskytující pouze API, prezentaci dělá JS frontend
- [Frontend Administrace (javascript)](https://github.com/modularni-urad/project-stack-webclient)
- [Prezentační mapa](https://github.com/modularni-urad/project-stack-webclient/tree/master/mapa)

## SETTINGS

Pouze pomocí ENVIRONMENT VARIABLES, jsou samovysvětlující:
- PORT=30011
- HOST=0.0.0.0
- DATABASE_URL=postgres://username:secret@localhost:5432/moje_db
- REDIS_URL=redis://redis:6379
- SESSION_SECRET=secretProZabezpeceniSession

[Dockerfile](Dockerfile) umožňuje nasadit jako kontejner,
idealně pomocí orchestrátoru jako např. [kubernetes](https://kubernetes.io/).