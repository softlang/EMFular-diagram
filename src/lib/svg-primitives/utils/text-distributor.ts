export class TextDistributor {

  private static determineHowManyChars(w: number): number {
    return Math.floor(w/7.6)
  }

  private static determineLines(h: number): number {
    return Math.floor(h/20)
  }

  // idea: distribute words over lines,
  // if a single word is too long for a line, cut it early enough to have three dots afterwards
  // if you need to indicate that there is more text after the last complete word, also use three dots, but after a break
  static distributeText(text: string, w: number, h: number): string[] {
    let distributedText: string[] = [];

    let broken = text?.split(' ')
    let maxLines = this.determineLines(h)
    if (maxLines <= 0) {
      console.error('Text area too low for text ' + text)
      distributedText = ['...']
    }
    for (let i = 0; i < maxLines; i++) {
      if (broken.length > 0) {
        distributedText[i] = this.takeNextLine(broken, w)
      }
    }
    // now deal with last line: here we need special care for adding ... if necessary
    if (broken.length > 0) {
      // we need to indicate that there is more text - this could be the 4 signs to many...
      distributedText[maxLines - 1] +=' ...'
    }
    return distributedText.filter(w => w != '')
  }

  // if a single word is too long for a line, cut it early enough to have three dots afterwards
  static limitSingleWord(word: string, w: number): string {
    let maxSize = this.determineHowManyChars(w)
    if (word.length > maxSize) {
      let ending = '...'
      // care for far too short width:
      if (maxSize <= 3) {
        return ending.substring(0, maxSize)
      } else {
        return word.substring(0, maxSize-3)+'...'
      }
    } else {
      return word
    }
  }

  // adapts input words array in place by removing all those that are taken into the result
  static takeNextLine(words: string[], w: number): string {
    if (words?.length > 0) {
      let res = this.limitSingleWord(words[0], w)
      let i = 1;
      let maxSize = this.determineHowManyChars(w)
      let testRes = res + ' ' + words[i]
      while (testRes.length <= maxSize && i < words.length-1) {
        res = testRes
        i++
        testRes = res + ' ' + words[i]
      }
      words.splice(0, i)
      return res;
    } else return ''
  }
}
