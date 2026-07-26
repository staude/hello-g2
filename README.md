# hello-g2

Erstes Even-G2-Plugin der evenapps-Linie. Ein Text-Container zeigt eine
Begruessung und einen Tipp-Zaehler. Tippen auf das Buegel-Touchpad zaehlt
hoch, Doppeltipp beendet das Plugin. Zweck: die komplette Even-Hub-Toolchain
einmal durchlaufen (Simulator, Sideload, Packen).

## Voraussetzungen

- Node 20 LTS oder 22+
- Globale Tools: `npm install -g @evenrealities/evenhub-cli @evenrealities/evenhub-simulator`
- Even-Realities-App mit aktiviertem Developer Mode (hub.evenrealities.com)

## Entwickeln

```bash
./setup.sh          # npm install + git init mit richtiger Identitaet
npm run dev         # Terminal 1: Vite-Dev-Server
evenhub-simulator http://localhost:5173   # Terminal 2: Simulator
```

## Auf der Brille testen

```bash
ipconfig getifaddr en0                    # LAN-IP des Macs
evenhub qr --url "http://<LAN-IP>:5173"   # QR-Code erzeugen
```

QR-Code mit der Even-Realities-App scannen. Handy und Mac muessen im
selben Netz sein, Firewall und WLAN-Client-Isolation beachten.

## Packen

```bash
npm run build
evenhub pack app.json dist -o hello-g2.ehpk
```
