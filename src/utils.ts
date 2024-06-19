const regexForKata = /[\u30A1-\u30FA]/g

/**
 * カタカナからひらがな
 */
export const kataToHira = (hira: string) =>
  hira.replace(regexForKata, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 0x60),
  )
