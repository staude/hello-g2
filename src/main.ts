import {
  waitForEvenAppBridge,
  TextContainerProperty,
  TextContainerUpgrade,
  CreateStartUpPageContainer,
  OsEventTypeList,
} from '@evenrealities/even_hub_sdk'

// Designsprache evenapps: Titelzeile oben, Statuszeile unten,
// ein Blick genuegt. Ein Container, der alle Events faengt.

const TITLE = 'HALLO G2'

function screenText(count: number): string {
  return (
    `${TITLE}\n\n` +
    `Hallo Frank!\n` +
    `Tipp-Zaehler: ${count}\n\n` +
    `> Tippen zaehlt, Doppeltipp beendet`
  )
}

async function main(): Promise<void> {
  const bridge = await waitForEvenAppBridge()

  const mainText = new TextContainerProperty({
    xPosition: 0,
    yPosition: 0,
    width: 576,
    height: 288,
    borderWidth: 0,
    borderColor: 5,
    paddingLength: 4,
    containerID: 1,
    containerName: 'main',
    content: screenText(0),
    isEventCapture: 1,
  })

  const result = await bridge.createStartUpPageContainer(
    new CreateStartUpPageContainer({
      containerTotalNum: 1,
      textObject: [mainText],
    }),
  )

  if (result !== 0) {
    console.error('createStartUpPageContainer fehlgeschlagen:', result)
  }

  let count = 0

  // Klicks auf Text-Container kommen als sysEvent, nicht als textEvent
  // (textEvent feuert nur bei Scroll-Gesten). Protobuf laesst Null-Werte
  // weg, daher kommt CLICK_EVENT (0) als undefined an -> ?? 0.
  bridge.onEvenHubEvent((event: any) => {
    if (!event.sysEvent) return

    switch (event.sysEvent.eventType ?? 0) {
      case OsEventTypeList.CLICK_EVENT:
        count += 1
        bridge.textContainerUpgrade(
          new TextContainerUpgrade({
            containerID: 1,
            containerName: 'main',
            content: screenText(count),
          }),
        )
        break

      case OsEventTypeList.DOUBLE_CLICK_EVENT:
        bridge.shutDownPageContainer(1)
        break
    }
  })
}

main().catch((err) => console.error('hello-g2:', err))
