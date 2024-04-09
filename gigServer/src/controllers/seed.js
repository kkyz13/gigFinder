const GigsModel = require("../models/Gigs");
const ProviderAuthModel = require("../models/ProviderAuth");
const UserAuthModel = require("../models/UserAuth");

const seedGigs = async (req, res) => {
  try {
    await GigsModel.deleteMany({});
    await GigsModel.create([
      {
        _id: "660e45f3927b404ebe20e6b5",
        title: "Coding Bootcamp in Assembly",
        author: "660e18c73ce8992c2f029a7d",
        dateTimeStart: "2024-04-04T06:17:23.976+00:00",
        pic: "https://res.cloudinary.com/dotft2n3n/image/upload/v1712041769/cld-sample-2.jpg",
        address: "Mt Faber",
        link: "",
        description: "Are you crazy? Who codes in Assembly??!",
        interestUserList: [
          "660e188e3ce8992c2f029a7a",
          "660e3ed8d887266009c0d617",
        ],
        subscribeUserList: "660e3f3b4cb8b6dbc90b6b28",
      },
      {
        _id: "660e45f3927b404ebe20e6b6",
        title: "Shoe Tasting Session",
        author: "660e18c73ce8992c2f029a7d",
        dateTimeStart: Date.now(),
        pic: "https://res.cloudinary.com/dotft2n3n/image/upload/v1712041771/cld-sample-5.jpg",
        address: "Tras Street",
        link: "",
        description:
          "Hi all, I am a shoe connoisseur who enjoys eating shoes, raw, deep fried or grilled. I would like to invite you to a tasting session on a gourmet A5 Onitsuka Tigers",
        interestUserList: ["660e3f3b4cb8b6dbc90b6b28"],
        subscribeUserList: [],
      },
      {
        _id: "660e48cc49b4ea2639d81bcd",
        title: "Learn Shrimp Fried Rice",
        author: "660e46d2927b404ebe20e6bc",
        dateTimeStart: "2024-02-24T06:17:23.976+00:00",
        pic: "https://res.cloudinary.com/dotft2n3n/image/upload/v1712211887/cmzatysazlbbk1xedolt.jpg",
        address: "",
        link: "zoomy.link",
        description: "Shrimp in Catonese is 'Ha', Ha Ha Ha",
        interestUserList: [
          "660e188e3ce8992c2f029a7a",
          "660e3ed8d887266009c0d617",
          "660e3f3b4cb8b6dbc90b6b28",
        ],
        subscribeUserList: [],
      },
    ]);
    res.status(200).json({ status: "ok", msg: "seeded!" });
  } catch (error) {
    console.error(error.message);
    res.json({ Status: "error", msg: "seed gig error" });
  }
};

const seedUser = async (req, res) => {
  try {
    await UserAuthModel.deleteMany({});
    await UserAuthModel.create([
      {
        _id: "660e188e3ce8992c2f029a7a",
        name: "tester",
        biography: "im a tester",
        phoneNumber: "1111111",
        email: "test@mail.com",
        hash: "$2b$12$3LA/rxEzyz4kJWqcrTPTT.aP3NeBFTLTGhb33ST2YoJyjGn7xCaty",
        interestGigsList: [
          "660e45f3927b404ebe20e6b5",
          "660e48cc49b4ea2639d81bcd",
        ],
        subscribeGigsList: [],
      },
      {
        _id: "660e3ed8d887266009c0d617",
        name: "tester2",
        biography: "I am a 2nd tester",
        phoneNumber: "12345678",
        email: "test2@mail.com",
        hash: "$2b$12$0BNAKneHnLVOOWqRPiI.zuTaExIygCSyPgZ71.qUj9/qx8.SN0qim",
        interestGigsList: [
          "660e45f3927b404ebe20e6b5",
          "660e48cc49b4ea2639d81bcd",
        ],
        subscribeGigsList: [],
      },
      {
        _id: "660e3f3b4cb8b6dbc90b6b28",
        name: "crazy ken",
        biography: "crazyyyyyyyyy",
        phoneNumber: "i am so crazy",
        email: "test3@mail.com",
        hash: "$2b$12$8R0Bn7ln9r0o3Dxt2SAlv.Ley416QAvx7Cv2JE.s0deii1cgNOwt6",
        interestGigsList: ["660e48cc49b4ea2639d81bcd"],
        subscribeGigsList: [
          "660e45f3927b404ebe20e6b5",
          "660e45f3927b404ebe20e6b6",
        ],
      },
    ]);
    res.status(200).json({ status: "ok", msg: "user seeded!" });
  } catch (error) {
    console.error(error.message);
    res.json({ Status: "error", msg: "seed user error" });
  }
};

const seedProvider = async (req, res) => {
  try {
    await ProviderAuthModel.deleteMany({});
    await ProviderAuthModel.create([
      {
        _id: "660e18c73ce8992c2f029a7d",
        name: "provider",
        biography: "hi i am a provider",
        phoneNumber: "2222222",
        email: "provider@mail.com",
        hash: "$2b$12$JjmgBaxV.3hD1bMhrZGESOdQal1CFHz3hx6F9byWGCkdPaLN87HAW",
        hostGigsList: ["660e45f3927b404ebe20e6b5", "660e45f3927b404ebe20e6b6"],
      },
      {
        _id: "660e46d2927b404ebe20e6bc",
        name: "Martin Yan",
        biography: "Learn from one of the most famous chefs from Hong Kong!",
        phoneNumber: "13131313",
        email: "yancancook@mail.com",
        hash: "$2b$12$bd.zae72JkHOnTAlom9G9eAwlhk.Nxkeq7Hvx37Z6k23Tzz72HLou",
        hostGigsList: ["660e48cc49b4ea2639d81bcd"],
      },
      {
        _id: "66138bd854d75d0a99142ee3",
        name: "Admin",
        biography: "Admin",
        phoneNumber: "12345678",
        email: "admin@admin.com",
        hash: "$2b$12$c8MKeiaLmCRztyrFwZzbOeDssnLQ2SitGBkFxaAMLZYFnzAYxwLYq",
        hostGigsList: [],
      },
    ]);
    res.status(200).json({ status: "ok", msg: "provider seeded!" });
  } catch (error) {}
};
module.exports = { seedGigs, seedUser, seedProvider };
