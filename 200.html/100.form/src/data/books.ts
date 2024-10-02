export interface Book {
  id: number
  title: string
  author: string
  cost: number
  sold: number
  reviews: {
    name: string
    text: string
    star: number
  }[]
  releasedDate: Date
}

export const books: Book[] = [
  {
    id: 1,
    title: 'The Art of Programming',
    author: 'Alice Johnson',
    cost: 590,
    sold: 414,
    releasedDate: new Date('2023-02-05'),
    reviews: [
      {
        name: 'John Doe',
        text: 'An excellent read for any programmer!',
        star: 5,
      },
      {
        name: 'Jane Smith',
        text: 'Very insightful, but a bit dense.',
        star: 4,
      },
      {
        name: 'Alice Brown',
        text: 'Great for advanced learners, not beginners.',
        star: 4,
      },
      {
        name: 'Mark Johnson',
        text: 'Covers all essential topics, highly recommend.',
        star: 5,
      },
      {
        name: 'Emily Davis',
        text: 'Well structured, but too many examples.',
        star: 4,
      },
      { name: 'Chris Lee', text: 'A solid reference book.', star: 4 },
      { name: 'Jordan Wilson', text: 'Could be more engaging.', star: 3 },
      { name: 'Pat Taylor', text: 'Love the depth of information!', star: 5 },
      { name: 'Taylor Clark', text: 'It’s a bit heavy on theory.', star: 4 },
      { name: 'Jamie White', text: 'A must-have for programmers.', star: 5 },
      { name: 'Sam Martinez', text: 'Invaluable resource!', star: 5 },
      {
        name: 'Kimberly Harris',
        text: 'Not for the faint-hearted, but very rewarding.',
        star: 4,
      },
    ],
  },
  {
    id: 2,
    title: 'Mastering TypeScript',
    author: 'David Brown',
    cost: 550,
    sold: 338,
    releasedDate: new Date('2018-01-06'),
    reviews: [
      {
        name: 'Liam Smith',
        text: 'A comprehensive guide to TypeScript.',
        star: 5,
      },
      {
        name: 'Olivia Johnson',
        text: 'Easy to follow, highly recommend.',
        star: 4,
      },
      {
        name: 'Emma Davis',
        text: 'Great for understanding TypeScript nuances.',
        star: 4,
      },
      { name: 'Noah Wilson', text: 'Covers everything you need!', star: 5 },
      {
        name: 'Sophia Garcia',
        text: 'Solid explanations, but could use more examples.',
        star: 4,
      },
      {
        name: 'Jacob Martinez',
        text: 'Helped me a lot with my projects.',
        star: 5,
      },
      {
        name: 'Isabella Clark',
        text: 'Good content but a bit repetitive.',
        star: 3,
      },
      {
        name: 'Mason Lewis',
        text: 'Perfect for transitioning from JavaScript.',
        star: 5,
      },
      {
        name: 'Ava Robinson',
        text: 'Very useful, even for experienced devs.',
        star: 4,
      },
      {
        name: 'Charlotte Walker',
        text: 'Good book overall, but a bit dry.',
        star: 3,
      },
      { name: 'James Hall', text: 'In-depth, yet approachable.', star: 4 },
    ],
  },
  {
    id: 3,
    title: 'Learning React',
    author: 'Bob Smith',
    cost: 590,
    sold: 550,
    releasedDate: new Date('2015-07-15'),
    reviews: [
      {
        name: 'Ella Thompson',
        text: 'Fantastic introduction to React!',
        star: 5,
      },
      {
        name: 'Henry Moore',
        text: 'Great for beginners, very clear.',
        star: 4,
      },
      {
        name: 'Aiden Lee',
        text: 'Good but missing some advanced topics.',
        star: 4,
      },
      {
        name: 'Mia Martin',
        text: 'Very practical, loved the examples.',
        star: 5,
      },
      {
        name: 'Lucas Rodriguez',
        text: 'Could benefit from more exercises.',
        star: 4,
      },
      {
        name: 'Grace Gonzalez',
        text: 'A solid foundation for React development.',
        star: 5,
      },
      {
        name: 'Dylan Perez',
        text: 'Well-written and easy to understand.',
        star: 4,
      },
      { name: 'Chloe Johnson', text: 'Helpful insights and tips.', star: 5 },
    ],
  },
  {
    id: 4,
    title: 'Advanced Python',
    author: 'Emma Davis',
    cost: 490,
    sold: 468,
    releasedDate: new Date('2023-09-22'),
    reviews: [
      {
        name: 'Ethan Harris',
        text: 'Deep dive into Python. Very informative!',
        star: 5,
      },
      { name: 'Victoria Young', text: 'Complex but rewarding.', star: 4 },
      {
        name: 'Sofia Hill',
        text: 'Great for experienced programmers.',
        star: 4,
      },
      {
        name: 'Liam Walker',
        text: 'Some sections could be simplified.',
        star: 3,
      },
      {
        name: 'Lily Allen',
        text: 'Excellent for mastering Python features.',
        star: 5,
      },
      { name: 'William King', text: 'Well structured and engaging.', star: 4 },
      {
        name: 'Zoe Scott',
        text: 'A must-read for Python developers.',
        star: 5,
      },
      { name: 'Lucas Lee', text: 'Invaluable resource!', star: 5 },
      {
        name: 'Emma Green',
        text: 'Covers a lot of ground, well worth it.',
        star: 4,
      },
      {
        name: 'Avery Edwards',
        text: 'A little advanced for beginners.',
        star: 3,
      },
      { name: 'Liam Baker', text: 'Highly detailed, very helpful.', star: 5 },
    ],
  },
  {
    id: 5,
    title: 'JavaScript Essentials',
    author: 'John Wilson',
    cost: 600,
    sold: 641,
    releasedDate: new Date('2017-10-13'),
    reviews: [
      {
        name: 'Jackson Carter',
        text: 'Great for beginners and refreshers.',
        star: 5,
      },
      {
        name: 'Catherine Mitchell',
        text: 'Good examples, but a bit basic.',
        star: 4,
      },
      {
        name: 'Sophia Collins',
        text: 'Solid introduction to JavaScript.',
        star: 4,
      },
      {
        name: 'Henry Johnson',
        text: 'Useful for learning the fundamentals.',
        star: 5,
      },
      { name: 'Isabella Moore', text: 'Loved the hands-on approach!', star: 5 },
      {
        name: 'Mason Lewis',
        text: 'Some concepts were too simplified.',
        star: 3,
      },
      {
        name: 'Olivia Thompson',
        text: 'Well organized and easy to follow.',
        star: 4,
      },
      {
        name: 'Benjamin White',
        text: 'Highly recommend for new developers.',
        star: 5,
      },
    ],
  },
  {
    id: 6,
    title: 'C++ for Beginners',
    author: 'Sophia Martinez',
    cost: 690,
    sold: 186,
    releasedDate: new Date('2014-06-30'),
    reviews: [
      { name: 'Ella Lee', text: 'A great starting point for C++.', star: 5 },
      {
        name: 'Jacob Martinez',
        text: 'Good book for beginners, but some parts were unclear.',
        star: 4,
      },
      {
        name: 'Liam Walker',
        text: 'Very detailed, perfect for new learners.',
        star: 5,
      },
      { name: 'Emily Davis', text: 'Covers all basics well.', star: 4 },
      { name: 'Michael Smith', text: 'Some examples were outdated.', star: 3 },
      {
        name: 'Amelia Brown',
        text: 'Helpful for understanding concepts.',
        star: 4,
      },
      {
        name: 'Oliver Johnson',
        text: 'An essential guide for newbies.',
        star: 5,
      },
      {
        name: 'Sophia Wilson',
        text: 'Good resource for C++ fundamentals.',
        star: 4,
      },
    ],
  },
  {
    id: 7,
    title: 'Data Structures in Java',
    author: 'Liam Garcia',
    cost: 450,
    sold: 230,
    releasedDate: new Date('2019-02-24'),
    reviews: [
      {
        name: 'Ethan Hall',
        text: 'Thorough and detailed coverage of data structures.',
        star: 5,
      },
      {
        name: 'Ava Thompson',
        text: 'Great for preparing for interviews!',
        star: 4,
      },
      {
        name: 'Daniel Martinez',
        text: 'Good, but could use more practical examples.',
        star: 3,
      },
      {
        name: 'Mia White',
        text: 'Very helpful for understanding Java data structures.',
        star: 5,
      },
      {
        name: 'Noah Garcia',
        text: 'Excellent explanations and diagrams.',
        star: 5,
      },
      { name: 'Emma Lee', text: 'A bit heavy on theory.', star: 4 },
      {
        name: 'Lucas Johnson',
        text: 'Covers all essential data structures.',
        star: 5,
      },
      {
        name: 'Chloe Wilson',
        text: 'Well written and easy to understand.',
        star: 4,
      },
    ],
  },
  {
    id: 8,
    title: 'Web Development with HTML & CSS',
    author: 'Olivia Anderson',
    cost: 390,
    sold: 308,
    releasedDate: new Date('2021-04-19'),
    reviews: [
      {
        name: 'Benjamin Adams',
        text: 'A fantastic guide for beginners!',
        star: 5,
      },
      {
        name: 'Sophia Clark',
        text: 'Good coverage of HTML and CSS basics.',
        star: 4,
      },
      { name: 'Ethan Harris', text: 'Very clear and well-explained.', star: 4 },
      {
        name: 'Emma Baker',
        text: 'Perfect introduction to web development.',
        star: 5,
      },
      {
        name: 'Mason Green',
        text: 'Not enough on responsive design.',
        star: 3,
      },
      { name: 'Isabella Perez', text: 'Simple and easy to follow.', star: 4 },
      {
        name: 'Avery Thompson',
        text: 'Loved the practical examples.',
        star: 5,
      },
      { name: 'Lucas Mitchell', text: 'Very helpful for beginners.', star: 4 },
    ],
  },
  {
    id: 9,
    title: 'SQL for Data Analysis',
    author: 'James Brown',
    cost: 470,
    sold: 501,
    releasedDate: new Date('2019-07-29'),
    reviews: [
      { name: 'Lily White', text: 'Invaluable for data analysts.', star: 5 },
      {
        name: 'David Wilson',
        text: 'Very well written, highly recommend.',
        star: 5,
      },
      { name: 'Grace Hall', text: 'A great introduction to SQL.', star: 4 },
      {
        name: 'Daniel Young',
        text: 'Good examples, but more depth needed.',
        star: 3,
      },
      { name: 'Ella Scott', text: 'Perfect for learning SQL basics.', star: 5 },
      {
        name: 'Matthew Green',
        text: 'Somewhat outdated, but still helpful.',
        star: 4,
      },
      { name: 'Zoe Carter', text: 'Highly recommend for beginners.', star: 5 },
      {
        name: 'Oliver Lewis',
        text: 'Clear, concise, and easy to follow.',
        star: 4,
      },
    ],
  },
  {
    id: 10,
    title: 'Machine Learning Made Simple',
    author: 'Chloe Roberts',
    cost: 690,
    sold: 413,
    releasedDate: new Date('2020-11-11'),
    reviews: [
      {
        name: 'Michael Davis',
        text: 'A very approachable introduction.',
        star: 5,
      },
      {
        name: 'Sophia Brown',
        text: 'Simplified complex concepts well.',
        star: 4,
      },
      {
        name: 'Aiden Garcia',
        text: 'A bit too basic for experienced readers.',
        star: 3,
      },
      { name: 'Mia Robinson', text: 'Perfect for beginners in ML.', star: 5 },
      {
        name: 'Ethan Lee',
        text: 'Good book, but missing some details.',
        star: 4,
      },
      { name: 'Olivia Martinez', text: 'Engaging and easy to read.', star: 5 },
      {
        name: 'Daniel Johnson',
        text: 'Solid coverage of fundamentals.',
        star: 4,
      },
      { name: 'Ava Moore', text: 'Loved the examples and exercises.', star: 5 },
    ],
  },
  {
    id: 11,
    title: 'Algorithms Unlocked',
    author: 'Emily Walker',
    cost: 450,
    sold: 529,
    releasedDate: new Date('2018-06-02'),
    reviews: [
      {
        name: 'Henry Perez',
        text: 'A great introduction to algorithms.',
        star: 5,
      },
      {
        name: 'Chloe Gonzalez',
        text: 'Well structured and easy to understand.',
        star: 4,
      },
      { name: 'Liam Thompson', text: 'A little too academic for me.', star: 3 },
      {
        name: 'Grace Adams',
        text: 'Good for building foundational knowledge.',
        star: 4,
      },
      {
        name: 'Avery Martinez',
        text: 'Highly recommend for CS students.',
        star: 5,
      },
      {
        name: 'Lucas Scott',
        text: 'Clear explanations, well-written.',
        star: 4,
      },
      {
        name: 'Sofia Collins',
        text: 'Helpful for learning the basics.',
        star: 5,
      },
      {
        name: 'Benjamin Anderson',
        text: 'Great introduction, but lacks depth.',
        star: 3,
      },
    ],
  },
  {
    id: 12,
    title: 'Introduction to Cybersecurity',
    author: 'Liam Brown',
    cost: 290,
    sold: 257,
    releasedDate: new Date('2022-03-14'),
    reviews: [
      {
        name: 'Jacob Hall',
        text: 'A must-read for cybersecurity beginners.',
        star: 5,
      },
      {
        name: 'Ella Thompson',
        text: 'Very informative and engaging.',
        star: 5,
      },
      {
        name: 'Lucas White',
        text: 'Great starting point for cybersec.',
        star: 4,
      },
      { name: 'Isabella Green', text: 'Simple and straightforward.', star: 4 },
      { name: 'Emma Young', text: 'Somewhat outdated information.', star: 3 },
      { name: 'Mason King', text: 'Highly recommend for newcomers.', star: 5 },
      { name: 'Ava Lewis', text: 'Clear and easy to follow.', star: 4 },
      {
        name: 'Michael Martinez',
        text: 'Good overview, but lacks depth.',
        star: 3,
      },
    ],
  },
  {
    id: 13,
    title: 'Kubernetes Up & Running',
    author: 'James Johnson',
    cost: 480,
    sold: 302,
    releasedDate: new Date('2020-05-05'),
    reviews: [
      {
        name: 'Olivia Lee',
        text: 'Comprehensive guide to Kubernetes.',
        star: 5,
      },
      {
        name: 'Sophia Robinson',
        text: 'Very informative, but a bit overwhelming.',
        star: 4,
      },
      {
        name: 'Ethan Davis',
        text: 'Good book, but better suited for experienced devs.',
        star: 3,
      },
      { name: 'Charlotte Wilson', text: 'Helpful and detailed.', star: 4 },
      {
        name: 'Lucas Garcia',
        text: 'Great resource for setting up Kubernetes.',
        star: 5,
      },
      {
        name: 'Ella Young',
        text: 'Solid book, but could use more diagrams.',
        star: 4,
      },
      {
        name: 'Henry White',
        text: 'Very well structured, easy to follow.',
        star: 5,
      },
      {
        name: 'Mia King',
        text: 'Some chapters were hard to understand.',
        star: 3,
      },
    ],
  },
  {
    id: 14,
    title: 'JavaScript: The Good Parts',
    author: 'David Gonzalez',
    cost: 300,
    sold: 823,
    releasedDate: new Date('2008-05-15'),
    reviews: [
      {
        name: 'Benjamin Adams',
        text: 'A classic for JavaScript developers.',
        star: 5,
      },
      {
        name: 'Sofia Lewis',
        text: 'Essential reading for understanding JS.',
        star: 5,
      },
      { name: 'Lily Baker', text: 'Good content, but a bit dated.', star: 3 },
      {
        name: 'Jacob Hall',
        text: 'Great for learning best practices.',
        star: 5,
      },
      { name: 'Chloe Smith', text: 'Short and concise, loved it.', star: 4 },
      { name: 'Michael Johnson', text: 'Could use more examples.', star: 3 },
      {
        name: 'Ava Scott',
        text: 'Highly recommend for JavaScript enthusiasts.',
        star: 5,
      },
      {
        name: 'Lucas Green',
        text: 'Not beginner-friendly, but excellent for advanced users.',
        star: 4,
      },
    ],
  },
  {
    id: 15,
    title: 'Rust Programming by Example',
    author: 'Emma Moore',
    cost: 680,
    sold: 421,
    releasedDate: new Date('2021-12-10'),
    reviews: [
      { name: 'Sophia Lee', text: 'Great practical guide to Rust.', star: 5 },
      {
        name: 'Mason Brown',
        text: 'Very helpful examples throughout.',
        star: 4,
      },
      { name: 'Aiden Walker', text: 'Good for learning by doing.', star: 5 },
      {
        name: 'Zoe Green',
        text: 'Some parts were difficult to follow.',
        star: 3,
      },
      {
        name: 'Grace Thompson',
        text: 'Great for intermediate users.',
        star: 4,
      },
      {
        name: 'Lucas Davis',
        text: 'Highly recommend for anyone interested in Rust.',
        star: 5,
      },
      {
        name: 'Ella Clark',
        text: 'Could include more advanced concepts.',
        star: 3,
      },
      {
        name: 'Jacob Martinez',
        text: 'Perfect for understanding Rust in practice.',
        star: 5,
      },
    ],
  },
  {
    id: 16,
    title: 'Introduction to AI',
    author: 'William Harris',
    cost: 250,
    sold: 287,
    releasedDate: new Date('2022-08-03'),
    reviews: [
      {
        name: 'Liam Robinson',
        text: 'Very comprehensive introduction.',
        star: 5,
      },
      { name: 'Olivia White', text: 'Well explained concepts of AI.', star: 4 },
      {
        name: 'Emily Lewis',
        text: 'Good examples, but lacks practical exercises.',
        star: 3,
      },
      {
        name: 'Henry Martinez',
        text: 'Loved the coverage of AI fundamentals.',
        star: 5,
      },
      { name: 'Mia Garcia', text: 'Perfect for those new to AI.', star: 4 },
      {
        name: 'David Green',
        text: 'Engaging content, well-structured.',
        star: 5,
      },
      { name: 'Charlotte Hall', text: 'Some topics felt rushed.', star: 3 },
      {
        name: 'Aiden King',
        text: 'Highly recommended for beginners in AI.',
        star: 5,
      },
    ],
  },
  {
    id: 17,
    title: 'Understanding Cloud Computing',
    author: 'Sophie Clark',
    cost: 440,
    sold: 399,
    releasedDate: new Date('2020-09-22'),
    reviews: [
      {
        name: 'Lucas Harris',
        text: 'Excellent overview of cloud services.',
        star: 5,
      },
      {
        name: 'Emma Young',
        text: 'Very informative and beginner-friendly.',
        star: 4,
      },
      {
        name: 'Benjamin Walker',
        text: 'Good, but lacking in-depth examples.',
        star: 3,
      },
      { name: 'Olivia Lewis', text: 'Simple and easy to understand.', star: 5 },
      { name: 'Daniel Perez', text: 'Covers all the basics well.', star: 4 },
      {
        name: 'Grace Robinson',
        text: 'Great for those starting with cloud computing.',
        star: 5,
      },
      {
        name: 'Michael Adams',
        text: 'Helpful introduction, but lacks practical projects.',
        star: 3,
      },
      {
        name: 'Sophia Brown',
        text: 'Highly recommend for understanding cloud basics.',
        star: 5,
      },
    ],
  },
]
