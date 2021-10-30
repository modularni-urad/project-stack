# project-stack-api - Zásobník projektů

Slouží pro správu a prezentaci investičních i neinvestičních [projektů](https://www.smocr.cz/Shared/Clanky/6622/3-sulmanova-projektove-rizeni.pdf) organizace.
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
- SESSION_SERVICE=url of session mikroservice (default http://session-svc)
- ORG_ID=cisloObcePodle[CISOB](http://apl.czso.cz/iSMS/cisdet.jsp?kodcis=43)

[Dockerfile](Dockerfile) umožňuje nasadit jako kontejner,
idealně pomocí orchestrátoru jako např. [kubernetes](https://kubernetes.io/).

### Debugging v minikube clusteru

Hezká věc je debugging kodu běžícího v podu v rámci lokálního [minikube](https://github.com/kubernetes/minikube).
K tomu je zapotřebí [vydeployovat kod do minikube clusteru](https://medium.com/swlh/how-to-run-locally-built-docker-images-in-kubernetes-b28fbc32cc1d).
Finálním krokem v tomto procesu je build:
```
eval $(minikube -p minikube docker-env)
docker build . -f dev/Dockerfile -t modularniurad/project-stack
kubectl apply -f dev/pod.yaml
```

Pak minikube zařídí běh podu s vybuildovaným image kde, krom vlastního kodu
poslouchá node remote debugger na portu 9229.
Napojit se na něj lze po portforwardu tohoto portu 9229 z podu na host mašinu:
```
kubectl port-forward project-stack 9229:9229
```
Kde už se na něj napojíte např. z VSCode.
