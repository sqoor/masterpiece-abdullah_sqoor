const Lesson = require("../models/lesson");

exports.getAll = (req, res) => {
  const lessons = [
    {
      id: 1,
      name: "alphabets-basics",
      image: "no-image",
      progress: "100",
      questions: [
        {
          id: 30,
          language: {
            question: "en",
            answer: "ar"
          },
          formate: "text",
          type: "make-sentence",
          question: "a man",
          choices: ["م", "ن", "ع", "د"],
          answer: "رجل"
        },
        {
          id: 31,
          language: {
            question: "ar",
            answer: "en"
          },
          formate: "text",
          type: "make-sentence",
          question: "هل تستظيع الكتابة",
          choices: ["She", "sun", "read", "man"],
          answer: "Can you write"
        },
        {
          id: 32,
          language: {
            question: "en",
            answer: "ar"
          },
          formate: "text",
          type: "make-sentence",
          question: "Third type of questions",
          choices: ["سيارة", "نور", "مرحبا", "احمد"],
          answer: "ثالث انواع الاسئلة"
        },
        {
          id: 33,
          language: {
            question: "ar",
            answer: "en"
          },
          formate: "text",
          type: "make-sentence",
          question: "انا ادرس  اللغة العربية",
          choices: ["He", "when", "there", "sometimes"],
          answer: "I am styding the Arabic Languge"
        },
        {
          id: 34,
          language: {
            question: "en",
            answer: "ar"
          },
          formate: "text",
          type: "make-sentence",
          question: "I Love the life",
          choices: ["و", "هو", "معين", "كتاب"],
          answer: "أنا احب الحياة"
        }
      ]
    },
    {
      id: 2,
      name: "alphabets-ii",
      image: "no-image",
      progress: "60",
      questions: [
        {
          id: 21,
          language: {
            question: "ar",
            answer: "ar"
          },
          formate: "text",
          type: "fill-blank",
          question: ".مرحبا بكم في موقعنا", // link to audio/video
          choices: ["العلم", "نور", "الجميل", "احمد"],
          answer: "في"
        },
        {
          id: 22,
          language: {
            question: "ar",
            answer: "ar"
          },
          formate: "text",
          type: "fill-blank",
          question: "اين السؤال الثاني؟", // link to audio/video
          choices: ["سيارة", "نور", "مرحبا", "احمد"],
          answer: "اين"
        },
        {
          id: 23,
          language: {
            question: "ar",
            answer: "ar"
          },
          formate: "text",
          type: "fill-blank",
          question: "انا ادرس  اللغة العربية", // link to audio/video
          choices: ["مشيت", "وقف", "الشمس", "صباحاً"],
          answer: "ادرس"
        }
      ]
    },
    {
      id: 3,
      name: "alphabets-advance",
      image: "no-image",
      progress: "10",
      questions: [
        {
          id: 1,
          // type: "multiple-choice|fill-blank|make-sentence",
          // formate: "text|audio|video",
          language: {
            question: "ar",
            answer: "en"
          },
          type: "multiple-choice",
          formate: "video",
          question: "http://localhost:8000/path/to/video",
          choices: [
            "This is a text question",
            "I want to go",
            "You need to work hard",
            "Goodbye"
          ],
          answer: "This is a text question"
        },
        {
          id: 2,
          // type: "multiple-choice|fill-blank|make-sentence",
          // formate: "text|audio|video",
          language: {
            question: "ar",
            answer: "en"
          },
          type: "multiple-choice",
          formate: "audio",
          question: "هذا سؤال كتابي",
          choices: [
            "This is a text question",
            "I want to go",
            "You need to work hard",
            "Goodbye"
          ],
          answer: "This is a text question"
        },
        {
          id: 3,
          language: {
            question: "ar",
            answer: "en"
          },
          type: "multiple-choice",
          formate: "audio",
          question: "هذا سؤال صوتي",
          choices: [
            "what do you hear",
            "Hi",
            "That is an audio question",
            "See you later"
          ],
          answer: "That is an audio question"
        },
        {
          id: 4,
          language: {
            question: "ar",
            answer: "en"
          },
          type: "multiple-choice",
          formate: "text",
          question: "مرحبا", // link to audio/video
          choices: ["Day", "Hello", "Goodbye", "See you later"],
          answer: "Hello"
        }
      ]
    },
    {
      id: 4,
      name: "greetings",
      image: "no-image",
      progress: "0", // get from the logged user.
      questions: []
    },
    {
      id: 5,
      name: "greetings",
      image: "no-image",
      progress: "0", // get from the logged user.
      questions: []
    },
    {
      id: 6,
      name: "greetings",
      image: "no-image",
      progress: "0", // get from the logged user.
      questions: []
    },
    {
      id: 7,
      name: "greetings",
      image: "no-image",
      progress: "0", // get from the logged user.
      questions: []
    },
    {
      id: 8,
      name: "greetings",
      image: "no-image",
      progress: "0", // get from the logged user.
      questions: []
    },
    {
      id: 9,
      name: "greetings",
      image: "no-image",
      progress: "0", // get from the logged user.
      questions: []
    }
  ];

  return res.status(200).json(lessons);
};

// todo
exports.create = (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    // TODO: substring the /uploads, IF IMAGE name has spaces it won't be retrieved
    // str = str.replace(/\s/g, '-')
    image: req.file.path
  };

  Lesson.create(product)
    .then(newProduct => {
      res.status(201).json(newProduct);
    })
    .catch(err =>
      res.status(500).json({
        error: err
      })
    );
};

exports.getOne = (req, res) => {
  const _id = req.params.id;

  Lesson.findById({ _id })
    .then(product => {
      if (product) res.status(200).json(product);
      res.status(200).json({
        message: "There is not product with provided ID."
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.updateOne = (req, res) => {
  const _id = req.params.id;
  const fields = req.body;

  Lesson.update({ _id }, fields)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.deleteOne = (req, res) => {
  const _id = req.body.id;

  Lesson.deleteOne(_id)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }));
};

/* 
exports.getAll = (req, res, next) => {
  Lesson.find({})
    .select("name price _id image")
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.create = (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    // TODO: substring the /uploads, IF IMAGE name has spaces it won't be retrieved
    // str = str.replace(/\s/g, '-')
    image: req.file.path
  };

  Lesson.create(product)
    .then(newProduct => {
      res.status(201).json(newProduct);
    })
    .catch(err =>
      res.status(500).json({
        error: err
      })
    );
};

exports.getOne = (req, res) => {
  const _id = req.params.id;

  Lesson.findById({ _id })
    .then(product => {
      if (product) res.status(200).json(product);
      res.status(200).json({
        message: "There is not product with provided ID."
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.updateOne = (req, res) => {
  const _id = req.params.id;
  const fields = req.body;

  Lesson.update({ _id }, fields)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.deleteOne = (req, res) => {
  const _id = req.body.id;

  Lesson.deleteOne(_id)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }));
};
 */
