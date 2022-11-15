const vowels = ["a", "e", "i", "o", "u", "ä", "ö", "ü", "ei", "eu", "au", "ie"];

export default function provideHints(subst, solution) {
  if (solution === "der") return shouldBeMasc(subst);
  if (solution === "die") return shouldBeFeminine(subst);
  if (solution === "das") return shouldBeNeutrum(subst);
}

function shouldBeNeutrum(subst) {
  // der-button was pressed, but 'das' is the right answer
  if (subst.endsWith("ett")) {
    return "Hinweis: Fremdwörter auf -ett sind meist neutrum.";
  }
  if (subst.endsWith("ma")) {
    return "Hinweis: Fremdwörter auf -ma sind meist neutrum.";
  }
  if (subst.endsWith("um")) {
    return "Hinweis: Fremdwörter auf -um sind meist neutrum.";
  }
  if (subst.endsWith("nis")) {
    return "Hinweis: Substantive auf -nis sind oft neutrum. Es gibt aber einige Ausnahmen";
  }
  if (subst.endsWith("ment")) {
    return "Hinweis: Substantive auf -ment sind meist neutrum.";
  }
  if (subst.startsWith("Ge")) {
    return "Hinweis: Kollektiva, die mit Ge- beginnen, sind meist neutrum.";
  }
}

function shouldBeFeminine(subst) {
  // der-button was pressed, but 'die' is the right answer
  if (subst.endsWith("ei")) {
    return "Hinweis: Substantive auf -ei sind meist weiblich.";
  }

  if (subst.endsWith("heit")) {
    return "Hinweis: Substantive auf -heit sind meist weiblich.";
  }

  if (subst.endsWith("keit")) {
    return "Hinweis: Substantive auf -keit sind meist weiblich.";
  }

  if (subst.endsWith("schaft")) {
    return "Hinweis: Substantive auf -schaft sind meist weiblich.";
  }

  if (subst.endsWith("ung")) {
    return "Hinweis: Substantive auf -ung sind meist weiblich.";
  }

  if (
    subst.endsWith("e") &&
    check_for_two_syllables(subst, check_for_diphthongs(subst))
  ) {
    return "Hinweis: zweisilbige Substantive auf -e sind meist weiblich.";
  }

  if (subst.endsWith("e")) {
    return "Hinweis: viele Substantive auf -e sind weiblich.";
  }

  if (subst.endsWith("age")) {
    return "Hinweis: Fremdwörter auf -age sind meist weiblich.";
  }

  if (subst.endsWith("ät")) {
    return "Hinweis: Substantive auf -ät sind meist weiblich.";
  }

  if (subst.endsWith("ie")) {
    return "Hinweis: Fremdwörter auf -ie sind meist weiblich.";
  }

  if (subst.endsWith("ion")) {
    return "Hinweis: Substantive auf -ion sind meist weiblich.";
  }
}

function shouldBeMasc(subst) {
  // die-button was pressed, but 'der' is the right answer
  if (subst.endsWith("ig")) {
    return "Hinweis: Substantive auf -ig sind meist männlich.";
  }

  if (subst.endsWith("ling")) {
    return "Hinweis: Substantive auf -ling sind meist männlich.";
  }

  if (subst.endsWith("s") && vowels.indexOf(subst[subst.length - 2]) !== -1) {
    return "Hinweis: Substantive auf Konsonant + s sind meist männlich.";
  }

  if (subst.endsWith("ant")) {
    return "Hinweis: Fremdwörter auf -ant sind meist männlich";
  }

  if (subst.endsWith("är")) {
    return "Hinweis: Fremdwörter auf -är sind meist männlich";
  }

  if (subst.endsWith("eur")) {
    return "Hinweis: Fremdwörter auf -eur sind meist männlich";
  }

  if (subst.endsWith("loge")) {
    return "Hinweis: Fremdwörter auf -loge sind meist männlich";
  }

  if (subst.endsWith("er")) {
    return "Hinweis: Substantive auf -er sind meist männlich.";
  }
}

function check_for_diphthongs(subst) {
  //let subst = subst;
  //   for (const letter of subst.slice(0,-1)) {
  //     //console.log(element);
  //     if (letter == 'e' && subst[])
  // }

  return [...subst.slice(0, -1)].reduce((prev, curr, index) => {
    if (
      (curr === "e" && ["i", "u"].indexOf(subst[index + 1]) !== -1) ||
      (curr === "a" && ["u"].indexOf(subst[index + 1]) !== -1) ||
      (curr === "i" && ["e"].indexOf(subst[index + 1]) !== -1)
    )
      return ++prev;
    return prev;
  }, 0);
}

function check_for_two_syllables(subst, diphthongs) {
  //"""combines number of diphthongs and number of single-letter vowels to correct number of syllables"""

  let vowels = check_for_single_vowels(subst);

  return (
    (vowels === 3 && diphthongs === 2) || // case 1: words like 'Kleie'
    (vowels === 3 && diphthongs === 1) || // case 2: words like 'Pleite'
    (vowels === 4 && diphthongs === 2) || // case 3: words like 'Blaukraut'
    (vowels === 2 && diphthongs === 0)
  ); // case 4: words like 'Vase'
}

function check_for_single_vowels(subst) {
  // """look for vowels that are represented by only one letter""" => count vowels

  //return len([letter for letter in self.subst.lower() if letter in self.vowels])
  return [...subst].filter((letter) => vowels.indexOf(letter) !== -1).length;
}
