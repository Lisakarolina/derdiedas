# Guess-the-article-Game
This little game is supposed to help with learning the grammatical gender of German substantives which can be quite tricky. You are shown a word and decide which of the three articles (der, die, das) is the correct one. 
The substantives with their respective article are stored in a firestore database. A random word is picked from the database and gets presented to the user. Additionally I went through the rules that apply for grammatical genders of German substantives and on that basis implemented hints that remind the user of the underlying rule when they get an article wrong that could be derived from an existing rule. For Example, if the user mistakenly chooses the article 'das' when presented with the word 'Tasse', he/she is reminded that two-syllable-words that end in -e are usually female.

![der-die-das-improved](https://user-images.githubusercontent.com/44520955/208705829-f33b5624-4dc3-4255-a709-b491170b90ec.png)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

