import { TextDistributor } from './text-distributor';

describe('TextDistributor', () => {
  it('should create an instance', () => {
    expect(new TextDistributor()).toBeTruthy();
  });

  //**************** limitSingleWord ***********
  it('Should limit a single word that is far too long', () => {
    expect(
      TextDistributor.limitSingleWord(
        'ThisIsAFarTOOLongWordWordWord',
        200
      )
    ).toEqual('ThisIsAFarTOOLongWordWo...');
  })

  it('Should limit a single word in a case with less than 3 chars space', () => {
    expect(
      TextDistributor.limitSingleWord(
        'ThisIsAFarTOOLongWordWordWord',
        20
      )
    ).toEqual('..');
  })

  it('Should limit a single word that is short enough', () => {
    expect(
      TextDistributor.limitSingleWord(
        'ThisIsNOTTooLong',
        200
      )
    ).toEqual('ThisIsNOTTooLong');
  })

  // *************** takeNextLine *****************
  it('Should read an empty line and change the input words array', () => {
    let words: string[] = []
    expect(
      TextDistributor.takeNextLine(words, 20)
    ).toEqual('')
  })

  it('Should read a whole line and change the input words array by removing three words', () => {
    let words: string[] = ['Lorem','ipsum', 'dolor', 'sit', 'amet,', 'consetetur', 'sadipscing', 'elitr,']
    expect(
      TextDistributor.takeNextLine(words, 210)
    ).toEqual('Lorem ipsum dolor sit amet,')
    expect(words).toEqual(
      ['consetetur', 'sadipscing', 'elitr,']
    )
  })

  it('Should read a whole line with a too long first word and change the input words array by removing it', () => {
    let words: string[] = ['TooLongWordLongerLongerLongerLongerLonger', 'consetetur', 'sadipscing', 'elitr,']
    expect(
      TextDistributor.takeNextLine(words, 200)
    ).toEqual('TooLongWordLongerLonger...')
    expect(words).toEqual(
      ['consetetur', 'sadipscing', 'elitr,']
    )
  })

  it('Should read a whole line with a too long second word and change the input words array by removing the first word only', () => {
    let words: string[] = ['Short','TooLongWordLongerLongerLongerLongerLonger', 'consetetur', 'sadipscing', 'elitr,']
    expect(
      TextDistributor.takeNextLine(words, 200)
    ).toEqual('Short')
    expect(words).toEqual(
      ['TooLongWordLongerLongerLongerLongerLonger','consetetur', 'sadipscing', 'elitr,']
    )
  })

  // ******************* distributeText *****************

  it('Should return a two line distributed text', () => {
    var text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
    expect(TextDistributor.distributeText(text, 200, 50)).toEqual(
      ['Lorem ipsum dolor sit', 'amet, consetetur ...']
    )
  })

  it('Should transfer the empty string into an empty list', () => {
    var text = ''
    expect(TextDistributor.distributeText(text, 200, 50)).toEqual(
      []
    )
  })

  it('Should cut a word that is too long for a line', () => {
    var text =       'TooLongWordLongerLongerLongerLongerLonger, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam'
    expect(TextDistributor.distributeText(text, 200, 50)).toEqual(
      ['TooLongWordLongerLonger...', 'consetetur sadipscing ...']
    )
  })
});
