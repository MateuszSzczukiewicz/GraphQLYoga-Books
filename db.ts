export default {
  // BOOKS
  books: [
    {
      id: "b32b9538-9af9-43c4-ba77-cbfe7041569a",
      title: "Amazing Book #1",
      authors: [
        "dff1909c7-d6ce-449e-b35f-41c058463075",
        "78e92bc5-0518-4857-93da-196b0230ee9b",
      ],
    },
    {
      id: "d2854f64-80a2-45b4-94b8-3897da845f7b",
      title: "Amazing Book #2",
      authors: ["4df0f1c4-befd-467a-af05-60b5f94b2341"],
    },
    {
      id: "9ed38533-b884-4eb2-a68b-e4f1ef885760",
      title: "Amazing Book #3",
      authors: ["2e426c72-fcfa-4737-850f-9aee8cb284ea"],
    },
    {
      id: "98d051df-95ba-4ec5-aab5-19af4796cee8",
      title: "Amazing Book #4",
      authors: [
        "d0f001ec-a71c-4631-aa2d-500e3325c718",
        "ff4547fb-b43d-4f61-b7a5-733d00b44825",
      ],
    },
  ],
  // AUTHORS
  authors: [
    {
      id: "d0f001ec-a71c-4631-aa2d-500e3325c718",
      firstName: "Joe",
      lastName: "Doe",
    },
    {
      id: "78e92bc5-0518-4857-93da-196b0230ee9b",
      firstName: "Calvin",
      lastName: "Klein",
    },
    {
      id: "2e426c72-fcfa-4737-850f-9aee8cb284ea",
      firstName: "Brian",
      lastName: "Tracy",
    },
    {
      id: "4df0f1c4-befd-467a-af05-60b5f94b2341",
      firstName: "Daniel",
      lastName: "Goleman",
    },
    {
      id: "dff1909c7-d6ce-449e-b35f-41c058463075",
      firstName: "Hans",
      lastName: "Rosling",
    },
    {
      id: "ff4547fb-b43d-4f61-b7a5-733d00b44825",
      firstName: "Emily",
      lastName: "Bronte",
    },
  ],
  // COMMENTS
  comments: [
    {
      id: "e5062cca-4d31-459c-8a47-24d6ee32475a",
      bookId: "b32b9538-9af9-43c4-ba77-cbfe7041569a",
      content:
        "Approved Comment is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an uive centuries, but also the leap into electronic typesetting.",
      approved: true,
    },
    {
      id: "e5062cca-4d31-459c-8a47-24d6ee32475b",
      bookId: "9ed38533-b884-4eb2-a68b-e4f1ef885760",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an uive centuries, but also the leap into electronic typesetting.",
      approved: false,
    },
  ],

  // Example only for inline fragments puproses
  // PEOPLE
  women: [
    {
      id: "e50s2cca-4d31-459c-8a47-24d622312475a",
      age: 30,
      firstName: "Hillary",
      lastName: "Clinton",
      favoriteClothes: ["Dress", "T-Shirt"],
    },
  ],
  men: [
    {
      id: "e50s2bba-4d31-459c-8a47-24d622312476a",
      age: 55,
      firstName: "Brad",
      lastName: "Pitt",
      favoriteCars: ["Porsche", "Mercedes", "BMW"],
    },
  ],
};
