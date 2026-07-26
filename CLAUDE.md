# hello-g2 - Projektregeln

## Plattform

@../../_shared/platform-glasses.md
@../../_shared/design-evenapps.md

## Zweck

Erstes Plugin der evenapps-Linie. Toolchain-Test: Simulator, QR-Sideload,
Packen, komplette Kette einmal durchlaufen. Zeigt eine Begruessung mit
Tipp-Zaehler, Doppeltipp beendet.

## Setup und Start

- Installieren: `./setup.sh` (oder `npm install`)
- Lokal starten: `npm run dev` und in zweitem Terminal
  `evenhub-simulator http://localhost:5173`
- Auf die Brille: `evenhub qr --url "http://<LAN-IP>:5173"` und den
  QR-Code in der Even-Realities-App scannen (Developer Mode noetig)

## Deploy

- Packen: `npm run build`, dann `evenhub pack app.json dist -o hello-g2.ehpk`
- Einreichung im Dev Portal ist fuer diesen Toolchain-Test nicht geplant

## Besonderheiten

- package_id: net.staude.hellog2
- Ein einzelner Text-Container mit isEventCapture, bewusst minimal
