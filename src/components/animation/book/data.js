const DATA = [
  {
    isbn: "9781250758842",
    name: "Winter's Orbit",
    author: "Everina Maxwell",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/winters-orbit.jpg",
    abstract:
      "While the Iskat Empire has long dominated the system through treaties and political alliances, several planets, including Thea, have begun to chafe under Iskat's rule. When tragedy befalls Imperial Prince Taam, his Thean widower, Jainan, is rushed into an arranged marriage with Taam's cousin, the disreputable Kiem, in a bid to keep the rising hostilities between the two worlds under control.",
  },
  {
    isbn: "9781500453305",
    name: "The Long Way to a Small, Angry Planet",
    author: "Becky Chambers",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/small-angry.jpg",
    abstract:
      "Follow a motley crew on an exciting journey through space-and one adventurous young explorer who discovers the meaning of family in the far reaches of the universe-in this light-hearted debut space opera from a rising sci-fi star.",
  },
  {
    isbn: "9781473621442",
    name: "A Closed and Common Orbit",
    author: "Becky Chambers",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/common-orbit.jpg",
    abstract:
      "Lovelace was once merely a ship's artificial intelligence. When she wakes up in an new body, following a total system shut-down and reboot, she has no memory of what came before. As Lovelace learns to negotiate the universe and discover who she is, she makes friends with Pepper, an excitable engineer, who's determined to help her learn and grow.",
  },
  {
    isbn: "9781473647602",
    name: "Record of a Spaceborn Few",
    author: "Becky Chambers",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/spaceborn.jpg",
    abstract:
      "Centuries after the last humans left Earth, the Exodus Fleet is a living relic, a place many are from but few outsiders have seen. Humanity has finally been accepted into the galactic community, but while this has opened doors for many, those who have not yet left for alien cities fear that their carefully cultivated way of life is under threat.",
  },
  {
    isbn: "9780062936059",
    name: "The Galaxy, and the Ground Within",
    author: "Becky Chambers",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/ground-within.jpg",
    abstract:
      "With no water, no air, and no native life, the planet Gora is unremarkable. The only thing it has going for it is a chance proximity to more popular worlds, making it a decent stopover for ships traveling between the wormholes that keep the Galactic Commons connected. If deep space is a highway, Gora is just your average truck stop.",
  },
  {
    isbn: "B074DZ1HBG",
    name: "Dial D for Deadman",
    author: "Barry J. Hutchison",
    coverSrc: "https://sandpack-bundler.vercel.app/img/book-covers/deadman.jpg",
    abstract:
      "In an alien city torn apart by crooked cops and ruthless criminals, private detective, Dan Deadman, specializes in cases unusual and bizarre.\n\nSure, he doesn't smell great, and he's technically been dead for quite some time, but if you've got a rampaging Hell-beast tearing up your street, or a portal to another dimension appearing in your bathroom, Dan's your man.",
  },
  {
    isbn: "9781612184715",
    name: "Off to Be the Wizard",
    author: "Scott Meyer",
    coverSrc: "https://sandpack-bundler.vercel.app/img/book-covers/wizard.jpg",
    abstract:
      "Martin Banks is just a normal guy who has made an abnormal discovery: he can manipulate reality, thanks to reality being nothing more than a computer program. With every use of this ability, though, Martin finds his little “tweaks” have not escaped notice. Rather than face prosecution, he decides instead to travel back in time to the Middle Ages and pose as a wizard.",
  },
  {
    isbn: "9781477830918",
    name: "Master of Formalities",
    author: "Scott Meyer",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/formalities.jpg",
    abstract:
      "Even when finding oneself engaged in interstellar war, good form must be observed. Our story is set thousands of years after the Terran Exodus, where two powerful, planet-dominating families—the elegant House Jakabitus and the less refined Hahn Empire—have reached a critical point in their generations-long war. Master Hennik, the Hahn ruler’s only son, has been captured, and the disposition of his internment may represent a last and welcome chance for peace.",
  },
  {
    isbn: "B015Q9EKA0",
    name: "The Authorities™",
    author: "Scott Meyer",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/authorities.jpg",
    abstract:
      "Sinclair Rutherford is a young Seattle cop with a taste for the finer things. Doing menial tasks and getting hassled by superiors he doesn't respect are definitely not “finer things.” Good police work and bad luck lead him to crack a case that changes quickly from a career-making break into a high-profile humiliation when footage of his pursuit of the suspect—wildly inappropriate murder weapon in hand—becomes an Internet sensation.",
  },
  {
    isbn: "B01LWAESYQ",
    name: "We Are Legion (We Are Bob)",
    author: "Dennis E. Taylor",
    coverSrc: "https://sandpack-bundler.vercel.app/img/book-covers/bob.jpg",
    abstract:
      "Bob Johansson has just sold his software company and is looking forward to a life of leisure. There are places to go, books to read, and movies to watch. So it's a little unfair when he gets himself killed crossing the street.\n\nBob wakes up a century later to find that corpsicles have been declared to be without rights, and he is now the property of the state. He has been uploaded into computer hardware and is slated to be the controlling AI in an interstellar probe looking for habitable planets. The stakes are high: no less than the first claim to entire worlds. If he declines the honor, he'll be switched off, and they'll try again with someone else. If he accepts, he becomes a prime target. There are at least three other countries trying to get their own probes launched first, and they play dirty.",
  },
  {
    isbn: "9781506701653",
    name: "Will Save The Galaxy For Food",
    author: "Yahtzee Croshaw",
    coverSrc: "https://sandpack-bundler.vercel.app/img/book-covers/mckeown.jpg",
    abstract:
      "A not-quite epic science fiction adventure about a down-on-his luck galactic pilot caught in a cross-galaxy struggle for survival! Space travel just isn't what it used to be. With the invention of Quantum Teleportation, space heroes aren't needed anymore. When one particularly unlucky ex-adventurer masquerades as famous pilot and hate figure Jacques McKeown, he's sucked into an ever-deepening corporate and political intrigue. Between space pirates, adorable deadly creatures, and a missing fortune in royalties, saving the universe was never this difficult!",
  },
  {
    isbn: "B00FZ4OPI4",
    name: "Screw The Galaxy: Hard Luck Hank",
    author: "Steven Campbell",
    coverSrc: "https://sandpack-bundler.vercel.app/img/book-covers/hank.jpg",
    abstract:
      "Hank is a thug. He knows he's a thug. He has no problem with that realization. In his view the galaxy has given him a gift: a mutation that allows him to withstand great deals of physical trauma. He puts his abilities to the best use possible and that isn't by being a scientist.",
  },
  {
    isbn: "9788497939201",
    name: "Artemis Fowl",
    author: "Eoin Colfer",
    coverSrc: "https://sandpack-bundler.vercel.app/img/book-covers/fowl.jpg",
    abstract:
      "Twelve-year-old Artemis Fowl is a millionaire, a genius, and above all, a criminal mastermind. But even Artemis doesn't know what he's taken on when he kidnaps a fairy, Captain Holly Short of the LEPrecon Unit. These aren't the fairies of bedtime stories—they're dangerous! Full of unexpected twists and turns, Artemis Fowl is a riveting, magical adventure.",
  },
  {
    isbn: "9781786186300",
    name: "Tune In Tomorrow",
    author: "Randee Dawn",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/tune-in-tomorrow.jpg",
    abstract:
      "Starr Weatherby came to New York to become… well, a star. But after ten years and no luck, she’s offered a big role – on a show no one has ever heard of. And there’s a reason for that. It’s a ‘reality’ show beyond the Veil, human drama, performed for the entertainment of the Fae.",
  },
  {
    isbn: "9781443434867",
    name: "Station Eleven",
    author: "Emily St. John Mandel",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/station-eleven.jpg",
    abstract:
      "An audacious, darkly glittering novel set in the eerie days of civilization’s collapse, Station Eleven tells the spellbinding story of a Hollywood star, his would-be savior, and a nomadic group of actors roaming the scattered outposts of the Great Lakes region, risking everything for art and humanity.",
  },
  {
    isbn: "B000SEIK2S",
    name: "Old Man's War",
    author: "John Scalzi",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/old-mans-war.jpg",
    abstract:
      "John Perry did two things on his 75th birthday. First he visited his wife's grave. Then he joined the army.\n\nThe good news is that humanity finally made it into interstellar space. The bad news is that planets fit to live on are scarce-- and alien races willing to fight us for them are common. So: we fight. To defend Earth, and to stake our own claim to planetary real estate. Far from Earth, the war has been going on for decades: brutal, bloody, unyielding.",
  },
  {
    isbn: "9780316229296",
    name: "The Fifth Season",
    author: "N.K. Jemisin",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/fifth-season.jpg",
    abstract:
      "This is the way the world ends. Again.\n\nThree terrible things happen in a single day. Essun, a woman living an ordinary life in a small town, comes home to find that her husband has brutally murdered their son and kidnapped their daughter. Meanwhile, mighty Sanze -- the world-spanning empire whose innovations have been civilization's bedrock for a thousand years -- collapses as most of its citizens are murdered to serve a madman's vengeance. And worst of all, across the heart of the vast continent known as the Stillness, a great red rift has been torn into the heart of the earth, spewing ash enough to darken the sky for years. Or centuries.",
  },
  {
    isbn: "9781250758866",
    name: "Ocean’s Echo",
    author: "Everina Maxwell",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/oceans-echo.jpg",
    abstract:
      "Rich socialite, inveterate flirt, and walking disaster Tennalhin Halkana can read minds. Tennal, like all neuromodified “readers,” is a security threat on his own. But when controlled, readers are a rare asset. Not only can they read minds, but they can navigate chaotic space, the maelstroms surrounding the gateway to the wider universe.",
  },
  {
    isbn: "9781682300688",
    name: "Dreadnought",
    author: "April Daniels",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/dreadnought.jpg",
    abstract:
      "Until Dreadnought fell out of the sky and died right in front of her, Danny was trying to keep people from finding out she’s transgender. But before he expired, Dreadnought passed his mantle to her, and those secondhand superpowers transformed Danny’s body into what she’s always thought it should be. Now there’s no hiding that she’s a girl.\n\nIt should be the happiest time of her life, but Danny’s first weeks finally living in a body that fits her are more difficult and complicated than she could have imagined. Between her father’s dangerous obsession with “curing” her girlhood, her best friend suddenly acting like he’s entitled to date her, and her fellow superheroes arguing over her place in their ranks, Danny feels like she’s in over her head.",
  },
  {
    isbn: "9781250788870",
    name: "A Marvellous Light",
    author: "Freya Marske",
    coverSrc:
      "https://sandpack-bundler.vercel.app/img/book-covers/marvellous-light.jpg",
    abstract:
      "Set in an alternative Edwardian England, this is a comedy of manners, manor houses, and hedge mazes: including a magic-infused murder mystery and a delightful queer romance.",
  },
];

export default DATA;
