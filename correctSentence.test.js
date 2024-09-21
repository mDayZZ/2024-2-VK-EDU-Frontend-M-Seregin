import correctSentence from './correctSentence';

test('returns false for wrong input', () => {
  expect(correctSentence(12)).toBe(false)
  expect(correctSentence()).toBe(false)
  expect(correctSentence(true)).toBe(false)
  expect(correctSentence("    ")).toBe(false)
  expect(correctSentence(" ")).toBe(false)
})

test('returns correct sentence', () => {
  expect(correctSentence("greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends.")).toBe("Greetings, friends.")
})
